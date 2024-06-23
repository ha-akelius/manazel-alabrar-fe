/**
 * This is the client-side code that uses the inferred types from the server
 */
import { createTRPCClient, splitLink, unstable_httpBatchStreamLink, unstable_httpSubscriptionLink } from '@trpc/client';
/**
 * We only import the `AppRouter` type from the server - this is not available at runtime
 */
import type { AppRouter } from '../projects/server/index.js';

// Initialize the tRPC client
export const trpc = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === 'subscription',
      true: unstable_httpSubscriptionLink({
        url: 'http://localhost:3000',
      }),
      false: unstable_httpBatchStreamLink({
        url: 'http://localhost:3000',
      }),
    }),
  ],
});
