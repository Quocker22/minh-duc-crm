import { QueryClient, useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormRecruitmentPlanModel } from '@/modules/recruitment-plan/models';
import { fakeNetworkResponse, prepareDataToRequest, trans } from '@/utils';

function endpoint() {
  return `recruitment-plan/update`;
}

export function useUpdateRecruitment(options?: MutationOptions<boolean, FormRecruitmentPlanModel>) {
  const { handleCallApi } = useCallApi();
  const queryClient = new QueryClient();
  const updateMessage = trans('GENERAL.ACTION.UPDATE.SUCCESS');

  function handler(form: FormRecruitmentPlanModel) {
    return handleCallApi(
      async () => {
        await axiosClient.patch(endpoint(), prepareDataToRequest(form));
        queryClient.invalidateQueries({ queryKey: ['update-recruitment-plan'] });

        return fakeNetworkResponse(true);
      },
      true,
      updateMessage
    );
  }

  return useMutation(handler, options);
}
