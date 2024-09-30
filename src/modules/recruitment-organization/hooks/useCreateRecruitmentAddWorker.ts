import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormRecruitmentOrgAddWorkerModel } from '@/modules/recruitment-organization/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/recruitment-org/add-worker';
}

export function useCreateRecruitmentAddWorker(
  options?: MutationOptions<boolean, FormRecruitmentOrgAddWorkerModel>
) {
  const { handleCallApi } = useCallApi();

  function handler(form: FormRecruitmentOrgAddWorkerModel) {
    return handleCallApi(async () => {
      await axiosClient.post(endpoint(), form);

      return fakeNetworkResponse(true);
    }, true);
  }

  return useMutation(handler, options);
}
