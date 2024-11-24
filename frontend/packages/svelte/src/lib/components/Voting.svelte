<script lang="ts">
  import type { Address } from "viem";
  import Proposals from "./Proposals.svelte";
  let { votingPower = $bindable(), address }: { address: Address; votingPower: Number } = $props();
</script>

<div class="card card-bordered border-2 border-black">
  <div class="card-body">
    <h2 class="card-title">Voting</h2>
    <Proposals bind:votingPower {address}></Proposals>
  </div>
</div>
