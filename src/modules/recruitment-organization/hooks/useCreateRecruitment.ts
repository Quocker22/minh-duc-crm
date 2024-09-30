import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormRecruitmentPlanModel } from '@/modules/recruitment-plan/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/recruitment-plan/create';
}

export function useCreateRecruitment(options?: MutationOptions<boolean, FormRecruitmentPlanModel>) {
  const { handleCallApi } = useCallApi();
  const createMessage = 'Tạo mới chiến dịch thành công';

  function handler(form: FormRecruitmentPlanModel) {
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
