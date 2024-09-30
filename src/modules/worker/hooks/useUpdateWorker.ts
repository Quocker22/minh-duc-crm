import { QueryClient, useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormWorkerModel } from '@/modules/worker/models';
import { fakeNetworkResponse, prepareDataToRequest, trans } from '@/utils';

function endpoint() {
  return `worker/update`;
}

export function useUpdateWorker(options?: MutationOptions<boolean, FormWorkerModel>) {
  const { handleCallApi } = useCallApi();
  const queryClient = new QueryClient();
  const updateMessage = trans('GENERAL.ACTION.UPDATE.SUCCESS');

  function handler(form: FormWorkerModel) {
    return handleCallApi(
      async () => {
        await axiosClient.patch(endpoint(), prepareDataToRequest(form));
        queryClient.invalidateQueries({ queryKey: ['worker-detail', form.id] });
        queryClient.invalidateQueries({ queryKey: ['recruitment-worker'] });

        return fakeNetworkResponse(true);
      },
      true,
      updateMessage
    );
  }

  return useMutation(handler, options);
}
