import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormWorkerModel } from '@/modules/worker/models';

function endpoint() {
  return '/worker/create';
}

export function useCreateWorker(options?: MutationOptions<boolean, FormWorkerModel>) {
  const { handleCallApi } = useCallApi();
  const createMessage = 'Tạo mới NLĐ thành công';

  function handler(form: FormWorkerModel) {
    return handleCallApi(
      async () => {
        const res = await axiosClient.post(endpoint(), form);

        return res;
      },
      true,
      createMessage
    );
  }

  return useMutation(handler, options);
}
