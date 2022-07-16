<script lang="ts">
  export let checked: boolean
  export let label: string
</script>

<label>
  <input type="checkbox" bind:checked aria-checked={checked} aria-required={false} aria-label={label} />
  {label}
</label>
