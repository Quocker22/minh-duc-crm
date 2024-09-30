import { QueryClient, useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { fakeNetworkResponse, trans } from '@/utils';

function endpoint() {
  return `/recruitment-org/remove-worker`;
}

export function useDeleteWorkerFromRecruitment(
  options?: MutationOptions<
    boolean,
    {
      plan_id: string;
      worker_id: string;
    }
  >
) {
  const { handleCallApi } = useCallApi();
  const queryClient = new QueryClient();
  const deleteMessage = trans('GENERAL.ACTION.DELETE.SUCCESS');

  function handler(form: { plan_id: string; worker_id: string }) {
    return handleCallApi(
      async () => {
        await axiosClient.delete(endpoint(), { data: form });
        queryClient.invalidateQueries({ queryKey: ['delete-team'] });

        return fakeNetworkResponse(true);
      },
      true,
      deleteMessage
    );
  }

  return useMutation(handler, options);
}
