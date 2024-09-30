/* eslint-disable unused-imports/no-unused-vars */
import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint(id: string) {
  return `/form-salary/${id}/file`;
}

export function useUpdateFileWorker(
  options?: MutationOptions<
    boolean,
    {
      formId: string;
      uploadFormFileReq: { file: string };
    }
  >
) {
  const { handleCallApi } = useCallApi();
  const updateMessageSuccess = 'Cập nhật file thành công';
  const updateMessageError = 'Cập nhật file thất bại';

  function handler({
    uploadFormFileReq,
    formId,
  }: {
    formId: string;
    uploadFormFileReq: { file: string };
  }) {
    return handleCallApi(
      async () => {
        await axiosClient.put(endpoint(formId), uploadFormFileReq);

        return fakeNetworkResponse(true);
      },
      true,
      '',
      updateMessageError
    );
  }

  return useMutation(handler, options);
}
