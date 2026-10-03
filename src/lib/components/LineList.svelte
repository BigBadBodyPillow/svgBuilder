<script lang="ts">
  import type { PathLine } from '../Types';
  import LineItem from './LineItem.svelte';

  interface Props {
    lines: PathLine[];
    selectedIndex: number;
    onSelectLine: (index: number) => void;
    moveLine: (fromIndex: number, toIndex: number) => void;
  }

  let { lines, selectedIndex, onSelectLine, moveLine }: Props = $props();
</script>

<div class="line-list">
  <p class="title">LINES</p>

  <ul>
    {#each lines as line, index (line)}
      <LineItem
        {index}
        {line}
        isLast={index === lines.length - 1}
        isSelected={index === selectedIndex}
        {onSelectLine}
        {moveLine}
      />
    {/each}
  </ul>
</div>

<style>
  .line-list {
    --margin: 20px;
    --line-list-width: 300px;

    display: flex;
    flex-direction: column;

    height: 100%;
    max-height: calc(100% - (var(--margin) * 2)); /* x2 becuase top and bottom */
    width: var(--line-list-width);

    background: var(--background2);
    border: 1px solid var(--border);
    border-radius: var(--radius);

    margin-inline: 0 var(--margin);
    margin-block: auto;
  }

  .title {
    --spacing: 3.9rem;

    font-family: var(--font-space-grotesk);
    font-size: var(--font-16);
    letter-spacing: var(--spacing);
    text-indent: calc(var(--spacing) / 1);
    text-align: center;

    color: hsl(from var(--text) h s l / 0.6);

    cursor: pointer;

    animation: rainbow-animation 70s infinite;
    margin-top: var(--margin);
  }

  .title:hover {
    background-image: var(--rainbow);
    background-clip: text;
    background-size: 400%;
    color: transparent;
  }

  ul {
    display: flex;
    flex-direction: column;
    flex: 1;
    /* min-height: 0; */

    gap: var(--spacing-12);
    padding: 1rem;

    overflow-y: auto;

    @supports (scrollbar-width: auto) {
      scrollbar-width: thin;
    }
  }

  @keyframes rainbow-animation {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 400%;
    }
  }
</style>
