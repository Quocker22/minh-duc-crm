import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormCustomerModel } from '@/modules/customer/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/customer/create';
}

export function useCreateCustomer(options?: MutationOptions<boolean, FormCustomerModel>) {
  const { handleCallApi } = useCallApi();
  const createMessage = 'Tạo mới Nhân sự thành công';

  function handler(form: FormCustomerModel) {
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
