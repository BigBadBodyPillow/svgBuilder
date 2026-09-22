<script lang="ts">
  import type { ToolItem } from '$lib/Types';
  import Tool from './Tool.svelte';

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
  }
</script>

<div class="toolbar">
  {#each tools as tool (tool.title)}
    <Tool {tool} active={tool.title === isActiveTool} onSelect={selectTool} />
  {/each}
</div>

<style>
  .toolbar {
    display: flex;
    align-items: center;
    gap: 1rem;

    height: 60px;

    padding: 0.76rem;
    padding-inline: 5rem;

    background-color: var(--background2);
    border: var(--border);
  }
</style>
