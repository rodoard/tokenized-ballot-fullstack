<script lang="ts">
  import { getBallotVotingPower } from "$lib/api";
  import type { Address } from "viem";
  let { address, votingPower = $bindable() }: { votingPower: Number; address: Address } = $props();
  $effect(() => {
    getBallotVotingPower({
      address,
    }).then(power => (votingPower = power));
  });
</script>

<div class="grid grid-cols-3 items-center gap-4 text-center">
  <span class=" font-semibold">Ballot Voting Power</span>
  <span class="font-bold text-green-600">{votingPower}</span>
</div>
