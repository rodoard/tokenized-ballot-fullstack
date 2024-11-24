<script lang="ts">
  import { getBallotProposals, type Proposal } from "$lib/api";
  let { votingPower } = $props();

  let proposals: Proposal[] = $state([]);
  let winners: Proposal[] = $state([]);
  let maxVotes = $state(-1);

  $effect(() => {
    const msg = `voting power changed ${votingPower}`;
    getBallotProposals().then(result => {
      proposals = result.proposals;
      proposalsUpdated();
    });
  });

  const proposalsUpdated = () => {
    winners = [];
    maxVotes = -1;
    if (proposals.length) {
      proposals.sort((a, b) => b.voteCount - a.voteCount);
      for (let i = 0; i < proposals.length; i++) {
        const p = proposals[i];
        if (p.voteCount > maxVotes) {
          winners = [p];
          maxVotes = p.voteCount;
        } else if (p.voteCount == maxVotes) {
          winners.push(p);
        }
      }
    }
  };
</script>

<div class="card card-bordered border-2 border-black">
  <div class="card-body">
    <h2 class="card-title">Ballot Results</h2>
    {#each proposals as { name, voteCount }}
      <div class="grid grid-cols-3 items-center gap-4 text-center">
        <span>{name}</span>
        <span></span>
        <span>{voteCount}</span>
      </div>
    {/each}
    {#if maxVotes > 0}
      <h3 class="card-title">Winning Proposals</h3>
      {#each winners as { name, voteCount }}
        <div class="grid grid-cols-3 items-center gap-4 text-center">
          <span>{name}</span>
          <span></span>
          <span>{voteCount}</span>
        </div>
      {/each}
    {:else}
      <p class="font-italic text-center font-semibold">No winners.</p>
    {/if}
  </div>
</div>
