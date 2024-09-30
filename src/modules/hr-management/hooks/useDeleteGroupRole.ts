import { QueryClient, useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { fakeNetworkResponse, trans } from '@/utils';

function endpoint(id: string) {
  return `/authorization/role/delete/${id}`;
}

export function useDeleteGroupRole(options?: MutationOptions<boolean, string>) {
  const { handleCallApi } = useCallApi();
  const queryClient = new QueryClient();
  const deleteMessage = trans('GENERAL.ACTION.DELETE.SUCCESS');

  function handler(id: string) {
    return handleCallApi(
      async () => {
        await axiosClient.delete(endpoint(id));
        queryClient.invalidateQueries({ queryKey: ['delete-group-role'] });

        return fakeNetworkResponse(true);
      },
      true,
      deleteMessage
    );
  }

  return useMutation(handler, options);
}
