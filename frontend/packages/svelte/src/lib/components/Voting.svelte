<script lang="ts">
  import Proposals from "./Proposals.svelte";
  let { votingPower = $bindable() }: { votingPower: Number } = $props();
</script>

<div class="card card-bordered border-2 border-black">
  <div class="card-body">
    <h2 class="card-title">Voting</h2>
    <Proposals bind:votingPower></Proposals>
  </div>
</div>
