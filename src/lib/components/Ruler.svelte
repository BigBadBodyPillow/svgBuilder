<script lang="ts">
  interface Props {
    axis: 'horizontal' | 'vertical';
    start: number;
    size: number;
    cursor: number | null;
  }

  let { axis, start, size, cursor }: Props = $props();
  const ticks = Array.from({ length: 11 }, (_, index) => index);

  function formatCoordinate(value: number) {
    return Number(value.toFixed(2)).toString();
  }
</script>

<div
  class="ruler"
  class:horizontal={axis === 'horizontal'}
  class:vertical={axis === 'vertical'}
  aria-label="{axis === 'horizontal' ? 'Horizontal' : 'Vertical'} viewBox ruler"
>
  {#each ticks as tick (tick)}
    <span
      class="tick"
      class:first={tick === 0}
      class:last={tick === 10}
      style={axis === 'horizontal' ? `left: ${tick * 10}%` : `top: ${tick * 10}%`}
    >
      <span class="tick-label">{formatCoordinate(start + (size * tick) / 10)}</span>
    </span>
  {/each}

  {#if cursor !== null}
    <span
      class="cursor-marker"
      style={axis === 'horizontal'
        ? `left: ${((cursor - start) / size) * 100}%`
        : `top: ${((cursor - start) / size) * 100}%`}
    ></span>
  {/if}
</div>

<style>
  .ruler {
    position: absolute;
    color: hsl(from var(--text) h s l / 0.5);
    background: transparent;
    font: var(--font-10) var(--font-roboto-mono);

    font-variant-numeric: tabular-nums;
    user-select: none;
  }

  .horizontal {
    top: calc(var(--ruler-width) * -1);
    left: 0;
    right: 0;
    height: var(--ruler-width);
  }

  .vertical {
    top: 0;
    left: calc(var(--ruler-width) * -1);
    bottom: 0;
    width: var(--ruler-width);
  }

  .tick {
    position: absolute;
  }

  .horizontal .tick {
    top: 0;
    width: 0;
    height: 100%;
  }
  .vertical .tick {
    left: 0;
    width: 100%;
    height: 0;
  }

  .horizontal .tick::after,
  .vertical .tick::after {
    content: '';
    position: absolute;
    border-color: currentColor;
  }

  .horizontal .tick::after {
    left: 0;
    top: 14px;
    height: 8px;
    border-left: 1px solid;
  }

  .vertical .tick::after {
    left: 14px;
    top: 0;
    width: 8px;
    border-top: 1px solid;
  }

  .tick-label {
    position: absolute;
    white-space: nowrap;
  }

  .horizontal .tick-label {
    left: 0;
    transform: translateX(-50%);
  }

  .vertical .tick-label {
    top: 0;
    left: 0.5lvw;
    text-align: left;
    transform: translate(-50%, -50%);
  }
  .vertical .tick:last-child .tick-label {
    left: 0.1lvw;
  }

  .cursor-marker {
    position: absolute;
    pointer-events: none;
    background: var(--accent);
  }

  .horizontal .cursor-marker {
    top: 0;
    bottom: 0;
    width: 1px;
  }

  .vertical .cursor-marker {
    left: 0;
    right: 0;
    height: 1px;
  }

  @media (max-width: 700px) {
    .ruler {
      font-size: 8px;
    }
  }
</style>
