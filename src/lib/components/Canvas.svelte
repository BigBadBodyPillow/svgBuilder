<div class="canvas">
  <div class="board"></div>
  <div class="dimensions">1000px x 1000px</div>
</div>

<style>
  .canvas {
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    gap: 10px; */

    max-width: calc(100% - var(--line-list-width));
    height: 100%;
    max-height: 700px;
    max-width: 700px;
    aspect-ratio: 1/1;
    background-color: antiquewhite;
  }

  .dimensions {
    color: red;
    font-family: var(--font-roboto-mono);
    font-size: var(--font-10);
    opacity: 0.6;
  }
</style>
