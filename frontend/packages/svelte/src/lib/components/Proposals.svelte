<script lang="ts">
  import { getBallotProposals, type ProposalsType } from "$lib/api";
  import { onMount } from "svelte";
  import CastVote from "./CastVote.svelte";
  let { votingPower = $bindable() }: { votingPower: Number } = $props();
  let ballotProposals: ProposalsType = $state({
    proposalType: "",
    proposals: [],
  });
  const castVote = () => {};
  let casting = $state(false);
  onMount(() => {
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
      <span>VoteCount</span>
      <span>Vote</span>
    </div>
    {#each ballotProposals.proposals as { name, voteCount }}
      <div class="grid grid-cols-3 items-center gap-4 text-center">
        <span>{name}</span>
        <span>{voteCount}</span>
        <CastVote {votingPower} {castVote} bind:casting />
      </div>
    {/each}
  </div>
{/if}
