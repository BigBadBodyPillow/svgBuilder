<script lang="ts">
  interface Props {
    svgMarkup: string;
    open?: boolean;
  }

  let { svgMarkup, open = $bindable(false) }: Props = $props();
  let codeDialog: HTMLDialogElement;
  let copyStatus = $state('');

  $effect(() => {
    if (!codeDialog) return;

    if (open) {
      if (!codeDialog.open) codeDialog.showModal();
      copyStatus = '';
      return;
    }

    if (codeDialog.open) codeDialog.close();
  });

  async function copySvg() {
    try {
      await navigator.clipboard.writeText(svgMarkup);
      copyStatus = 'Copied';
    } catch {
      copyStatus = 'Copy failed';
    }
  }
</script>

<dialog
  bind:this={codeDialog}
  aria-labelledby="code-title"
  class="code-dialog"
  onclose={() => (open = false)}
>
  <div class="dialog-header">
    <h2 id="code-title">SVG code</h2>

    <form method="dialog" class="close" onsubmit={() => (open = false)}>
      <button type="submit" aria-label="Close code dialog">⨉</button>
    </form>
  </div>

  <textarea readonly aria-label="Generated SVG code" value={svgMarkup}></textarea>

  <div class="dialog-footer">
    <span aria-live="polite">{copyStatus}</span>

    <button type="button" onclick={copySvg}>copy</button>
  </div>
</dialog>

<style>
  .code-dialog {
    margin: auto;

    width: min(640px, calc(100vw - 2rem));
    max-width: none;

    padding: 1rem;

    color: var(--text);
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .code-dialog::backdrop {
    background: rgba(0, 0, 0, 0.55);
  }

  .dialog-header,
  .dialog-footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-content: space-between;
  }

  .close button {
    margin-left: auto;
    padding: 0.5rem 0.8rem;

    background-color: var(--background2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-size: var(--font-10);

    cursor: pointer;
  }

  .close button:hover,
  .close button:focus-visible {
    color: var(--accent);
    border: 1px solid hsl(from var(--accent) h s l / 0.55);
    background: hsl(from var(--accent) h s l / 0.12);
  }

  .dialog-footer span {
    margin-left: 10px;
    font-size: var(--font-12);
    color: var(--text);
    font-family: var(--font-roboto-mono);
  }

  .dialog-header h2 {
    margin: 0;
    font-size: var(--font-16);
  }

  .dialog-header form {
    margin: 0;
  }

  button {
    font-family: var(--font-space-grotesk);
    padding: 0.5rem 0.75rem;
    background-color: var(--background2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;

    transition: all 0.25s;
  }

  button:hover,
  button:focus-visible {
    background-color: hsl(from var(--background2) h s calc(l + 6));
    border-color: hsl(from var(--border) h s calc(l + 10));
  }

  textarea {
    display: block;
    width: 100%;
    min-height: 240px;
    margin-block: 1rem;
    padding: 0.75rem;

    color: var(--text);
    background: var(--background2);
    border: 1px solid var(--border);
    border-radius: var(--radius);

    user-select: contain;
    resize: vertical;
    font: var(--font-12)/1.5 var(--font-roboto-mono);
  }
</style>
