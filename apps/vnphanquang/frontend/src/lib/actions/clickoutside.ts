/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Dispatch event on click outside of node */

export interface ClickOutsideParameters {
  enabled: boolean;
}

export function clickoutside(node: HTMLElement, parameters: ClickOutsideParameters = { enabled: true }) {
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('clickoutside', { detail: node }));
    }
  };

  if (parameters.enabled) {
    document.addEventListener('click', handleClick, true);
  }

  return {
    update({ enabled }: ClickOutsideParameters) {
      if (enabled) {
        document.addEventListener('click', handleClick, true);
      } else {
        document.removeEventListener('click', handleClick, true);
      }
    },
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
	};
}
