import type { Exchange } from '@urql/core';

import { EnvMode } from '@vnphanquang/common';

export type AppConfigSchema = {
  mode: EnvMode;
  urql: {
    exchanges: Exchange[];
  };
};

export const BaseConfig: AppConfigSchema = {
  mode: EnvMode.UNKNOWN,
  urql: {
    exchanges: [],
  },
};
