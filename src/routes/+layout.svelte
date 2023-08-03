<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      window.document.body.classList.toggle('dark-mode');
    }
  });
</script>

<aside class="side-elem">ya</aside>

<main class="center-elem">
  <nav class="caca">some nav</nav>
  <slot />
</main>

<aside class="side-elem">yeet</aside>

<style lang="scss">
  :global(body) {
    display: flex;
    flex-direction: row;

    background-color: #f2eee2;
    transition: background-color 0.3s;
  }

  :global(body.dark-mode) {
    background-color: #1d3040;
  }

  .center-elem {
    flex-grow: 1;
  }

  .side-elem {
    height: 100vh;
    width: 45px;
    background-color: aqua;
    position: sticky;
    top: 0px;

    @include sm {
      background-color: blue;
    }
  }
</style>
