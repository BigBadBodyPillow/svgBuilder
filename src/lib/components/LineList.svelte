<script>
  import LineItem from './LineItem.svelte';
</script>

<div class="line-list">
  <p class="title">LINES</p>

  <ul>
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
    <LineItem />
  </ul>
</div>

<style>
  .line-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 350px;
    background-color: rgb(19, 19, 19);
  }

  .title {
    --spacing: 4rem;

    font-family: var(--font-space-grotesk);
    font-size: var(--font-16);
    letter-spacing: var(--spacing);
    text-indent: var(--spacing);
    text-align: center;

    padding: 2rem;
    padding-bottom: 0;
    margin-bottom: 2rem;

    color: hsl(from var(--text) h s l / 0.6);

    cursor: pointer;

    animation: rainbow-animation 70s infinite;
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
    min-height: 0;
    gap: 12px;
    padding-inline: 2rem;
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
