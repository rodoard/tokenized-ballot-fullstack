import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Address } from 'viem';
import MintTokenDto from './dto/mintToken.dto';
import DelegateDto from './dto/delegate.dto';
import TargetBlockNumberDto from './dto/targetBlockNumber.dto';
import CastVoteDto from './dto/castVote.dto';

@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('token-balance/:address')
  async getTokenBalance(@Param('address') address: string) {
    return {result: await this.appService.getTokenBalance(address)};
  }

  @Get('voting-power/:address')
  async getVotingPower(@Param('address') address: string) {
    return {result: await this.appService.getVotingPower(address)};
  }


  @Get('ballot-voting-power/:address')
  async getBallotVotingPower(@Param('address') address: string) {
    return {result: await this.appService.getBallotVotingPower(address as Address)};
  }


  @Get('ballot-proposals')
  async getBalloProposals() {
    return {result: await this.appService.getBallotProposals()};
  }


  @Get('transaction-receipt')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return {result: await this.appService.getTransactionReceipt(hash)};
  }

  @Get('block-number')
  async getBlockNumber() {
    return { result: await this.appService.getBlockNumber() }
  }

  @Post('mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    return {result: await this.appService.mintTokens(body.address as Address)};
  }

  @Post('ballot-target-block-number')
  async setBallotTargetBlockNumber(@Body() body: TargetBlockNumberDto) {
    const txHash = await this.appService.setBallotTargetBlockNumber(body.targetNumber) 
    await this.appService.getTransactionReceipt(txHash) 
    return {
      result: await this.appService.getBallotTargetBlockNumber()
    }
  }

  @Post('ballot-cast-vote')
  async ballotCastVote(@Body() body: CastVoteDto) {
    const txHash = await this.appService.ballotCastVote({...body}) 
    await this.appService.getTransactionReceipt(txHash) 
    return {
      result: await this.appService.getBallotVotingPower(body.address as Address)
    }
  }


  @Get('ballot-target-block-number')
  async getBallotTargetBlockNumber() {
    return {result: await this.appService.getBallotTargetBlockNumber()};
  }

  
  @Post('delegate-voting-power')
  async delegateVotingPower(@Body() body: DelegateDto) {
    const txHash = await this.appService.delegateVotingPower(body.address as Address)
    await this.appService.getTransactionReceipt(txHash)
    return { result: txHash }
  }
}

