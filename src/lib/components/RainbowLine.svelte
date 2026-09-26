<div class="rainbow-line"></div>

<style>
  .rainbow-line {
    position: fixed;
    top: 0;
    width: 100%;
    height: 1px;

    z-index: 20;
    background-image: var(--rainbow);
    background-size: 400%;
    animation: rainbow-animation 100s infinite;
  }

  @keyframes rainbow-animation {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 400%;
    }
  }

  /* Disable animation when reduced motion is preferred */
  @media (prefers-reduced-motion: reduce) {
    .rainbow-line {
      animation: none;
    }
  }
</style>
