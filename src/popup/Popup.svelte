<script lang="ts">
  import { onMount } from 'svelte'

  import Select from '@/components/Select.svelte'
  import { getOptions, setOptions, type Options } from '@/libs/options'
  import { packageManagers } from '@/libs/packageManager'

  let options: Options | undefined

  onMount(async () => {
    options = await getOptions()
  })

  $: options && setOptions(options)
</script>

<main>
  {#if options}
    <Select bind:value={options.packageManager} options={packageManagers} />
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
