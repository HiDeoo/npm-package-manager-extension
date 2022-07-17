<script lang="ts">
  import { isValidPackageManager, type PackageManager } from '@/libs/packageManager'

  export let packageManager: PackageManager
</script>

<section>
  {#if isValidPackageManager(packageManager)}
    <code>
      <div>$ {packageManager}</div>
      <div>$ {packageManager}</div>
    </code>
  {:else}
    <p>Npm Package Manager is currently <strong>disabled</strong>.</p>
  {/if}
</section>

<style>
  section {
    --min-height: var(--size-8);

    align-self: stretch;
    color: var(--code-color);
    line-height: var(--font-lineheight-3);
    margin-inline: var(--size-8);
  }

  code {
    background-color: var(--code-bg-color);
    border-radius: var(--control-radius);
    display: flex;
    flex-direction: column;
    font-family: Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco, Droid Sans Mono,
      Source Code Pro, monospace;
    gap: var(--size-1);
    margin-top: var(--size-3);
    min-height: var(--min-height);
    padding: var(--size-2);
  }

  p {
    font-style: italic;
    margin-block: var(--size-3) 0;
    min-height: var(--min-height);
    padding: var(--size-2);
    text-align: center;
  }

  strong {
    color: var(--error-color);
  }
</style>
