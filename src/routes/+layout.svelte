<script lang="ts">
  import { browser } from '$app/environment';
  import type { LayoutServerData } from './$types';
  import { applyAction, enhance } from '$app/forms';

  import { Button } from 'src/components/inputs/index';
  import { type Theme, type SupportedLocale, supportedLocales } from 'src/types';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { t, locales, locale } from '$lib/translations';

  export let data: LayoutServerData;

  function findNewTheme(theme: Theme) {
    let newTheme = theme;
    if (!browser) return theme;

    if (theme === 'auto') {
      newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
    } else newTheme = theme === 'dark' ? 'light' : 'dark';
    return newTheme;
  }

  async function changeLocale(target: EventTarget | null) {
    console.log('AAAAAAAAAAA');
    const selectedLocale = (target as HTMLSelectElement)?.value;

    const formData = new FormData();
    formData.append('locale', selectedLocale);

    await fetch('/?/locale', {
      method: 'POST',
      body: formData,
    });
    goto(`/${selectedLocale}/${route}`);
  }

  let theme: Theme = data.theme;
  $: nextTheme = findNewTheme(theme);

  $: route = $page.data.route;

  Object.entries;
</script>

<aside class="side-elem">ya</aside>

<main class="center-elem">
  <p>{theme}</p>
  <slot />
</main>

<aside class="side-elem">
  <form
    method="POST"
    action="/?/theme"
    use:enhance={async () => {
      theme = nextTheme;
      document.documentElement.dataset.theme = theme;
      return async ({ result }) => await applyAction(result);
    }}
  >
    <input name="theme" value={nextTheme} hidden />
    <Button>DarkTheme</Button>
  </form>

  <select on:change={({ target }) => changeLocale(target)}>
    {#each Object.entries(supportedLocales) as lc}
      <option value="/{lc[0]}{route}" selected={lc[0] === $locale}>{lc[1]}</option>
    {/each}
  </select>

  <!-- {#if route === '/style-refs'}
        <a href="/{$locale}">home</a>
      {:else}
        <a href="/{$locale}/style-refs">style refs</a>
      {/if} -->
</aside>

<style lang="scss">
  :global(body) {
    display: flex;
    flex-direction: row;
    background-color: var(--color-background);
    transition: background-color 0.3s;

    margin: 0;
    padding: 0;
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
