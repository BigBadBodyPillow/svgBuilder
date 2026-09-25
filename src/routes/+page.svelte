<script>
  import Canvas from '$lib/components/Canvas.svelte';
  import LineList from '$lib/components/LineList.svelte';
  import Toolbar from '$lib/components/Toolbar.svelte';
</script>

<Toolbar />
<main>
  <Canvas />
  <LineList />
</main>

<style>
  :root {
    --background2: hsl(from var(--background) h s calc(l + 2));
    --border: hsl(from var(--background) h s calc(l + 10));

    --transition-duration: 0.5s;
    --toolbar-height: 60px;
    --line-list-width: 350px;
  }

  :global(button) {
    font: inherit;
    color: inherit;
    background: inherit;
  }
  main {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    height: calc(100% - var(--toolbar-height));
    padding: 3rem 0;

    & > :global(div) {
      border-radius: var(--radius);
    }
  }
</style>
