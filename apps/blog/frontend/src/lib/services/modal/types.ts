/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SvelteComponent } from 'svelte';

export interface AppModal<Props extends Record<string, any> = any> {
  /** default to new uuidv4 */
  id: string;
  /** component to render in modal layout */
  component: typeof SvelteComponent;
  /** props passed to modal component */
  props: Props;
}

export interface AppModalEventDispatcher<Resolved> {
  resolve: Resolved;
}

export type AppModalInput<Props extends Record<string, any> = any> = Partial<AppModal<Props>> & Pick<AppModal<Props>, 'component'>;
