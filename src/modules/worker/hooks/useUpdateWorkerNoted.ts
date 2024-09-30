import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { fakeNetworkResponse, prepareDataToRequest, trans } from '@/utils';

function endpoint() {
  return `recruitment-org/update-worker`;
}

export interface FormWorkerNoted {
  note?: string;
  plan_id?: string;
  recruitment_status_id?: string;
  worker_id?: string;
}

export function useUpdateWorkerNoted(options?: MutationOptions<boolean, FormWorkerNoted>) {
  const { handleCallApi } = useCallApi();
  const queryClient = useQueryClient();
  const updateMessage = trans('GENERAL.ACTION.UPDATE.SUCCESS');

  function handler(form: FormWorkerNoted) {
    return handleCallApi(
      async () => {
        await axiosClient.patch(endpoint(), prepareDataToRequest(form));
        queryClient.invalidateQueries({ queryKey: ['recruitment-worker-noted'] });

        return fakeNetworkResponse(true);
      },
      true,
      updateMessage
    );
  }

  return useMutation(handler, options);
}
