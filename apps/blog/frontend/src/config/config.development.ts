import { devtoolsExchange } from '@urql/devtools';

import { EnvMode } from '@thunberg/common';
import type { RecursivePartial } from '@thunberg/common';
import { deepmerge } from '@thunberg/common/utils';

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
