import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormRecruitmentOrgAddMemberModel } from '@/modules/recruitment-organization/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/recruitment-org/add-member';
}

export function useCreateRecruitmentAddMember(
  options?: MutationOptions<boolean, FormRecruitmentOrgAddMemberModel>
) {
  const { handleCallApi } = useCallApi();
  const createMessage = 'Thêm thành viên vào chiến dịch thành công';

  function handler(form: FormRecruitmentOrgAddMemberModel) {
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
