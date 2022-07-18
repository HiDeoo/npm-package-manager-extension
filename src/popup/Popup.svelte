<script lang="ts">
  import { onMount } from 'svelte'

  import Commands from '@/components/Commands.svelte'
  import Footer from '@/components/Footer.svelte'
  import Header from '@/components/Header.svelte'
  import Select from '@/components/Select.svelte'
  import { getOptions, setOptions, type Options } from '@/libs/options'
  import { packageManagers } from '@/libs/packageManager'

  let options: Options | undefined

  onMount(async () => {
    options = await getOptions()
  })

  $: options && setOptions(options)
</script>

{#if options}
  <Header />
  <main>
    <Select options={packageManagers} label="Choose your package manager" bind:value={options.packageManager} />
    <Commands packageManager={options.packageManager} />
  </main>
  <Footer />
{:else}
  <p>// TODO</p>
{/if}

<style>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-block: var(--size-2);
  }
</style>
