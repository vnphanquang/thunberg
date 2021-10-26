/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type {
  Client,
  ClientOptions,
  OperationResult,
  TypedDocumentNode
} from '@urql/core';
import {createClient} from '@urql/core';

import { deepmerge } from '@thunberg/common';

export class GraphqlService {
  private __client: Client;
  private __defaultFetchOptions: RequestInit = {
    mode: 'cors',
    credentials: 'include',
  };
  private __fetchOptionRegistry: RequestInit[] = [];

  constructor(options: ClientOptions) {
    const mergedOptions = deepmerge({
      fetchOptions: this.__defaultFetchOptions,
      requestPolicy: 'cache-and-network',
    }, options);
    this.__client = createClient(mergedOptions);
  }

  protected get client(): Client {
    return this.__client;
  }

  private __mergeFetchOptions(fetchOptions: RequestInit = {}, skipRegistry = false) {
    if (!fetchOptions) {
      fetchOptions = {};
    }
    if (!skipRegistry) {
      const claimed = this.__fetchOptionRegistry.pop();
      if (claimed) {
        fetchOptions = deepmerge(this.__defaultFetchOptions, claimed, fetchOptions);
      }
    }
    fetchOptions = deepmerge(this.__defaultFetchOptions, fetchOptions);
    return fetchOptions;
  }

  protected async query<Data = any, Variables extends Record<string, unknown> = {}>(
    document: TypedDocumentNode,
    input: Variables,
    fetchOptions?: RequestInit,
  ): Promise<OperationResult<Data, Variables>> {
    const response = await this.client.query<Data, Variables>(
      document,
      input,
      {
        fetchOptions: this.__mergeFetchOptions(fetchOptions),
      },
    ).toPromise();

    if (response.error) {
      throw response.error;
    }

    return response;
  }

  protected async mutation<Data = any, Variables extends Record<string, unknown> = {}>(
    document: TypedDocumentNode,
    input: Variables,
    fetchOptions?: RequestInit,
  ): Promise<OperationResult<Data, Variables>> {
    const response = await this.client.mutation<Data, Variables>(
      document,
      input,
      {
        fetchOptions: this.__mergeFetchOptions(fetchOptions),
      },
    ).toPromise();

    if (response.error) {
      throw response.error;
    }

    return response;
  }

  /**
   * Register a fetch options cache for next operation
   * Should be followed immediately by an operation invocation
   * (first operation will claim the cache)
   */
  public withFetchOptions(options: RequestInit): this {
    this.__fetchOptionRegistry.push(options);
    return this;
  }

  /**
   * Wrapper for 'withFetchOptions' but specific for
   * use in Sveltekit load SSR fetch
   */
  public ssr(options: { cookie: string; }): this {
    return this.withFetchOptions({
      headers: {
        cookie: options.cookie,
      },
    });
  }
}
