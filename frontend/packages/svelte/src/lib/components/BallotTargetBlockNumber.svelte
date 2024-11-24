<script lang="ts">
  import { getBallotTargetBlockNumber, setBallotTargetBlockNumber } from "$lib/api";
  import { onMount } from "svelte";
  let { blockNumber, targetBlockNumber = $bindable() }: { targetBlockNumber: string; blockNumber: string } = $props();
  let setting = $state(false);
  const setTargetNumber = async () => {
    setting = true;
    try {
      targetBlockNumber = await setBallotTargetBlockNumber(blockNumber);
    } finally {
      setting = false;
    }
  };
  onMount(() => {
    getBallotTargetBlockNumber().then(target => (targetBlockNumber = target));
  });
</script>

<div class="grid grid-cols-3 items-center gap-4 text-center">
  <span class="font-semibold">Target Block Number</span>
  <span class="font-bold text-green-600">{targetBlockNumber}</span>
  <button disabled={setting} on:click={setTargetNumber} class="btn btn-primary">
    Set to Vote Token Block Number
  </button>
</div>
