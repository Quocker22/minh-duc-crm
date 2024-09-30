import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormRoleModel } from '@/modules/hr-management/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/authorization/role/create';
}

export function useCreateRole(options?: MutationOptions<boolean, FormRoleModel>) {
  const { handleCallApi } = useCallApi();
  const createMessage = 'Tạo mới vai trò thành công';

  function handler(form: FormRoleModel) {
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
