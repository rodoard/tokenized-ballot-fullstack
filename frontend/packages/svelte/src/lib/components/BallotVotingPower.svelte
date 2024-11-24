<script lang="ts">
  import { getBallotVotingPower } from "$lib/api";
  import { onMount } from "svelte";
  import type { Address } from "viem";
  let {
    address,
    targetBlockNumber,
    votingPower = $bindable(),
  }: { targetBlockNumber: string; votingPower: any; address: Address } = $props();
  $effect(() => {
    const msg = `target block changed ${targetBlockNumber}`;
    getBallotVotingPower({
      address,
    }).then(power => (votingPower = power));
  });
</script>

<div class="grid grid-cols-3 items-center gap-4 text-center">
  <span class=" font-semibold">Ballot Voting Power</span>
  <span class="font-bold text-green-600">{votingPower}</span>
</div>
