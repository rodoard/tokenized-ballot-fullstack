<script lang="ts">
  import type { Address } from "viem";
  import Tokens from "./Tokens.svelte";
  import VotingPower from "./VotingPower.svelte";
  import BlockNumber from "./BlockNumber.svelte";
  let {
    address,
    tokenBalance = $bindable(),
    blockNumber = $bindable(),
  }: {
    blockNumber: string;
    address: Address;
    tokenBalance: Number;
  } = $props();
</script>

<div class="card card-bordered border-2 border-black">
  <div class="card-body">
    <h2 class="card-title">Vote Token</h2>
    <Tokens address={address as Address} bind:tokenBalance />
    <div class="mb-4 mt-4"></div>
    <VotingPower address={address as Address} {tokenBalance} />
    <BlockNumber bind:blockNumber />
  </div>
</div>
