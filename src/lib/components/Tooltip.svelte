<script lang="ts">
  import type { ToolItem } from '$lib/Types';

  type Props = ToolItem & {
    onEnter: () => void;
  };

  const { name, title, syntax, syntaxDescription, description, onEnter }: Props = $props();
</script>

<div class="tooltip" role="group" onmouseenter={onEnter}>
  <div class="top-line">
    <p class="name">{name}</p>
    <div class="syntax-menu">
      <span class="syntax">{title} {syntax}</span>
      {#if syntaxDescription}
        <span class="syntax-description">{syntaxDescription}</span>
      {/if}
    </div>
  </div>
  <p class="description">{description}</p>
</div>

<style>
  .tooltip {
    --highlight: rgb(35, 34, 34);
    --muted: hsl(from var(--text) h s calc(l - 10));

    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;

    width: max-content;
    min-width: 200px;
    max-width: min(500px, calc(100vw - 2rem));
    overflow-wrap: anywhere;

    display: flex;
    flex-direction: column;

    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius);

    padding: 1.2rem 1.5rem;

    z-index: 3;
  }

  .top-line {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
      font-size: var(--font-20);
      margin-block: 1rem;
      font-weight: 700;
    }
  }

  .syntax-menu {
    position: relative;
    background-color: var(--highlight);
    height: fit-content;

    color: var(--muted);
    font-family: var(--font-roboto-mono);
    font-size: var(--font-12);
  }

  .syntax {
    padding: 0;
    border: 0;
    color: inherit;
    cursor: pointer;
  }

  .syntax-description {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    z-index: 1;

    display: none;
    width: max-content;
    max-width: min(400px, calc(100vw - 2rem));

    padding: 0.8rem;

    background: var(--highlight);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-family: var(--font-inter);
    font-size: var(--font-16);
  }

  .syntax-menu:hover .syntax-description,
  .syntax:focus-visible + .syntax-description {
    display: block;
  }
</style>
