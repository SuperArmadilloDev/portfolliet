<script lang="ts">
  import { Button } from 'src/components/inputs/index';
  // import { Button } from '@/components/inputs/index';

  function darkMode() {
    window.document.body.classList.toggle('dark-mode');
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>Hello world</h1>
<Button class="connard" on:click={darkMode}>hey</Button>

<style>
</style>
