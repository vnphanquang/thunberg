import { devtoolsExchange } from '@urql/devtools';

import { EnvMode } from '@vnphanquang/common';
import type { RecursivePartial } from '@vnphanquang/common';
import { deepmerge } from '@vnphanquang/common/utils';

import { BaseConfig } from './config.base';
import type { AppConfigSchema } from './config.base';


const Config: RecursivePartial<AppConfigSchema> = {
  mode: EnvMode.PRODUCTION,
  urql: {
    exchanges: [
      devtoolsExchange,
    ],
  },
};

export const AppConfig = deepmerge(BaseConfig, Config);
