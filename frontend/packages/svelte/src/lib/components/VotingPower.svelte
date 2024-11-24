<script lang="ts">
  import { delegateVotingPower, getVotingPower } from "$lib/api";
  import { fade, fly } from "svelte/transition";
  import type { Address } from "viem";

  let { address, votingPower }: { votingPower: Number; address: Address } = $props();
  let delegating = $state(false);
  let delegated = $state(false);
  let txHash: string = $state("");
  const delegate = async () => {
    delegating = true;
    delegated = false;
    try {
      let power;
      ({ power, txHash } = await delegateVotingPower({
        address,
      }));
      votingPower = power;
      delegated = true;
      setTimeout(() => (delegated = false), 3500);
    } finally {
      delegating = false;
    }
  };

  $effect(() => {
    getVotingPower({
      address,
    }).then(power => (votingPower = power));
  });
</script>

<div class="grid grid-cols-3 items-center gap-4 text-center">
  <span class=" font-semibold">Voting Power</span>
  <span class=" font-bold text-green-600">{votingPower}</span>
  <button disabled={delegating} on:click={delegate} class="btn btn-primary"> Self Delegate Power </button>
</div>
{#if delegated}
  <p class="text-italic text-center font-semibold text-green-600" in:fly={{ y: 200, duration: 2000 }} out:fade>
    {`Successfully self delegated voting power: ${txHash}.`}
  </p>
{/if}
