<script lang="ts">
  import type { PathLine, SvgSettings } from '$lib/Types';
  import Canvas from '$lib/components/Canvas.svelte';
  import FieldEditor from '$lib/components/FieldEditor.svelte';
  import LineList from '$lib/components/LineList.svelte';
  import RainbowLine from '$lib/components/RainbowLine.svelte';
  import SvgSettingsEditor from '$lib/components/SvgSettingsEditor.svelte';
  import Toolbar from '$lib/components/Toolbar.svelte';

  let lines = $state<PathLine[]>([{ lineType: 'M', x: 0, y: 0 }]);
  let selectedLineIndex = $state(0);
  let svgSettings = $state<SvgSettings>({
    width: 700,
    height: 700,
    viewBoxX: 0,
    viewBoxY: 0,
    viewBoxWidth: 100,
    viewBoxHeight: 100,
    stroke: '#ff1938',
    strokeWidth: 4,
    fill: 'none'
  });
  const selectedLine = $derived(lines[selectedLineIndex]);

  function addLine(lineType: PathLine['lineType']) {
    const previousLine = lines.at(-1);
    let previousX = 10;
    let previousY = 10;

    if (previousLine && previousLine.lineType !== 'Z') {
      if ('x' in previousLine) previousX = previousLine.x;
      if ('y' in previousLine) previousY = previousLine.y;
    }

    const x = previousX;
    const y = previousY;

    switch (lineType) {
      case 'M':
      case 'L':
      case 'T':
        lines.push({ lineType, x, y });
        break;
      case 'H':
        lines.push({ lineType, x });
        break;
      case 'V':
        lines.push({ lineType, y });
        break;
      case 'A':
        lines.push({ lineType, rx: 1, ry: 1, xRotation: 0, arc: 0, sweep: 1, x, y });
        break;
      case 'Q':
        lines.push({ lineType, x1: previousX + 25, y1: previousY, x, y });
        break;
      case 'C':
        lines.push({
          lineType,
          x1: previousX + 25,
          y1: previousY,
          x2: previousX + 25,
          y2: y,
          x,
          y
        });
        break;
      case 'S':
        lines.push({ lineType, x2: previousX + 25, y2: y, x, y });
        break;
      case 'Z':
        lines.push({ lineType });
        break;
    }

    selectedLineIndex = lines.length - 1;
  }

  function updateLine(index: number, field: string, value: number) {
    const line = lines[index];
    if (!line || line.lineType === 'Z') return;

    lines[index] = { ...line, [field]: value } as PathLine;
  }

  function deleteLine(index: number) {
    if (!lines[index]) return;

    lines.splice(index, 1);
    selectedLineIndex = lines.length ? Math.min(index, lines.length - 1) : -1;
  }

  function moveLine(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex || !lines[fromIndex] || toIndex < 0 || toIndex >= lines.length)
      return;

    const [line] = lines.splice(fromIndex, 1);
    lines.splice(toIndex, 0, line);

    if (selectedLineIndex === fromIndex) {
      selectedLineIndex = toIndex;
    } else if (fromIndex < selectedLineIndex && toIndex >= selectedLineIndex) {
      selectedLineIndex -= 1;
    } else if (fromIndex > selectedLineIndex && toIndex <= selectedLineIndex) {
      selectedLineIndex += 1;
    }
  }

  function updateSvgSetting(field: keyof SvgSettings, value: number | string) {
    if (typeof value === 'number') {
      if (!Number.isFinite(value)) return;

      if (['width', 'height', 'viewBoxWidth', 'viewBoxHeight'].includes(field)) {
        value = Math.max(1, value);
      } else if (field === 'strokeWidth') {
        value = Math.max(0, value);
      }
    }

    svgSettings = { ...svgSettings, [field]: value } as SvgSettings;
  }
</script>

<RainbowLine />
<Toolbar {addLine} />
<main>
  <section class="workspace">
    <FieldEditor
      line={selectedLine}
      index={selectedLineIndex}
      {updateLine}
      onDeleteLine={deleteLine}
    />

    <Canvas {lines} {svgSettings} />

    <SvgSettingsEditor {svgSettings} {updateSvgSetting} />
  </section>

  <LineList
    {lines}
    selectedIndex={selectedLineIndex}
    onSelectLine={(index) => (selectedLineIndex = index)}
    {moveLine}
  />
</main>

<style>
  :root {
    --background2: hsl(from var(--background) h s calc(l + 2));
    --border: hsl(from var(--background) h s calc(l + 10));

    --transition-duration: 0.5s;
    --toolbar-height: 60px;
    --margin: 20px;

    --rainbow: linear-gradient(
      to left,
      #fef26a,
      #fe8462,
      #ff70cb,
      #d270ff,
      #743ad5,
      #709df8,
      #5bffbd,
      #709df8,
      #743ad5,
      #d270ff,
      #ff70cb,
      #fe8462,
      #fef26a
    );
  }

  :global(button) {
    font: inherit;
    color: inherit;
    background: inherit;
  }
  main {
    height: calc(100% - var(--toolbar-height));
    min-height: 0;

    display: flex;
    justify-content: space-between;
  }

  .workspace {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
  }
</style>
