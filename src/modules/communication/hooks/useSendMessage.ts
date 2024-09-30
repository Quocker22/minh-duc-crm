import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { SupportMessage } from '@/modules/communication/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/support/message/send';
}

export function useSendMessage(options?: MutationOptions<boolean, SupportMessage>) {
  const { handleCallApi } = useCallApi();
  const messageError = 'Gửi tin nhắn thất bại';

  function handler(body: SupportMessage) {
    return handleCallApi(
      async () => {
        await axiosClient.post(endpoint(), body);

        return fakeNetworkResponse(true);
      },
      true,
      '',
      messageError
    );
  }

  return useMutation(handler, options);
}
