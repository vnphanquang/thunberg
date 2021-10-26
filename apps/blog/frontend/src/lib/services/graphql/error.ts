import type { CombinedError } from '@urql/core';

export function extractAppError(urqlError: CombinedError) {
  const { extensions, message } = urqlError.graphQLErrors[0];
  return {
    code: extensions?.exception?.code,
    payload: extensions?.exception?.payload,
    message,
  };
}
