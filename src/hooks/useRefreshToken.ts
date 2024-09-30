import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/token/refresh-token';
}

export function useRefreshToken(options?: MutationOptions<boolean>) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(
      async () => {
        await axiosClient.post(endpoint());

        return fakeNetworkResponse(true);
      },
      false,
      'lỗi'
    );
  }

  return useMutation(handler, options);
}
