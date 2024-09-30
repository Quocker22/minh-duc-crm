import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint(questionId: string) {
  return `/question/delete/${questionId}`;
}

export function useDeleteQuestion(options?: MutationOptions<boolean, string>) {
  const { handleCallApi } = useCallApi();
  const deleteMessageError = 'Xóa câu hỏi thất bại';

  function handler(questionId: string) {
    return handleCallApi(
      async () => {
        await axiosClient.delete(endpoint(questionId));

        return fakeNetworkResponse(true);
      },
      true,
      '',
      deleteMessageError
    );
  }

  return useMutation(handler, options);
}
