<script lang="ts">
  import { onMount } from 'svelte'

  import Switch from '@/components/Switch.svelte'
  import { getOptions, setOptions, type Options } from '@/libs/storage'

  let options: Options | undefined

  onMount(async () => {
    options = await getOptions()
  })

  $: options && setOptions({ enabled: options.enabled })
</script>

<main>
  {#if options}
    <Switch bind:checked={options.enabled} label="Enabled????" />
  {:else}
    <p>// TODO</p>
  {/if}
</main>

<style>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--size-8) var(--size-7);
  }
</style>
