<script>
  import { ballotCastVote } from "$lib/api";
  import { fly, fade } from "svelte/transition";

  let { index, name, address, votingPower = $bindable(), casting = $bindable() } = $props();
  let votes = $state(0);
  let voted = $state(false);
  const castVote = async () => {
    casting = true;
    voted = false;
    try {
      votingPower = await ballotCastVote({
        proposalIndex: index,
        votingPower: votes,
        address,
      });
      voted = true;
      setTimeout(() => (voted = false), 35000);
    } finally {
      casting = false;
    }
  };
</script>

<div class="bg-base-200 flex flex-col items-center space-y-4 rounded-lg p-1 shadow-md">
  <label class="flex flex-col space-y-2">
    <span class="text-sm">Voting power (Max: {votingPower})</span>
    <input type="number" bind:value={votes} min="1" max={votingPower} class="input input-bordered w-full max-w-xs" />
  </label>

  <button
    on:click={castVote}
    class="btn btn-primary w-full max-w-xs"
    disabled={casting || votes <= 0 || votes > votingPower}
  >
    Vote
  </button>
  {#if voted}
    <p class="text-italic text-center font-semibold text-green-600" in:fly={{ y: 200, duration: 2000 }} out:fade>
      {`Successfully cast ${votes} power for ${name}.`}
    </p>
  {/if}
</div>
