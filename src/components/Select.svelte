<script lang="ts">
  export let options: ReadonlyArray<string>
  export let value: string
</script>

<select bind:value>
  {#each options as option}
    <option value={option}>{option}</option>
  {/each}
</select>

<style>
  select {
    appearance: none;
    background-color: var(--control-bg-color);
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" fill="%23e9ecef"/></svg>');
    background-position-x: 97%;
    background-position-y: 50%;
    background-repeat: no-repeat;
    border: none;
    border-radius: var(--control-radius);
    cursor: pointer;
    font-size: var(--font-size-1);
    padding: var(--control-padding);
    padding-right: var(--size-7);
  }

  select:hover {
    background-color: var(--control-bg-color-hover);
  }

  select:focus-visible {
    outline: var(--control-ring);
    outline-offset: var(--control-ring-offset);
  }
</style>
