<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import NotificationComponent from './Notification.svelte';
  import { appNotification } from '../store';
  import type { AppNotification } from '../types';

  const timeOutIdMap: Map<string, NodeJS.Timeout> = new Map();

  function addAutoTimeout(notification: AppNotification): void {
    const { id, duration, persistent } = notification;
    if (!persistent) {
      timeOutIdMap.set(
        id,
        setTimeout(() => appNotification.pop(id), duration),
      );
    }
  }

  function onDismiss(event: CustomEvent<{ id: string; }>) {
    const id = event.detail.id;
    const timeOutId = timeOutIdMap.get(id);
    if (timeOutId) {
      clearTimeout(timeOutId);
      timeOutIdMap.delete(id);
    }
    appNotification.pop(id);
  }

  onMount(() => {
    const unhook = appNotification.hook('push', addAutoTimeout);
    return unhook;
  });
</script>

<aside class="{$$props.class}">
  <ul class="grid grid-cols-1 row-auto gap-y-4">
    {#each $appNotification as { onPopped, ...notification } (notification.id)}
      <li
        in:fly="{{ x: 200, duration: 500 }}"
        out:fade={{ duration: 350 }}
        animate:flip={{ easing: quintOut, duration: 500 }}
      >
        <NotificationComponent
          {...notification}
          on:dismiss={onDismiss}
        />
      </li>
    {/each}
  </ul>
</aside>
