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
