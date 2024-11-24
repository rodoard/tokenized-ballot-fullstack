import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Address, createPublicClient, createWalletClient, formatEther, http, parseEther, parseUnits } from "viem"
import { privateKeyToAccount } from 'viem/accounts';
import { hardhat, sepolia } from "viem/chains"
import {parseSignature} from "viem"
import { tokenizedBallot, tokenizedVote } from './contracts';
import { getSignature } from './delegate';

const MINT_VALUE = parseEther("10")
const TOKENIZED_VOTE_CONTRACT_NAME = "TokenizedVote"
const CHAINS = {
  hardhat, 
  sepolia
}

@Injectable()
export class AppService {
  chain: any;
  async ballotCastVote({ proposalIndex, votingPower}: { proposalIndex: number; votingPower: number; }) {
    return await this.writeContract({
      tokenJson: tokenizedBallot,
      functionName: "vote",
      args:[proposalIndex, parseUnits(votingPower.toString(), 18)]
     })
  }
  async getBlockNumber() {
    const result = await this.publicClient.getBlockNumber();
    return result.toString()
  }
 async  setBallotTargetBlockNumber(targetNumber: number) {
   return await this.writeContract({
      tokenJson: tokenizedBallot,
      functionName: "setTargetBlockNumber",
      args:[targetNumber]
   })
  }
  async getBallotProposals() {
    const result = await this.readContract( {
      tokenJson: tokenizedBallot,
      functionName: "getBallotProposals"
       }
    )
    const { proposalType, proposals } = result 
    return {
      proposalType, 
      proposals: proposals.map(({ name, voteCount }, index) => (
        {
          name, voteCount: Number(formatEther(voteCount.toString())),
          index
        }
      ))
    }
  }

  async getBallotTargetBlockNumber() {
    const targetNumber = await this.readContract( {
      tokenJson: tokenizedBallot,
      functionName: "targetBlockNumber"
       }
    )
   return targetNumber.toString()
  }


 async  getBallotVotingPower(address: Address) {
      const power = await this.readContract( {
      tokenJson: tokenizedBallot,
      functionName: "getVotePower",
      args:[address]
       }
      )
    return Number(formatEther(power))
  }

  async getTokenBalance(address: string) {
    const balance = await this.readContract( {
      tokenJson: tokenizedVote,
      functionName: "balanceOf",
      args:[address]
       }
    )
    return Number(formatEther(balance))
  }

  async getVotingPower(address: string) {
    const votes = await this.readContract( {
      tokenJson: tokenizedVote,
      functionName: "getVotes",
      args:[address]
       }
    )
    return Number(formatEther(votes))
  }


  async getTransactionReceipt(hash: string) {
    return await this.publicClient.waitForTransactionReceipt({ hash })
  }
   
  async mintTokens(address: Address) {
     const txHash = await this.writeContract({
      tokenJson: tokenizedVote,
      functionName: "mint",
      args:[address, MINT_VALUE]
     })
    await this.getTransactionReceipt(txHash)
    return Number(formatEther(MINT_VALUE))
  }

  async delegateVotingPower(address: Address) {
    const nonce = await this.readContract({
      tokenJson: tokenizedVote,
      functionName: "nonces",
      args:[address]
    })      
    const expiry = Math.floor(Date.now() / 1000) + 3600 * 48; // Expiry set to 1 hour from now
    const { signature} = await getSignature({
      contractName: TOKENIZED_VOTE_CONTRACT_NAME, 
      privateKey:`0x${this.env("PRIVATE_KEY")}`,
      contractAddress:tokenizedVote.address as Address,
      delegatee:address ,
      nonce, 
      expiry,
      chain:this.chain
    })
      // Split the signature
    const { v, r, s } = parseSignature(signature);
    const hash = await this.writeContract({
     tokenJson: tokenizedVote,
     functionName: "delegateBySig",
     args:[
      address,
      nonce,
      expiry,
      v,
      r,
      s
   ]
    })
   return hash
  }
  
  publicClient: any;
  walletClient: any;

  private env(key:string):string {
    return this.configService.get<string>(key);
  } 

  private readContract({tokenJson, functionName, args=[]}): Promise<any> {
    return this.publicClient.readContract({
      address:tokenJson.address,
      abi: tokenJson.abi,
      functionName,
      args,
    });
  }

  private writeContract({tokenJson, functionName, args=[]}): Promise<any> {
    return this.walletClient.writeContract({
      address:tokenJson.address,
      abi: tokenJson.abi,
      functionName,
      args,
    });
  }
  constructor(private configService: ConfigService) {
    const endPointUrl =`${this.env('RPC_ENDPOINT_URL')}${this.env('PROVIDER_API_KEY')}`
    this.chain = CHAINS[this.env("CHAIN")]
    this.publicClient = createPublicClient({
      chain: this.chain,
      transport: http(endPointUrl),
    });
    const account = privateKeyToAccount(`0x${this.env("PRIVATE_KEY")}`);
    this.walletClient = createWalletClient({
      transport: http(endPointUrl),
      chain:  this.chain,
      account: account,
    });
  }
}
