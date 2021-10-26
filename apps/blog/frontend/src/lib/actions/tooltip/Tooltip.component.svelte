<script lang="ts">
  export let content = '';
  export let html = '';
</script>

<div id="tooltip" role="tooltip">
  {#if html}
    {@html html}
  {/if}
  {#if content}
    <p>{content}</p>
  {/if}
  <div id="arrow" data-popper-arrow />
</div>

<style lang="postcss">
  #tooltip {
    @apply text-text bg-gray-400;

    padding: 4px 8px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: bold;
  }

  #arrow,
  #arrow::before {
    position: absolute;
    z-index: -1;
    width: 8px;
    height: 8px;
  }

  #arrow::before {
    @apply bg-gray-400;

    content: '';
    transform: rotate(45deg);
  }

  :global(#tooltip[data-popper-placement^='bottom'] > #arrow) {
    top: -4px;
  }

  :global(#tooltip[data-popper-placement^='top'] > #arrow) {
    bottom: -4px;
  }

  :global(#tooltip[data-popper-placement^='left'] > #arrow) {
    right: -4px;
  }

  :global(#tooltip[data-popper-placement^='right'] > #arrow) {
    left: -4px;
  }
</style>
