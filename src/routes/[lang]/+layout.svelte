<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  // import { t, locales, locale } from '$lib/i18n';

  import { Button } from 'src/components/inputs/index';
  import { theme } from 'src/lib/stores/themes';

  function changeLang(target: EventTarget | null) {
    goto((target as HTMLSelectElement)?.value);
  }

  $: browser && (document.documentElement.dataset.theme = $theme);

  $: route = $page.data.route;
</script>

<div id="theme-container" class="">
  <div id="app-content">
    <aside class="side-elem">ya</aside>

    <main class="center-elem">
      <p>{route}</p>
      <!-- <p>{$t('layout.title')}</p> -->
      <slot />
      <select on:change={({ target }) => changeLang(target)}>
        <!-- {#each $locales as lc}
          <option value="/{lc}{route}" selected={lc === $locale}>{$t(`lang.${lc}`)}</option>
        {/each} -->
      </select>
    </main>

    <aside class="side-elem">
      <!-- {#if route === '/style-refs'}
        <a href="/{$locale}">home</a>
      {:else}
        <a href="/{$locale}/style-refs">style refs</a>
      {/if} -->

      <!-- <Button on:click={darkMode} class="position-bottom">darkmode</Button> -->
    </aside>
  </div>
</div>

<style lang="scss">
  #app-content {
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
