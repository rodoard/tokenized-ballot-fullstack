<script>
  import { nativeCurrencyPrice } from "$lib/runes/global.svelte";
  import { createTargetNetwork } from "$lib/runes/targetNetwork.svelte";
  import BuidlGuidlLogo from "./assets/BuidlGuidlLogo.svelte";
  import { CurrencyDollar, Heart, Icon, MagnifyingGlass } from "svelte-hero-icons";
  import { hardhat } from "viem/chains";
  import Faucet from "./scaffold-eth/Faucet.svelte";
  import SwitchTheme from "./SwitchTheme.svelte";

  const targetNetwork = $derived.by(createTargetNetwork());
  const isLocalNetwork = $derived(targetNetwork.id === hardhat.id);
</script>

<div class="mb-11 min-h-0 px-1 py-5 lg:mb-0">
  <div>
    <div class="pointer-events-none fixed bottom-0 left-0 z-10 flex w-full items-center justify-between p-4">
      <div class="pointer-events-auto flex flex-col gap-2 md:flex-row">
        {#if isLocalNetwork}
          <Faucet />
          <a href="/blockexplorer" class="btn btn-primary btn-sm gap-1 font-normal">
            <Icon src={MagnifyingGlass} class="h-4 w-4" />
            <span>Block Explorer</span>
          </a>
        {/if}
      </div>
      <SwitchTheme class="pointer-events-auto {isLocalNetwork && 'self-end md:self-auto'}" />
    </div>
  </div>
  <div class="w-full">
    <ul class="menu menu-horizontal w-full">
      <div class="flex w-full items-center justify-center gap-2 text-sm">
        <div class="text-center">
          <a href="https://github.com/rodoard/tokenied-ballot-fullstack" target="_blank" rel="noreferrer" class="link">
            Fork me
          </a>
        </div>
        <span>·</span>
        <div class="flex items-center justify-center gap-2">
          <p class="m-0 text-center">
            Built with <Icon src={Heart} class="inline-block h-4 w-4" />
          </p>
        </div>
        <span>·</span>
        <div class="text-center"></div>
      </div>
    </ul>
  </div>
</div>
