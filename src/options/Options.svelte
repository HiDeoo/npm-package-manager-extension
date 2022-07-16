<script lang="ts">
  import { onMount } from 'svelte'

  import Select from '@/components/Select.svelte'
  import { packageManagers } from '@/libs/packageManager'
  import { getOptions, setOptions, type Options } from '@/libs/storage'

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
