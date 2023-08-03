<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from 'src/components/inputs/index';
  import { page } from '$app/stores';

  onMount(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      window.document.body.classList.toggle('dark-mode');
    }
  });

  function darkMode() {
    window.document.body.classList.toggle('dark-mode');
  }
</script>

<aside class="side-elem">ya</aside>

<main class="center-elem">
  <slot />
</main>

<aside class="side-elem">
  {#if $page.route.id === '/style-refs'}
    <a href="/">home</a>
  {:else}
    <a href="/style-refs">style refs</a>
  {/if}

  <Button on:click={darkMode} class="position-bottom">darkmode</Button>
</aside>

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
    width: 50px;
    background-color: aqua;
    position: sticky;
    top: 0px;
    overflow: hidden;

    @include sm {
      background-color: blue;
    }
  }

  .position {
    &-bottom {
      position: absolute;
      bottom: 0;
    }
  }

  .side-elem :global(.position-bottom) {
    @extend .position-bottom;
    bottom: 0;
    left: 0;
  }
</style>
