<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faTimes } from '@fortawesome/free-solid-svg-icons';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let backdrop: 'static' | boolean = true;
  export let hideCloseBtn = false;
  export let escape = true;

  type Trigger = 'backdrop' | 'button' | 'escape';

  const dispatch = createEventDispatcher<{
    close: Trigger;
  }>();

  function onClickClose() {
    dispatch('close', 'button');
  }

  function onClickBackdrop() {
    if (backdrop && backdrop !== 'static') {
      dispatch('close', 'backdrop');
    }
  }

  function listenForEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && escape) {
      dispatch('close', 'escape');
    }
  }
</script>

<svelte:window on:keyup={listenForEscape} />

{#if backdrop}
  <div class="modal-backdrop" on:click={onClickBackdrop} transition:fade />
{/if}
<section class="modal w-full md:w-6/12 {$$props.class}" transition:fade>
  {#if !hideCloseBtn}
    <button class="btn-icon-primary absolute top-2 right-2" on:click={onClickClose}>
      <Fa icon={faTimes} class="icon text-xl" />
    </button>
  {/if}
  <slot name="header"></slot>
  <slot></slot>
  <slot name="footer"></slot>
</section>

<style lang="postcss">
  .modal-backdrop {
    @apply hidden md:block absolute top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-gray-900 bg-opacity-75 opacity-90;

    z-index: 1;
  }

  .modal {
    @apply absolute py-6 px-8 bg-bg md:rounded-md left-0 top-0 bottom-0 right-0 md:left-1/2 md:top-1/2 md:bottom-auto md:right-auto md:-translate-x-1/2 md:-translate-y-1/2;

    z-index: 2;
  }
</style>
