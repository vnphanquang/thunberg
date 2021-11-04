/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';

import { createModal } from './constants';
import type {
  AppModal,
  AppModalInput,
} from './types';

function createModalStore() {
  const { subscribe, set } = writable<AppModal[]>([]);
  let modals: AppModal[] = [];
  const resolveMap: Record<string, (args?: any) => any> = {};

  function push<Props = any, Resolved = null>(options: AppModalInput<Props>): Promise<Resolved> {
    let _resolve;
    const promise = new Promise<Resolved>((resolve) => {
      _resolve = resolve;
    });

    const modal = createModal(options);
    modals.push(modal);
    resolveMap[modal.id] = _resolve;

    set([...modals]);

    return promise;
  }

  function pop(id?: string, resolved?: any) {
    let popped: AppModal;
    if (id) {
      modals = modals.filter(modal => {
        if (modal.id === id) {
          popped = modal;
          return false;
        }
        return true;
      });
      set(modals);
    } else {
      popped = modals.pop();
      set([...modals]);
    }
    resolveMap[popped.id]?.(resolved);
    resolveMap[popped.id] = undefined;
    return popped;
  }

  return {
    subscribe,
    push,
    pop,
  };
}

export const appModal = createModalStore();
