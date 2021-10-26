/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AppNotification {
  /** default to new uuidv4 */
  id: string;
  /** text content */
  text: string;
  /** in milliseconds, default to 4000 */
  duration: number;
  /** whether to show progress bar for duration */
  progress: boolean;
  /** default to 'info' */
  variant: AppNotificationVariant;
  /** whether to hide the dismiss button */
  hideDismiss: boolean;
  /**
   * can only be dismissed programmatically (duration & progress can still be shown),
   * will also hide the dismiss button
   */
  persistent: boolean;
  /** optional sync or async function called after notification is popped */
  onPopped?: (notification: AppNotification) => any|Promise<any>;
}

export type AppNotificationVariant = 'info' | 'success' | 'warning' | 'error';
export type AppNotificationInput = Partial<AppNotification>;
export type VariantlessAppNotificationInput = Omit<AppNotificationInput, 'variant'>;

export type AppNotificationHookType = 'push';
export type AppNotificationPushHook = (pushed: AppNotification, notifications: AppNotification[]) => any|Promise<any>;

export type AppNotificationHookMap = {
  push: AppNotificationPushHook[];
};
