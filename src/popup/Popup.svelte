<script lang="ts">
  import { onMount } from 'svelte'

  import Commands from '@/components/Commands.svelte'
  import Footer from '@/components/Footer.svelte'
  import Header from '@/components/Header.svelte'
  import Select from '@/components/Select.svelte'
  import { getOptions, setOptions, type Options } from '@/libs/options'
  import { isValidPackageManager, packageManagers, type PackageManager } from '@/libs/packageManager'

  let options: Options | undefined

  onMount(async () => {
    options = await getOptions()

    updateTitle(options.packageManager)
  })

  $: {
    if (options) {
      setOptions(options)
      updateTitle(options.packageManager)
    }
  }

  function updateTitle(packageManager: PackageManager) {
    chrome.action.setTitle({
      title: isValidPackageManager(packageManager)
        ? `Npm Package Manager with ${packageManager}`
        : 'Npm Package Manager',
    })
  }
</script>

{#if options}
  <Header />
  <main>
    <Select options={packageManagers} label="Choose your package manager" bind:value={options.packageManager} />
    <Commands packageManager={options.packageManager} />
  </main>
  <Footer />
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
