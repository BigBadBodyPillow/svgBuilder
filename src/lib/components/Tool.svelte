<script lang="ts">
  import type { ToolItem } from '$lib/Types';
  import Tooltip from './Tooltip.svelte';

  interface Props {
    tool: ToolItem;
    active: boolean;
    onSelect: (title: string) => void;
  }

  const { tool, active, onSelect }: Props = $props();

  let tooltipVisible = $state(false);
  let hoverTimeout: ReturnType<typeof setTimeout> | undefined;
  let hideTimeout: ReturnType<typeof setTimeout> | undefined;

  function startHover() {
    clearTimeout(hoverTimeout);
    clearTimeout(hideTimeout);

    hoverTimeout = setTimeout(() => {
      tooltipVisible = true;
    }, 500);
  }

  function endHover() {
    clearTimeout(hoverTimeout);

    hoverTimeout = undefined;
    hideTimeout = setTimeout(() => {
      tooltipVisible = false;
    }, 300);
  }

  function keepTooltipOpen() {
    clearTimeout(hideTimeout);
    hideTimeout = undefined;
  }

  function selectTool() {
    console.log(`Tool pressed: ${tool.title}`);
    onSelect(tool.title);
  }
</script>

<div class="tool-wrapper" role="group" onmouseenter={startHover} onmouseleave={endHover}>
  <button class="tool" class:active aria-pressed={active} onclick={selectTool}>
    <div class="content">{tool.title}</div>
  </button>

  {#if tooltipVisible}
    <Tooltip {...tool} onEnter={keepTooltipOpen} />
  {/if}
</div>

<style>
  .tool-wrapper {
    position: relative;
    height: 100%;
  }

  .tool {
    --tool-background: linear-gradient(rgb(27, 27, 27), rgb(27, 27, 27));
    position: relative;
    overflow: hidden;

    display: grid;
    place-items: center;

    height: 100%;
    aspect-ratio: 1/1;
    max-height: 100px;

    border-radius: var(--radius);
    font-family: var(--font-space-grotesk);
    background: var(--tool-background);
    border: 1px solid var(--border);
    cursor: pointer;
  }

  /* background hover */
  .tool::before {
    --tool-background: linear-gradient(rgb(40, 40, 40), rgb(27, 27, 27));
    content: '';
    position: absolute;
    inset: 0;

    background: var(--tool-background);
    opacity: 0;

    transition: opacity 0.2s ease;
  }

  .tool:hover::before {
    opacity: 1;
  }

  /* background active */
  .tool::after {
    content: '';
    position: absolute;
    inset: 0;

    background: linear-gradient(rgb(255, 25, 56), rgb(190, 15, 40));
    opacity: 0;

    transition: opacity 0.2s ease;
  }

  .tool.active::after {
    opacity: 1;
  }

  .content {
    z-index: 1; /* above background pseudos */
  }
</style>
