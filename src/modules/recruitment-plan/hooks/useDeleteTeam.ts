import { QueryClient, useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormDeleteTeamModel } from '@/modules/recruitment-plan/models';
import { fakeNetworkResponse, trans } from '@/utils';

function endpoint() {
  return `/recruitment-plan/delete-team`;
}

export function useDeleteTeam(options?: MutationOptions<boolean, FormDeleteTeamModel>) {
  const { handleCallApi } = useCallApi();
  const queryClient = new QueryClient();
  const deleteMessage = trans('GENERAL.ACTION.DELETE.SUCCESS');

  function handler(form: FormDeleteTeamModel) {
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
