<div class="canvas">
  <div class="board"></div>
  <div class="dimensions">1000px x 1000px</div>
</div>

<style>
  .canvas {
    display: flex;
    flex-direction: column;
    gap: 5px;

    max-width: calc(100% - var(--line-list-width));
    height: 100%;
    max-height: 700px;
    max-width: 700px;
    aspect-ratio: 1/1;

    margin: auto;
  }

  .board {
    border-radius: var(--radius);
    aspect-ratio: 1/1;
    flex: 1;
    background-color: antiquewhite;
  }

  .dimensions {
    text-align: end;

    font-family: var(--font-roboto-mono);
    font-size: var(--font-10);
    color: hsl(from var(--text) h s l / 0.6);
  }
</style>
