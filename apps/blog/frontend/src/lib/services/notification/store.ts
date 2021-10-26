import { writable } from 'svelte/store';

import { createNotification } from './constants';
import type {
  AppNotification,
  AppNotificationHookMap,
  AppNotificationHookType,
  AppNotificationInput,
  AppNotificationPushHook,
  AppNotificationVariant,
  VariantlessAppNotificationInput,
} from './types';

function createNotificationStore() {
  const { subscribe, set } = writable<AppNotification[]>([]);
  let notifications: AppNotification[] = [];
  const hooks: AppNotificationHookMap = {
    push: [],
  };

  function push(options: AppNotificationInput) {
    const notification = createNotification(options);
    notifications.push(notification);
    set([...notifications]);

    // run registered push-hook;
    for (const hook of hooks.push) {
      hook(notification, notifications);
    }
    return notification;
  }

  function pop(id?: string) {
    let popped: AppNotification;
    if (id) {
      notifications = notifications.filter(notification => {
        if (notification.id === id) {
          popped = notification;
          return false;
        }
        return true;
      });
      set(notifications);
    } else {
      popped = notifications.pop();
      set([...notifications]);
    }
    popped.onPopped?.(popped);
    return popped;
  }

  function clear() {
    const cleared = notifications;
    notifications = [];
    set(notifications);
    cleared.forEach(c => c.onPopped?.(c));
    return cleared;
  }

  function createVariantPush(variant: AppNotificationVariant) {
    return function (text: string, options: VariantlessAppNotificationInput = {}) {
      const notification = createNotification({
        text,
        ...options,
        variant,
      });
      return push(notification);
    };
  }

  function hook(type: AppNotificationHookType, callback: AppNotificationPushHook): () => void {
    hooks[type].push(callback);
    return () => {
      hooks[type] = hooks[type].filter(c => c !== callback);
    };
  }

  function clearHook(type?: AppNotificationHookType) {
    if (type) {
      hooks[type] = [];
    } else {
      hooks.push = [];
      // clear other type of hook
    }
  }

  return {
    subscribe,
    push,
    pop,
    clear,
    info: createVariantPush('info'),
    success: createVariantPush('success'),
    warning: createVariantPush('warning'),
    error: createVariantPush('error'),
    hook,
    clearHook,
  };
}

export const appNotification = createNotificationStore();
