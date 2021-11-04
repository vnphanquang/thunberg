import type { Exchange } from '@urql/core';

import { EnvMode } from '@vnphanquang/common';


const api = {
  thunberg: {
    vnphanquang: {
      frontend: 'http://localhost:3000',
      graphql: 'http://localhost:3005/grpahql',
    },
  },
};

export type AppConfigSchema = {
  mode: EnvMode;
  urql: {
    exchanges: Exchange[];
  };
  api: typeof api;
};

export const BaseConfig: AppConfigSchema = {
  mode: EnvMode.UNKNOWN,
  urql: {
    exchanges: [],
  },
  api,
};
