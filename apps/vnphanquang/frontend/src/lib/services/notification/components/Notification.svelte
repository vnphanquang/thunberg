<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faTimes } from '@fortawesome/free-solid-svg-icons'
  import type { AppNotificationVariant } from '../types';
  import classnames from 'classnames';
  import { VariantToIconMap } from '../constants';
  import { createEventDispatcher, onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
	import { linear } from 'svelte/easing';

  const TICK = 20; // 20 miliseconds

  export let id: string = '';
  export let variant: AppNotificationVariant;
  export let icon = VariantToIconMap[variant];
  export let text = '';
  export let duration = 0;
  export let progress = false;
  export let persistent = false;
  export let hideDismiss = false;

  const percentage = tweened(0, {
    duration: 100,
    easing: linear,
  });

  const dispatch = createEventDispatcher<{
    dismiss: { id: string; },
    timeout: void,
  }>();

  function onDismiss() {
    dispatch('dismiss', { id });
  }

  const perTick = 1 / (duration / 20);

  onMount(() => {
    if (progress) {
      const interval = setInterval(() => {
        percentage.update(p => {
          const newPercentage = Math.min(p + perTick, 1);
          if (newPercentage === 1) {
            dispatch('timeout');
            clearInterval(interval);
          }
          return newPercentage;
        });
      }, TICK);
      return () => clearInterval(interval);
    }
  });
</script>

<section class={classnames('noti', `noti--${variant}`, progress && 'noti--progress')}>
  <div class="noti__content">
    <span class="noti__icon self-start">
      <Fa {icon} class="icon" />
    </span>
    <p class="mx-2">
      {text}
    </p>
    {#if !hideDismiss && !persistent}
      <button type="button" class="btn-icon-primary mx-2 mt-1 self-start" on:click={onDismiss}>
        <Fa icon={faTimes} class="icon text-sm" />
      </button>
    {/if}
  </div>
  {#if progress}
    <progress value={$percentage} class="block w-full h-1 {variant}" />
  {/if}
</section>

<style lang="postcss">

  .noti {
    & .noti__content {
      @apply bg-bg border border-l-[6px] grid grid-cols-[auto,1fr,auto] py-2 max-w-md min-w-[240px];
    }

    & .noti__icon {
      @apply mx-2 mt-1;
    }

    &.noti--progress {
      & .noti__content {
        border-bottom: 0;
      }
    }

    &.noti--info {
      & .noti__content {
        @apply border-blue-500 border-opacity-50;

        border-left-color: blue;
      }

      & .noti__icon {
        @apply text-blue-500;
      }
    }

    &.noti--success {
      & .noti__content {
        @apply border-green-500 border-opacity-50;

        border-left-color: green;
      }

      & .noti__icon {
        @apply text-green-500;
      }
    }

    &.noti--warning {
      & .noti__content {
        @apply border-yellow-500 border-opacity-50;

        border-left-color: yellow;
      }

      & .noti__icon {
        @apply text-yellow-500;
      }
    }

    &.noti--error {
      & .noti__content {
        @apply border-red-500 border-opacity-50;

        border-left-color: red;
      }

      & .noti__icon {
        @apply text-red-500;
      }
    }
  }
</style>

