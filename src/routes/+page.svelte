<script>
  import Canvas from '$lib/components/Canvas.svelte';
  import LineList from '$lib/components/LineList.svelte';
  import RainbowLine from '$lib/components/RainbowLine.svelte';
  import Toolbar from '$lib/components/Toolbar.svelte';
</script>

<RainbowLine />
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

    --rainbow: linear-gradient(
      to left,
      #fef26a,
      #fe8462,
      #ff70cb,
      #d270ff,
      #743ad5,
      #709df8,
      #5bffbd,
      #709df8,
      #743ad5,
      #d270ff,
      #ff70cb,
      #fe8462,
      #fef26a
    );
  }

  :global(button) {
    font: inherit;
    color: inherit;
    background: inherit;
  }
  main {
    height: calc(100% - var(--toolbar-height));

    display: flex;
    justify-content: space-between;
  }
</style>
