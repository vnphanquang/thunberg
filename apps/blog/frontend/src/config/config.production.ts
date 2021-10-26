import { EnvMode } from '@thunberg/common';
import type { RecursivePartial } from '@thunberg/common';
import { deepmerge } from '@thunberg/common/utils';

import { BaseConfig } from './config.base';
import type { AppConfigSchema } from './config.base';


const Config: RecursivePartial<AppConfigSchema> = {
  mode: EnvMode.DEVELOPMENT,
  api: {
    thunberg: {
      blog: {
        frontend: 'https://blog.vnphanquang.com',
        graphql: 'https://blog-api.vnphanquang.com/grpahql',
      },
    },
  },
};

export const AppConfig = deepmerge(BaseConfig, Config);
