<script>
  import LineItem from './LineItem.svelte';
</script>

<div class="line-list">
  <ul>
    <LineItem />
  </ul>
</div>

<style>
  .line-list {
    /* position: absolute; */
    /* right: 0; */
    /* top: var(--toolbar-height); */
    /* bottom: 0; */

    height: 100%;
    width: 100%;
    max-width: 350px;
    padding: 2rem;
    background-color: rgb(19, 19, 19);
  }
</style>
