<script lang="ts">
  import { getBallotProposals, type ProposalsType } from "$lib/api";
  import CastVote from "./CastVote.svelte";
  import type { Address } from "viem";
  let { votingPower = $bindable(), address }: { address: Address; votingPower: any } = $props();
  let ballotProposals: ProposalsType = $state({
    proposalType: "",
    proposals: [],
  });
  let casting = $state(false);
  $effect(() => {
    const msg = `votingPower ${votingPower} changed`;
    getBallotProposals().then(proposals => (ballotProposals = proposals));
  });
</script>

{#if ballotProposals.proposalType.length}
  <div class="grid grid-cols-1 items-center gap-4 text-center">
    <div>
      <h2 class="font-italic text-xl font-semibold">{ballotProposals.proposalType} Proposal</h2>
    </div>
    <div class="grid grid-cols-3 items-center gap-4 text-center">
      <span>Name</span>
      <span></span>
      <span>Vote</span>
    </div>
    {#each ballotProposals.proposals as { name, voteCount, index }}
      <div class="grid grid-cols-3 items-center gap-4 text-center">
        <span>{name}</span>
        <span></span>
        <CastVote {name} {address} bind:votingPower {index} bind:casting />
      </div>
    {/each}
  </div>
{/if}
