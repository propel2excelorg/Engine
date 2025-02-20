import { useFetcher } from '@remix-run/react';

import { type ToastProps } from '@engine/ui';

/**
 * This hook is a utility that allows us to show a toast message from anywhere
 * in the UI.
 */
export function useToast() {
  const fetcher = useFetcher();

  function toast({ message }: Pick<ToastProps, 'message'>) {
    fetcher.submit(
      { message },
      {
        action: '/api/toast',
        method: 'post',
      }
    );
  }

  return toast;
}
