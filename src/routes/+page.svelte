<script>
  import Toolbar from '$lib/components/Toolbar.svelte';
</script>

<main>
  <Toolbar />
</main>

<style>
  :root {
    --background2: hsl(from var(--background) h s calc(l + 2));
    --border: hsl(from var(--background) h s calc(l + 10));
  }

  :global(button) {
    font: inherit;
    color: inherit;
    background: inherit;
  }
</style>
