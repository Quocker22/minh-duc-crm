import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormAddTeamRecruitment } from '@/modules/recruitment-plan/models/form';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/recruitment-plan/add-teams';
}

export function useAddTeamRecruitment(options?: MutationOptions<boolean, FormAddTeamRecruitment>) {
  const { handleCallApi } = useCallApi();
  const createMessage = 'Thêm mới nhóm quyền thành công';

  function handler(body: FormAddTeamRecruitment) {
    return handleCallApi(
      async () => {
        await axiosClient.post(endpoint(), body);

        return fakeNetworkResponse(true);
      },
      true,
      createMessage
    );
  }

  return useMutation(handler, options);
}
