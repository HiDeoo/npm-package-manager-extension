<script lang="ts">
  import Switch from '@/components/Switch.svelte'

  let checked = false
</script>

<main>
  <Switch bind:checked label="Enabled????" />
</main>
