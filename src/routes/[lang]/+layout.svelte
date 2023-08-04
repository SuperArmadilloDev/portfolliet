<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import { t, locales, locale } from 'src/lib/i18n';

  import { Button } from 'src/components/inputs/index';

  onMount(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      window.document.body.classList.toggle('dark-mode');
    }
  });

  function darkMode() {
    window.document.body.classList.toggle('dark-mode');
  }

  function changelang(target: EventTarget | null) {
    goto((target as HTMLSelectElement)?.value);
  }

  $: route = $page.data.route;
</script>

<aside class="side-elem">ya</aside>

<main class="center-elem">
  <p>{route}</p>
  <p>{$t('layout.title')}</p>
  <slot />
  <select on:change={({ target }) => changelang(target)}>
    {#each $locales as lc}
      <option value="/{lc}{route}" selected={lc === $locale}>{$t(`lang.${lc}`)}</option>
    {/each}
  </select>
</main>

<aside class="side-elem">
  {#if route === '/style-refs'}
    <a href="/{$locale}">home</a>
  {:else}
    <a href="/{$locale}/style-refs">style refs</a>
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

  .side-elem :global(.position-bottom) {
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>
