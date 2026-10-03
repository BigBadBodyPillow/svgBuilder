<script lang="ts">
  import type { PathLine } from '../Types';

  interface Props {
    line: PathLine | undefined;
    index: number;
    updateLine: (index: number, field: string, value: number) => void;
    onDeleteLine: (index: number) => void;
  }

  let { line, index, updateLine, onDeleteLine }: Props = $props();

  const fields = $derived.by(() => {
    if (!line) return [];

    switch (line.lineType) {
      case 'M':
      case 'L':
      case 'T':
        return [
          { key: 'x', value: line.x, label: 'X' },
          { key: 'y', value: line.y, label: 'Y' }
        ];
      case 'H':
        return [{ key: 'x', value: line.x, label: 'X' }];
      case 'V':
        return [{ key: 'y', value: line.y, label: 'Y' }];
      case 'A':
        return [
          { key: 'rx', value: line.rx, label: 'Radius X' },
          { key: 'ry', value: line.ry, label: 'Radius Y' },
          { key: 'xRotation', value: line.xRotation, label: 'Rotation' },
          { key: 'arc', value: line.arc, label: 'Large arc' },
          { key: 'sweep', value: line.sweep, label: 'Sweep' },
          { key: 'x', value: line.x, label: 'X' },
          { key: 'y', value: line.y, label: 'Y' }
        ];
      case 'Q':
        return [
          { key: 'x1', value: line.x1, label: 'Control X' },
          { key: 'y1', value: line.y1, label: 'Control Y' },
          { key: 'x', value: line.x, label: 'X' },
          { key: 'y', value: line.y, label: 'Y' }
        ];
      case 'C':
        return [
          { key: 'x1', value: line.x1, label: 'Control 1 X' },
          { key: 'y1', value: line.y1, label: 'Control 1 Y' },
          { key: 'x2', value: line.x2, label: 'Control 2 X' },
          { key: 'y2', value: line.y2, label: 'Control 2 Y' },
          { key: 'x', value: line.x, label: 'X' },
          { key: 'y', value: line.y, label: 'Y' }
        ];
      case 'S':
        return [
          { key: 'x2', value: line.x2, label: 'Control X' },
          { key: 'y2', value: line.y2, label: 'Control Y' },
          { key: 'x', value: line.x, label: 'X' },
          { key: 'y', value: line.y, label: 'Y' }
        ];
      case 'Z':
        return [];
    }
  });
</script>

<section class="field-editor" aria-label="Selected line fields">
  {#if line}
    <div class="title">
      <span>Line {index + 1} {line.lineType}</span>
      <button class="delete" type="button" onclick={() => onDeleteLine(index)}> Delete </button>
    </div>
  {/if}

  {#if !line}
    <p class="empty">No line selected.</p>
  {:else if fields.length === 0}
    <p class="empty">No editable fields.</p>
  {:else}
    <div class="fields">
      {#each fields as field (field.key)}
        <label class="field">
          <span>{field.label}</span>
          <input
            type="number"
            min={field.key === 'arc' || field.key === 'sweep' ? 0 : undefined}
            max={field.key === 'arc' || field.key === 'sweep' ? 1 : undefined}
            step={field.key === 'arc' || field.key === 'sweep' ? 1 : 'any'}
            value={field.value}
            oninput={(event) => {
              const value = event.currentTarget.valueAsNumber;
              if (Number.isFinite(value)) updateLine(index, field.key, value);
            }}
          />
        </label>
      {/each}
    </div>
  {/if}
</section>

<style>
  .field-editor {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    max-width: 940px;
    width: 100%;

    padding: 1.6rem 2rem;
    margin-inline: auto;
    margin-block: var(--margin) 0;

    background: var(--background2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .title span,
  .empty {
    font-family: var(--font-roboto-mono);
    color: hsl(from var(--text) h s l / 0.5);
    font-size: var(--font-12);
  }

  .delete {
    margin-left: auto;
    padding: 0.5rem 0.8rem;

    background: hsl(from var(--accent) h s l / 0.06);
    border: 1px solid hsl(from var(--accent) h s l / 0.55);
    border-radius: var(--radius);
    color: var(--accent);
    font-size: var(--font-10);

    cursor: pointer;
  }

  .delete:hover {
    background: hsl(from var(--accent) h s l / 0.12);
  }

  .fields {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.6rem;
  }

  .field {
    min-width: 9rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    color: hsl(from var(--text) h s l / 0.5);

    font-family: var(--font-roboto-mono);
    font-size: var(--font-10);
  }

  input {
    max-width: 10rem;
    width: 100%;
    padding: 0.7rem;

    border-radius: var(--radius);

    border: 1px solid hsl(from var(--border) h s calc(l + 7));
    background: hsl(from var(--background2) h s calc(l + 4));
    color: var(--text);

    font: var(--font-14) var(--font-roboto-mono);
  }
</style>
