<script>
  let { votingPower = $bindable(), casting } = $props();
  let votes = $state(0);
  const castVote = () => {};
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
</div>
