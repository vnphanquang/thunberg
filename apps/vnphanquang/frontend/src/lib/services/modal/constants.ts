/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import type {
  AppModal,
  AppModalInput,
} from './types';

export function createModal<Props extends Record<string, any> = any>(modal: AppModalInput): AppModal<Props> {
  return {
    id: uuidv4(),
    props: {},
    ...modal,
  };
}
