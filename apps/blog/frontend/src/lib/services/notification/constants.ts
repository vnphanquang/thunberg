import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import type {
  AppNotificationVariant,
  AppNotification,
  AppNotificationInput,
} from './types';

export function createNotification(notification: AppNotificationInput): AppNotification {
  return {
    id: uuidv4(),
    duration: 4000,
    variant: 'info',
    text: '',
    hideDismiss: false,
    persistent: false,
    progress: false,
    ...notification,
  };
}

export const VariantToIconMap: Record<AppNotificationVariant, IconDefinition> = {
  info: faInfoCircle,
  success: faCheckCircle,
  warning: faExclamationTriangle,
  error: faExclamationCircle,
};
