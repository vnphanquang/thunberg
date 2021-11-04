import type { Options } from '@popperjs/core';
import type { SvelteComponent } from 'svelte';

export type ActionTooltipParameters = {
  content: string;
  html: string;
  component: typeof SvelteComponent;
  placement: Options['placement'];
  enabled: boolean;
};
