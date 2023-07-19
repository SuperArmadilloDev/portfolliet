<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      window.document.body.classList.toggle('dark-mode');
    }
  });
</script>

<main>
  <slot />
</main>

<style>
</style>
