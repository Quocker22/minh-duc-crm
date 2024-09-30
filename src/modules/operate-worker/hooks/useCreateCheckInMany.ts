import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FromCheckInWorkerManyModel } from '@/modules/operate-worker/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/manager/check-in/create-many';
}

export function useCreateCheckInMany(
  options?: MutationOptions<boolean, FromCheckInWorkerManyModel>
) {
  const { handleCallApi } = useCallApi();
  const createMessage = 'check in thành công';

  function handler(form: FromCheckInWorkerManyModel) {
    return handleCallApi(
      async () => {
        await axiosClient.post(endpoint(), form);

        return fakeNetworkResponse(true);
      },
      true,
      createMessage
    );
  }

  return useMutation(handler, options);
}
