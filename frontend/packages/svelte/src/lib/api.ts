import { hexToString, stringToHex, type Address } from "viem";

const baseURL = "http://localhost:3001/api"

function apiUrl({ path, params = {} }:{path:string, params?:Object}) {
  const url = new URL(`${baseURL}${path}`);
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, value);
  }
  url.search = searchParams.toString();
  return url.toString();  
}

export async function getTokenBalance(
  {  address }: {  address: Address }
):Promise<Number> {
  const response = await fetch(apiUrl({
    path: `/token-balance/${address}`,
  })).then((response) => {
    return response.json()
  }) 
  return Number(response.result);
}


export async function getVotingPower(
  {  address }: {  address: Address }
):Promise<Number> {
  const response = await fetch(apiUrl({
    path: `/voting-power/${address}`,
  })).then((response) => {
    return response.json()
  }) 
  return Number(response.result);
}

export async function getBallotVotingPower(
  {  address }: {  address: Address }
):Promise<Number> {
  const response = await fetch(apiUrl({
    path: `/ballot-voting-power/${address}`,
  })).then((response) => {
    return response.json()
  }) 
  return Number(response.result);
}

export async function getBallotTargetBlockNumber():Promise<string> {
  const response = await fetch(apiUrl({
    path: `/ballot-target-block-number`,
  })).then((response) => {
    return response.json()
  }) 
  return  (response.result);
}

export async function getBlockNumber():Promise<string> {
  const response = await fetch(apiUrl({
    path: `/block-number`,
  })).then((response) => {
    return response.json()
  }) 
  return  (response.result);
}

export async function setBallotTargetBlockNumber(targetNumber:string): Promise<string> {
  const body = {
    targetNumber
  }
  const response = await fetch(
    apiUrl({ path: `/ballot-target-block-number` }),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(body)
    }
  ).then((response) => {
    return response.json()
  }) 
  return (response.result);
}


type Proposal ={
  name: string,
    voteCount:string
  }
export type ProposalsType = {
  proposalType: string,
  proposals: Proposal[]
}

export async function getBallotProposals(
): Promise<ProposalsType> {
  const response = await fetch(apiUrl({
    path: `/ballot-proposals`,
  })).then((response) => {
    return response.json()
  }) 
  const { proposalType, proposals } = response.result as ProposalsType;
  const emptyStr = stringToHex("", {size:32})
  return {
    proposalType,
    proposals: proposals.filter(p => p.name != emptyStr).map(({ name, voteCount }) => ({
      name:hexToString(name as Address, {size:32}), voteCount
    }))
  }
}


export async function delegateVotingPower(
  {  address }: {  address: Address }
): Promise<{power:Number, txHash:string}> {
  const body = JSON.stringify({ address })
  const response = await fetch(apiUrl({
    path: `/delegate-voting-power/`,
  }),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body
    }).then((response) => {
    return response.json()
  }) 
  const power = await getVotingPower({ address });
  return {power, txHash:response.result}
}

export async function mintTokens(
  { address }: { address: Address }
): Promise<{
  minted:Number, balance:Number
}> {
  const url = apiUrl({
    path: "/mint-tokens"
  })
  const body = JSON.stringify({ address })
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body
  }).then((response) => {
    return response.json()
  })
  const minted = Number(response.result)
  const balance = await getTokenBalance({ address });
  return {minted, balance}
}