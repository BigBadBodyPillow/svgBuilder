<script lang="ts">
  import type { SvgSettings } from '../Types';

  type NumericSvgField =
    'width' | 'height' | 'viewBoxX' | 'viewBoxY' | 'viewBoxWidth' | 'viewBoxHeight' | 'strokeWidth';

  interface Props {
    svgSettings: SvgSettings;
    updateSvgSetting: (field: keyof SvgSettings, value: number | string) => void;
  }

  let { svgSettings, updateSvgSetting }: Props = $props();

  const svgFields: { key: NumericSvgField; label: string; value: number }[] = $derived([
    { key: 'width', label: 'Output width', value: svgSettings.width },
    { key: 'height', label: 'Output height', value: svgSettings.height },
    { key: 'viewBoxX', label: 'ViewBox X', value: svgSettings.viewBoxX },
    { key: 'viewBoxY', label: 'ViewBox Y', value: svgSettings.viewBoxY },
    { key: 'viewBoxWidth', label: 'ViewBox width', value: svgSettings.viewBoxWidth },
    { key: 'viewBoxHeight', label: 'ViewBox height', value: svgSettings.viewBoxHeight },
    { key: 'strokeWidth', label: 'Stroke width', value: svgSettings.strokeWidth }
  ]);
</script>

<section class="svg-settings" aria-label="SVG settings">
  {#each svgFields as field (field.key)}
    <label class="field">
      <span>{field.label}</span>
      <input
        type="number"
        min={field.key === 'strokeWidth'
          ? 0
          : field.key === 'viewBoxX' || field.key === 'viewBoxY'
            ? undefined
            : 1}
        step="any"
        value={field.value}
        oninput={(event) => updateSvgSetting(field.key, event.currentTarget.valueAsNumber)}
      />
    </label>
  {/each}

  <label class="field">
    <span>Stroke</span>
    <input
      type="color"
      value={svgSettings.stroke}
      oninput={(event) => updateSvgSetting('stroke', event.currentTarget.value)}
    />
  </label>

  <label class="field">
    <span>Fill mode</span>
    <select
      value={svgSettings.fill === 'none' ? 'none' : 'color'}
      onchange={(event) =>
        updateSvgSetting('fill', event.currentTarget.value === 'none' ? 'none' : '#ffffff')}
    >
      <option value="none">None</option>
      <option value="color">Color</option>
    </select>
  </label>

  <label class="field">
    <span>Fill color</span>
    <input
      type="color"
      disabled={svgSettings.fill === 'none'}
      value={svgSettings.fill === 'none' ? '#ffffff' : svgSettings.fill}
      oninput={(event) => updateSvgSetting('fill', event.currentTarget.value)}
    />
  </label>
</section>

<style>
  .svg-settings {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.6rem;

    max-width: 940px;
    width: 100%;

    padding: 1.6rem 2rem;
    margin-inline: auto;
    margin-block: 0 var(--margin);

    background: var(--background2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    color: hsl(from var(--text) h s l / 0.5);
    font-family: var(--font-roboto-mono);
    font-size: var(--font-10);
  }

  input {
    width: 100%;
    max-width: 10rem;
    padding: 0.7rem;

    border-radius: var(--radius);

    border: 1px solid hsl(from var(--border) h s calc(l + 7));
    background: hsl(from var(--background2) h s calc(l + 4));
    color: var(--text);

    font: var(--font-14) var(--font-roboto-mono);
  }

  input[type='color'] {
    padding: 0.3rem;
    height: 100%;
    max-height: 35px;
    max-width: 35px;
    aspect-ratio: 1/1;
  }

  select {
    height: 100%;
    padding: 0.6rem;

    border-radius: var(--radius);

    border: 1px solid hsl(from var(--border) h s calc(l + 7));
    background: hsl(from var(--background2) h s calc(l + 4));
    color: var(--text);

    font: var(--font-14) var(--font-roboto-mono);
  }
</style>
