<script lang="ts">
  import type { PathLine } from '../Types';

  interface Props {
    index: number;
    line: PathLine;
    isLast: boolean;
    isSelected: boolean;
    onSelectLine: (index: number) => void;
    moveLine: (fromIndex: number, toIndex: number) => void;
  }

  let { index, line, isLast, isSelected, onSelectLine, moveLine }: Props = $props();
  let isDragging = $state(false);

  const summary = $derived.by(() => {
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
        return 'Close path';
    }
  });

  function dropLine(event: DragEvent) {
    event.preventDefault();
    const fromIndex = Number(event.dataTransfer?.getData('text/plain'));
    if (Number.isInteger(fromIndex)) moveLine(fromIndex, index);
    isDragging = false;
  }
</script>

<li
  class="line-item"
  class:dragging={isDragging}
  draggable="true"
  ondragstart={(event) => {
    isDragging = true;
    event.dataTransfer?.setData('text/plain', String(index));
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }}
  ondragover={(event) => event.preventDefault()}
  ondrop={dropLine}
  ondragend={() => (isDragging = false)}
>
  <span class="number">{index + 1}</span>

  <button
    class="content-wrapper"
    class:selected={isSelected}
    type="button"
    aria-pressed={isSelected}
    aria-label="Select line {index + 1}: {summary}"
    onclick={() => onSelectLine(index)}
  >
    <span class="command">
      <span class="line-type">{line.lineType}</span>

      <span class="command-values">
        {line.lineType === 'Z' ? 'Close path' : summary.slice(1).trim()}
      </span>
    </span>
  </button>
  <span class="reorder-controls">
    <button
      type="button"
      aria-label="Move line {index + 1} up"
      disabled={index === 0}
      onclick={() => moveLine(index, index - 1)}>↑</button
    >
    <button
      type="button"
      aria-label="Move line {index + 1} down"
      disabled={isLast}
      onclick={() => moveLine(index, index + 1)}>↓</button
    >
  </span>
</li>

<style>
  .line-item {
    display: flex;
    align-items: center;
    gap: 0.66rem;
    font: var(--font-14) var(--font-roboto-mono);
    cursor: grab;
  }

  .line-item.dragging {
    opacity: 0.45;
  }
  .line-item:active {
    cursor: grabbing;
  }

  .number {
    display: grid;
    place-items: center;
    width: 2em;

    font-size: var(--font-12);
    font-variant-numeric: tabular-nums;
    color: hsl(from var(--text) h s l / 0.45);
  }

  .line-type {
    color: hsl(from var(--text) h s l / 0.5);
  }

  .content-wrapper {
    display: flex;
    align-items: center;

    width: 100%;
    padding: 1rem 0.8rem;

    text-align: left;

    color: inherit;
    background-color: hsl(from var(--background) h s calc(l + 6));
    border: 1px solid hsl(from var(--background) h s calc(l + 18));
    border-radius: var(--radius);

    cursor: pointer;
  }

  .reorder-controls {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .reorder-controls button {
    padding: 1px 5px;
    border: 0;
    border-radius: var(--radius);
    cursor: pointer;
  }

  .reorder-controls button:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .content-wrapper:hover {
    border-color: hsl(from var(--text) h s l / 0.2);
  }

  .selected {
    border-color: hsl(from var(--text) h s l / 0.3);
    background-color: hsl(from var(--background) h s calc(l + 13));
  }
</style>
