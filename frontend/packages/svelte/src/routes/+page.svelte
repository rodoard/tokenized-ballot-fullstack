<script lang="ts">
  import type { Address } from "viem";
  import { createAccount } from "@byteatatime/wagmi-svelte";
  import Ballot from "$lib/components/Ballot.svelte";
  import VoteTokens from "$lib/components/VoteTokens.svelte";
  import Voting from "$lib/components/Voting.svelte";
  import VotingStatus from "$lib/components/VotingStatus.svelte";
  const { address, isConnected } = $derived.by(createAccount());
  let tokenBalance: Number = $state(0);
  let votingPower: Number = $state(0);
  let blockNumber: string = $state("");
</script>

{#if !isConnected}
  <h1 class="flex flex-col items-center pt-10">Please connect your wallet</h1>
{:else}
  <div class="container">
    <div class="flex flex-col items-center pt-10">
      <div class="px-5">
        <h1 class="text-center">
          <span class="mb-2 block text-xl"> Welcome to Tokenized Balloting</span>
          <p class="mb-2 block">Address: <span class="font-semibold">{address}</span></p>
        </h1>
      </div>
    </div>
    <div class="mb-16 mt-8"></div>
    <div class=" grid grid-cols-2 gap-5">
      <VoteTokens bind:blockNumber address={address as Address} bind:tokenBalance />
      <Ballot {blockNumber} bind:votingPower address={address as Address} {tokenBalance} />
    </div>
    <div class=" grid grid-cols-1 gap-5">
      <Voting bind:votingPower address={address as Address} />
    </div>
    <div class=" grid grid-cols-1 gap-5">
      <VotingStatus {votingPower} />
    </div>
  </div>
{/if}
