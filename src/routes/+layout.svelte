<script lang="ts">
  import '../reset.css';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />

  <title>SVG Builder</title>
</svelte:head>

{@render children()}
