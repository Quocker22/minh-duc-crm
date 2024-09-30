import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint(id?: string) {
  return `/employee/resend-pass/${id || ''}`;
}

export function useReSendPassword(options?: MutationOptions<boolean, string>) {
  const { handleCallApi } = useCallApi();
  const createMessage = 'Mật khẩu mới đã được gửi vào mail';

  function handler(id: string) {
    return handleCallApi(
      async () => {
        await axiosClient.get(endpoint(id));

        return fakeNetworkResponse(true);
      },
      true,
      createMessage
    );
  }

  return useMutation(handler, options);
}
