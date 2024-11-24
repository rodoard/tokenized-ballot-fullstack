<script lang="ts">
  import { mintTokens, getTokenBalance } from "$lib/api";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import type { Address } from "viem";

  let { address, tokenBalance = $bindable() }: { tokenBalance: any; address: Address } = $props();
  let tokensMinted = $state(false);
  let minted: Number = $state(0);
  let minting = $state(false);
  const mint = async () => {
    minting = true;
    tokensMinted = false;
    try {
      let balance;
      ({ minted, balance } = await mintTokens({
        address,
      }));
      tokenBalance = balance;
      tokensMinted = true;
      setTimeout(() => (tokensMinted = false), 3500);
    } finally {
      minting = false;
    }
  };
  onMount(async () => {
    tokenBalance = await getTokenBalance({
      address,
    });
  });
</script>

<div class="grid grid-cols-3 items-center gap-4 text-center">
  <span class=" font-semibold">Tokens</span>

  <span class=" font-bold text-green-600">{tokenBalance}</span>

  <button disabled={minting} on:click={mint} class="btn btn-primary"> Mint Tokens </button>
</div>
{#if tokensMinted}
  <p class="text-italic text-center font-semibold text-green-600" in:fly={{ y: 200, duration: 2000 }} out:fade>
    {`Minted ${minted} tokens.`}
  </p>
{/if}
