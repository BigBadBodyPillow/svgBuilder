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
    }, 500);
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
    position: relative;
    overflow: hidden;

    display: grid;
    place-items: center;

    height: 100%;
    aspect-ratio: 1/1;
    max-height: 100px;

    border-radius: var(--radius);
    font-family: var(--font-space-grotesk);
    border: none;
    cursor: pointer;

    @supports (corner-shape: squircle) {
      corner-shape: squircle;
      border-radius: 50%;
    }

    transition:
      color var(--transition-duration),
      background-color var(--transition-duration);
  }

  .tool:hover {
    anchor-name: --hovered-tool;
  }

  .tool.active {
    color: var(--text-invert);
    background-color: white;
    opacity: 0.5;

    transition: opacity 10s ease;

    @starting-style {
      opacity: 1;
    }
  }
</style>
