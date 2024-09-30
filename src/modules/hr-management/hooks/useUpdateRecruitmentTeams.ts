import { QueryClient, useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormRecruitmentTeamsModel } from '@/modules/hr-management/models';
import { fakeNetworkResponse, prepareDataToRequest, trans } from '@/utils';

function endpoint() {
  return `/recruitment-team/update`;
}

export function useUpdateRecruitmentTeams(
  options?: MutationOptions<boolean, FormRecruitmentTeamsModel>
) {
  const { handleCallApi } = useCallApi();
  const queryClient = new QueryClient();
  const updateMessage = trans('GENERAL.ACTION.UPDATE.SUCCESS');

  function handler(form: FormRecruitmentTeamsModel) {
    return handleCallApi(
      async () => {
        await axiosClient.patch(endpoint(), prepareDataToRequest(form));
        queryClient.invalidateQueries({ queryKey: ['update_recruitment_team'] });

        return fakeNetworkResponse(true);
      },
      true,
      updateMessage
    );
  }

  return useMutation(handler, options);
}
