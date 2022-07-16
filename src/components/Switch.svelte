<script lang="ts">
  export let checked: boolean
  export let label: string
</script>

<label>
  <input type="checkbox" bind:checked aria-checked={checked} aria-required={false} aria-label={label} />
  <span class="slider" />
  <!-- // FIXME -->
  <!-- <span>{label}</span> -->
</label>

<style>
  label {
    --slider-inset: var(--size-1);

    display: inline-block;
    position: relative;
    width: var(--size-9);
    height: var(--size-7);
  }

  input {
    height: 0;
    opacity: 0;
    width: 0;
  }

  .slider {
    background-color: var(--gray-8);
    border-radius: var(--size-7);
    box-shadow: var(--inner-shadow-1);
    cursor: pointer;
    inset: 0;
    position: absolute;
  }

  @media (prefers-reduced-motion: no-preference) {
    .slider {
      transition: background-color 0.5s var(--ease-in-out-4);
    }
  }

  .slider:before {
    background-color: var(--gray-4);
    border-radius: var(--radius-round);
    bottom: var(--slider-inset);
    box-shadow: var(--shadow-1);
    content: '';
    height: var(--size-5);
    left: var(--slider-inset);
    position: absolute;
    width: var(--size-5);
  }

  @media (prefers-reduced-motion: no-preference) {
    .slider:before {
      transition: transform 0.5s var(--ease-in-out-4);
    }
  }

  input:checked + .slider {
    background-color: var(--primary-color);
  }

  input:checked + .slider:before {
    transform: translateX(calc(var(--size-9) - var(--size-5) - var(--slider-inset) * 2));
  }

  input:focus-visible + .slider {
    outline: var(--ring);
    outline-offset: var(--ring-offset);
  }
</style>
