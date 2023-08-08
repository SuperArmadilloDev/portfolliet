<script lang="ts">
  import { browser } from '$app/environment';
  import { applyAction, enhance } from '$app/forms';

  import type { Theme } from 'src/types';

  const deriveNextTheme = (theme: Theme): Theme => {
    switch (theme) {
      case 'dark':
        return 'light';
      case 'light':
        return 'dark';
      case 'auto':
      default:
        if (!browser) return 'auto';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
    }
  };
  $: nextTheme = deriveNextTheme('dark');
</script>

<header>
  <form
    method="POST"
    action="/?/theme"
    use:enhance={async () => {
      return async ({ result }) => {
        console.log(result);
        await applyAction(result);
      };
    }}
  >
    <input name="theme" value={nextTheme} hidden />
    <button class="w-8"> E </button>
  </form>
</header>
