<script lang="ts">
  import type { PathLine } from '../Types';

  interface Props {
    index: number;
    line: PathLine;
  }

  let { index, line }: Props = $props();

  const fields = $derived.by(() => {
    switch (line.lineType) {
      case 'M':
        return [
          { value: line.x, label: 'x' },
          { value: line.y, label: 'y' }
        ];
      case 'L':
        return [
          { value: line.x, label: 'x' },
          { value: line.y, label: 'y' }
        ];
      case 'H':
        return [{ value: line.x, label: 'x' }];
      case 'V':
        return [{ value: line.y, label: 'y' }];
      case 'A':
        return [
          { value: line.rx, label: 'rx' },
          { value: line.ry, label: 'ry' },
          { value: line.xRotation, label: 'deg' },
          { value: line.arc, label: undefined },
          { value: line.sweep, label: undefined },
          { value: line.x, label: 'x' },
          { value: line.y, label: 'y' }
        ];
      case 'Q':
        return [
          { value: line.x1, label: 'x1' },
          { value: line.y1, label: 'y1' },
          { value: line.x, label: 'x' },
          { value: line.y, label: 'y' }
        ];
      case 'T':
        return [
          { value: line.x, label: 'x' },
          { value: line.y, label: 'y' }
        ];
      case 'C':
        return [
          { value: line.x1, label: 'x1' },
          { value: line.y1, label: 'y1' },
          { value: line.x2, label: 'x2' },
          { value: line.y2, label: 'y2' },
          { value: line.x, label: 'x' },
          { value: line.y, label: 'y' }
        ];
      case 'S':
        return [
          { value: line.x2, label: 'x2' },
          { value: line.y2, label: 'y2' },
          { value: line.x, label: 'x' },
          { value: line.y, label: 'y' }
        ];
      case 'Z':
        return;
    }
  });
</script>

<li class="line-item">
  <span class="number">{index + 1}</span>

  <div class="content-wrapper">
    <div class="line">
      <div class="line-type"><p>{line.lineType}</p></div>

      {#each fields as field, fieldIndex (fieldIndex)}
        <div class="field">
          <p>{field.value}</p>
          <span class="field-label">{field.label}</span>
        </div>
      {/each}
    </div>

    {#if 'name' in line}
      <p class="name">{line.name}</p>
    {/if}
  </div>
</li>

<style>
  .line-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .number {
    display: grid;
    place-items: center;
  }

  .content-wrapper {
    display: flex;
    justify-content: space-between;

    width: 100%;

    padding: 0.5rem;
    background-color: rgb(30, 30, 30);
    border: 1px solid rgb(56, 56, 56);
    border-radius: var(--radius);

    font-size: var(--font-12);
    font-family: var(--font-roboto-mono);
  }

  .line,
  .name {
    padding: 0.3rem;
    height: 2lh;
  }

  .line {
    display: flex;
    gap: 10px;
    align-items: center;
    flex: 1;
  }

  .line-type {
    color: hsl(from var(--text) h s l / 0.3);
  }

  .field {
    display: flex;
    gap: 2px;
    align-items: end;
  }

  span {
    height: 100%;
    font-size: var(--font-10);
    opacity: 0.3;
    user-select: none;
  }

  .name {
    border-radius: var(--radius);

    width: fit-content;
    max-width: 6.5em;

    color: hsl(from var(--text) h s l / 0.3);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    align-content: center;

    &::before {
      content: '| ';
      color: hsl(from var(--text) h s l / 0.7);
    }

    /* hide if empty */
    &:empty::before {
      content: '';
    }
  }
</style>
