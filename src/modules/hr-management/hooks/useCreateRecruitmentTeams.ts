import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormRecruitmentTeamsModel } from '@/modules/hr-management/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/recruitment-team/create';
}

export function useCreateRecruitmentTeams(
  options?: MutationOptions<boolean, FormRecruitmentTeamsModel>
) {
  const { handleCallApi } = useCallApi();
  const createMessage = 'Tạo mới nhóm quyền thành công';

  function handler(form: FormRecruitmentTeamsModel) {
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
