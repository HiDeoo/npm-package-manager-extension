<script lang="ts">
  export let options: ReadonlyArray<string>
  export let value: string
</script>

<select bind:value>
  {#each options as option}
    <option value={option}>{option}</option>
  {/each}
</select>
