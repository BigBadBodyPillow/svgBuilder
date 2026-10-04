<script lang="ts">
  import type { PathLine, ToolItem } from '$lib/Types';
  import Tool from './Tool.svelte';

  interface Props {
    addLine: (lineType: PathLine['lineType']) => void;
  }

  let { addLine }: Props = $props();

  const tools: ToolItem[] = [
    {
      name: 'Move',
      title: 'M',
      syntax: 'x y',
      syntaxDescription: 'Move starting point X. Move starting point Y',
      description: 'Move the starting point.'
    },
    {
      name: 'Line',
      title: 'L',
      syntax: 'x y',
      syntaxDescription: 'Destination X. Destination Y.',
      description: 'A Line to the position.'
    },
    {
      name: 'Horizontal Line',
      title: 'H',
      syntax: 'x',
      syntaxDescription: 'Destination X.',
      description: 'A horizontal line to a position.'
    },
    {
      name: 'Vertical Line',
      title: 'V',
      syntax: 'y',
      syntaxDescription: 'Destination Y.',
      description: 'A vertical line to a position.'
    },
    {
      name: 'Arc',
      title: 'A',
      syntax: 'rx ry x-axis-rotation large-arc-flag sweep-flag x y',
      syntaxDescription:
        'X Radius of ellipse. Y Radius of ellipse. Rotation of ellipse. 0 - arcs less than 180 degrees, 1 - arcs greater than 180 degrees. 0 - counter clockwise, 1 - clockwise. Destination X. Destination Y.',
      description: 'An elliptic al arc to the position based on radius, angle, and sweep.'
    },
    {
      name: 'Quadratic Bézier Curve',
      title: 'Q',
      syntax: 'x1 y1, x y',
      syntaxDescription: 'Control Point X. Control Point Y. Destination X. Destination Y.',
      description: 'A line to the position that is bent / pulled by the control point.'
    },
    {
      name: 'Smooth Quadratic Bézier Curve',
      title: 'T',
      syntax: 'x y',
      syntaxDescription: 'Destination X. Destination Y',
      description: 'Mirrors the control points from the previous Q curve.'
    },
    {
      name: 'Cubic Bézier Curve',
      title: 'C',
      syntax: 'x1 y1, x2 y2, x y',
      syntaxDescription:
        'Control Point 1 X. Control Point 1 Y. Control Point 2 X. Control Point 2 Y. Destination X. Destination Y',
      description: 'A line to a position that is bent / pulled by 2 indipendant control points.'
    },
    {
      name: 'Smooth Cubic Bézier Curve',
      title: 'S',
      syntax: 'x2 y2, x y',
      syntaxDescription: 'Control Point 2 X. Control Point 2 Y. Destination X. Destination Y',
      description: 'Mirrors the control points from the previous C curve.'
    },
    { name: 'Close', title: 'Z', description: 'Close Path' }
  ];

  let isActiveTool = $state<string | null>(null);

  function selectTool(title: string) {
    isActiveTool = isActiveTool === title ? null : title;
    addLine(title as PathLine['lineType']);
  }
</script>

<div class="container">
  <div class="toolbar">
    {#each tools as tool (tool.title)}
      <Tool {tool} active={tool.title === isActiveTool} onSelect={selectTool} />
    {/each}
  </div>
</div>

<style>
  .container {
    position: relative;
    z-index: 2;

    width: 100%;
    margin-inline: auto;
    background-color: var(--background2);
  }

  .toolbar {
    display: flex;
    align-items: center;
    /* gap: 1rem; */

    height: var(--toolbar-height);
    width: 100%;
    max-width: 1300px;
    margin-inline: auto;

    padding: 0.75rem;
    padding-inline: 5rem;

    isolation: isolate;
    anchor-name: --hovered-tool;
  }

  .toolbar::before,
  .toolbar::after {
    content: '';
    position-anchor: --hovered-tool;

    position: absolute;
    top: calc(anchor(top));
    left: anchor(left);
    right: anchor(right);
    bottom: anchor(top);

    transition: var(--transition-duration)
      linear(
        0,
        0.029 1.6%,
        0.123 3.5%,
        0.651 10.6%,
        0.862 14.1%,
        1.002 17.7%,
        1.046 19.6%,
        1.074 21.6%,
        1.087 23.9%,
        1.086 26.6%,
        1.014 38.5%,
        0.994 46.3%,
        1
      );
  }

  .toolbar::before {
    z-index: -1;
  }
  .toolbar::after {
    z-index: -2;
    background-image: linear-gradient(
      transparent,
      transparent
    ); /* stops it for appearing when zooming*/
    background-attachment: fixed;

    @supports not (corner-shape: squircle) {
      border-radius: var(--radius);
    }
  }

  .toolbar:has(:global(.tool):hover)::before,
  .toolbar:has(:global(.tool):hover)::after {
    background-image: linear-gradient(var(--accent), var(--accent));
    top: anchor(top);
    left: anchor(left);
    right: anchor(right);
    bottom: anchor(bottom);

    @supports not (corner-shape: squircle) {
      border-radius: var(--radius);
    }

    @supports (corner-shape: squircle) {
      corner-shape: squircle;
      border-radius: 50%;
    }
  }
</style>
