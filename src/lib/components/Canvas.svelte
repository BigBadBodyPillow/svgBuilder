<script lang="ts">
  import type { PathLine, SvgSettings } from '../Types';
  import Dialog from './Dialog.svelte';
  import Ruler from './Ruler.svelte';
  import Download from '$lib/assets/Download.svg?raw';
  import Source from '$lib/assets/Source.svg?raw';

  interface Props {
    lines: PathLine[];
    svgSettings: SvgSettings;
  }

  let { lines, svgSettings }: Props = $props();
  let cursor = $state<{ x: number; y: number } | null>(null);
  let codeDialogOpen = $state(false);

  const pathData = $derived(
    lines
      .map((line) => {
        switch (line.lineType) {
          case 'M':
          case 'L':
          case 'T':
            return `${line.lineType} ${line.x} ${line.y}`;
          case 'H':
            return `H ${line.x}`;
          case 'V':
            return `V ${line.y}`;
          case 'A':
            return `A ${line.rx} ${line.ry} ${line.xRotation} ${line.arc} ${line.sweep} ${line.x} ${line.y}`;
          case 'Q':
            return `Q ${line.x1} ${line.y1} ${line.x} ${line.y}`;
          case 'C':
            return `C ${line.x1} ${line.y1} ${line.x2} ${line.y2} ${line.x} ${line.y}`;
          case 'S':
            return `S ${line.x2} ${line.y2} ${line.x} ${line.y}`;
          case 'Z':
            return 'Z';
        }
      })
      .join(' ')
  );

  const svgMarkup = $derived(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${svgSettings.width}" height="${svgSettings.height}" viewBox="${svgSettings.viewBoxX} ${svgSettings.viewBoxY} ${svgSettings.viewBoxWidth} ${svgSettings.viewBoxHeight}">\n  <path d="${pathData}" fill="${escapeAttribute(svgSettings.fill)}" stroke="${escapeAttribute(svgSettings.stroke)}" stroke-width="${svgSettings.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />\n</svg>`
  );

  function escapeAttribute(value: string) {
    return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  }

  function trackPointer(event: PointerEvent) {
    const bounds =
      event.currentTarget instanceof HTMLElement
        ? event.currentTarget.getBoundingClientRect()
        : null;
    if (!bounds) return;

    cursor = {
      x:
        svgSettings.viewBoxX +
        ((event.clientX - bounds.left) / bounds.width) * svgSettings.viewBoxWidth,
      y:
        svgSettings.viewBoxY +
        ((event.clientY - bounds.top) / bounds.height) * svgSettings.viewBoxHeight
    };
  }

  function formatCoordinate(value: number) {
    return Number(value.toFixed(2)).toString();
  }

  function downloadSvg() {
    const url = URL.createObjectURL(new Blob([svgMarkup], { type: 'image/svg+xml' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'drawing.svg';
    link.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="canvas">
  <div class="ruler-frame" style={`--aspect-ratio: ${svgSettings.width / svgSettings.height}`}>
    <Ruler
      axis="horizontal"
      start={svgSettings.viewBoxX}
      size={svgSettings.viewBoxWidth}
      cursor={cursor?.x ?? null}
    />

    <Ruler
      axis="vertical"
      start={svgSettings.viewBoxY}
      size={svgSettings.viewBoxHeight}
      cursor={cursor?.y ?? null}
    />

    <div
      class="board"
      role="img"
      aria-label="SVG path preview with viewBox pointer coordinates"
      onpointermove={trackPointer}
      onpointerleave={() => (cursor = null)}
    >
      <svg
        width={svgSettings.width}
        height={svgSettings.height}
        viewBox="{svgSettings.viewBoxX} {svgSettings.viewBoxY} {svgSettings.viewBoxWidth} {svgSettings.viewBoxHeight}"
        role="img"
        aria-label="SVG path preview"
      >
        <path
          d={pathData}
          fill={svgSettings.fill}
          stroke={svgSettings.stroke}
          stroke-width={svgSettings.strokeWidth}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span class="cursor-position">
        {#if cursor}
          x: {formatCoordinate(cursor.x)}<span>,</span> y: {formatCoordinate(cursor.y)}
        {:else}
          x: null<span>,</span> y: null
        {/if}
      </span>
    </div>
  </div>

  <div class="export-controls">
    <button class="source" type="button" onclick={() => (codeDialogOpen = true)}>
      <!--  eslint-disable-next-line svelte/no-at-html-tags -->
      {@html Source}
      <span>Source</span>
    </button>
    <button class="download" type="button" onclick={downloadSvg} aria-label="download">
      <!--  eslint-disable-next-line svelte/no-at-html-tags -->
      {@html Download}
      <span> Download </span>
    </button>
  </div>

  <Dialog bind:open={codeDialogOpen} {svgMarkup} />
</div>

<style>
  .canvas {
    --ruler-width: 24px;

    container-type: size;
    display: grid;
    place-items: center;
    grid-template-rows: minmax(0, 1fr) auto;
    flex: 1;
    padding-block: 1rem;
  }

  .ruler-frame {
    position: relative;
    width: min(700px, calc(100cqw - 36px), calc((100cqh - 6rem) * var(--aspect-ratio)));
    aspect-ratio: var(--aspect-ratio);
    margin: var(--ruler-width) 0 0 var(--ruler-width);
  }

  .board {
    --backgroundColor: rgba(255, 255, 255);
    --squareColor: rgba(100, 100, 100, 0.5);
    --squareSize: 1em;

    position: relative;
    width: 100%;
    height: 100%;
    /* overflow: hidden; */

    background-color: var(--backgroundColor);
    background-image:
      linear-gradient(45deg, var(--squareColor) 25%, transparent 25%),
      linear-gradient(135deg, var(--squareColor) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--squareColor) 75%),
      linear-gradient(135deg, transparent 75%, var(--squareColor) 75%);
    background-size: calc(2 * var(--squareSize)) calc(2 * var(--squareSize));
    background-position:
      0 0,
      var(--squareSize) 0,
      var(--squareSize) calc(-1 * var(--squareSize)),
      0 calc(-1 * var(--squareSize));
  }

  .cursor-position {
    position: absolute;
    z-index: -1;

    min-width: 130px;
    right: 0;
    bottom: calc(4.5rem * -1);
    padding: 1rem;

    color: var(--text);
    background-color: var(--background2);
    border: 1px solid var(--border);
    border-radius: var(--radius);

    font: var(--font-10) var(--font-roboto-mono);
    font-variant-numeric: tabular-nums;
    pointer-events: none;
  }

  .cursor-position span {
    color: hsl(from var(--text) h s l / 0.5);
  }

  .export-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    font-family: var(--font-space-grotesk);
    padding: 0.5rem 2rem;
    padding-left: 1.6rem; /* magic number to make look good*/
    background-color: var(--background2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;

    transition: all 0.25s;
  }

  button:hover,
  button:focus-visible {
    background-color: hsl(from var(--background2) h s calc(l + 6));
    border-color: hsl(from var(--border) h s calc(l + 10));
  }

  .export-controls :global(svg) {
    width: var(--font-18);
    height: var(--font-18);
    fill: var(--text);

    transition: all 0.25s;
  }

  .export-controls button:hover {
    color: var(--accent);
  }

  .export-controls button:hover :global(svg) {
    fill: var(--accent);
  }

  /* magic numbers to look pretty */
  .download {
    gap: 0.5rem;

    :global(svg) {
      transform: scale(0.7);
    }
  }

  @media (max-width: 700px) {
    .ruler-frame {
      width: min(700px, calc(100cqw - 36px), calc((100cqh - 7rem) * var(--aspect-ratio)));
    }
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  path {
    vector-effect: non-scaling-stroke;
  }
</style>
