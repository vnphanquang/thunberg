import type { Exchange } from '@urql/core';

import { EnvMode } from '@thunberg/common';


const api = {
  thunberg: {
    blog: {
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
