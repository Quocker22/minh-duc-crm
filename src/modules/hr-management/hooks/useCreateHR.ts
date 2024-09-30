import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormHRModel } from '@/modules/hr-management/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/employee/create';
}

export function useCreateHR(options?: MutationOptions<boolean, FormHRModel>) {
  const { handleCallApi } = useCallApi();
  const createMessage = 'Tạo mới Nhân sự thành công';

  function handler(form: FormHRModel) {
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
