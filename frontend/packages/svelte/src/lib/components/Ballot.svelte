<script lang="ts">
  import type { Address } from "viem";
  import BallotTargetBlockNumber from "./BallotTargetBlockNumber.svelte";
  import BallotVotingPower from "./BallotVotingPower.svelte";
  import CurrentBlockNumber from "./CurrentBlockNumber.svelte";
  let {
    address,
    blockNumber,
    votingPower = $bindable(),
    tokenBalance,
  }: { blockNumber: string; votingPower: Number; address: Address; tokenBalance: Number } = $props();
  let targetBlockNumber: string = $state("");
</script>

<div class="card card-bordered border-2 border-black">
  <div class="card-body">
    <h2 class="card-title">Ballot</h2>
    <CurrentBlockNumber />
    <BallotTargetBlockNumber bind:targetBlockNumber {blockNumber} />
    <BallotVotingPower bind:votingPower address={address as Address} {targetBlockNumber} />
  </div>
</div>
