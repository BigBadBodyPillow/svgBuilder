<li class="line-item">
  <span class="number">1</span>
  <div class="content-wrapper">
    <div class="line">
      <div class="line-type"><p>L</p></div>

      <div class="radius-x field">
        2
        <span>rx</span>
      </div>

      <div class="radius-y field">
        2
        <span>ry</span>
      </div>

      <div class="rotation field">
        90
        <span>deg</span>
      </div>

      <div class="arc field">0</div>
      <div class="sweep field">1</div>
      <div class="x field">
        10
        <span>x</span>
      </div>

      <div class="y field">
        10
        <span>y</span>
      </div>
    </div>

    <p class="name">Top Line</p>
  </div>
</li>

<style>
  .line-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .number {
    display: grid;
    place-items: center;
  }

  .content-wrapper {
    display: flex;
    justify-content: space-between;

    padding: 0.5rem;
    background-color: rgb(30, 30, 30);
    border: 1px solid rgb(56, 56, 56);
    border-radius: var(--radius);

    font-size: var(--font-12);
    font-family: var(--font-roboto-mono);
  }
  .line,
  .name {
    padding: 0.3rem;
    height: 2lh;
  }

  .line {
    display: flex;
    gap: 10px;
    align-items: center;
    flex: 1;
  }

  .line-type {
    color: hsl(from var(--text) h s l / 0.3);
  }

  .field {
    display: flex;
    gap: 2px;
    align-items: end;
  }

  span {
    height: 100%;
    font-size: var(--font-10);
    opacity: 0.3;
    user-select: none;
  }

  .name {
    border-radius: var(--radius);

    width: 100%;
    max-width: 100px;

    color: hsl(from var(--text) h s l / 0.3);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    align-content: center;

    &::before {
      content: '| ';
      color: hsl(from var(--text) h s l / 0.7);
    }
  }
</style>
