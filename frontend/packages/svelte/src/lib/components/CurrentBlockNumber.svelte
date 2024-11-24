<script lang="ts">
  import { getBlockNumber } from "$lib/api";
  import { onMount } from "svelte";
  let blockNumber = $state("");
  let busy = $state(false);
  const getCurrentBlockNumber = () => {
    busy = true;
    try {
      getBlockNumber().then((num: string) => (blockNumber = num));
    } finally {
      busy = false;
    }
  };
  onMount(() => getCurrentBlockNumber());
</script>

<div class="grid grid-cols-3 items-center gap-4 text-center">
  <span class="font-semibold">Latest Block Number</span>
  <span class="font-bold text-green-600">{blockNumber}</span>
  <button disabled={busy} on:click={getCurrentBlockNumber} class="btn btn-primary"> Get Current Block Number </button>
</div>
