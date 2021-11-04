<script lang="ts">
  import { appModal } from '../store';
  import type { AppModal } from '../types';

  function onResolve(modal: AppModal, event: CustomEvent) {
    appModal.pop(modal.id, event.detail);
  }
</script>
{#if $appModal.length}
  <aside class="modal-container {$$props.class}">
    <ul>
      {#each $appModal as modal (modal.id)}
        <li>
          <svelte:component this={modal.component} {...modal.props} on:resolve={(event) => onResolve(modal, event)} />
        </li>
      {/each}
    </ul>
  </aside>
{/if}

<style lang="postcss">
  .modal-container {
    @apply top-0 left-0 bottom-0 right-0;
  }
</style>
