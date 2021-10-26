import {
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from '@urql/core';

import { AppConfig } from '$config';
import { GraphqlService } from '@thunberg/blog-graphql/service';

export const gqlService = new GraphqlService({
  url: AppConfig.api.thunberg.blog.graphql,
  fetch,
  exchanges: [
    ...AppConfig.urql.exchanges,
    fetchExchange,
    dedupExchange,
    cacheExchange,
  ],
});
