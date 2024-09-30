import { QueryClient, useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormChangePasswordModel } from '@/modules/hr-management/models';
import { fakeNetworkResponse, prepareDataToRequest, trans } from '@/utils';

function endpoint() {
  return `employee/change-pwd`;
}

export function useChangePassWord(options?: MutationOptions<boolean, FormChangePasswordModel>) {
  const { handleCallApi } = useCallApi();
  const queryClient = new QueryClient();
  const updateMessage = trans('GENERAL.ACTION.UPDATE.SUCCESS');

  function handler(form: FormChangePasswordModel) {
    return handleCallApi(
      async () => {
        await axiosClient.patch(endpoint(), prepareDataToRequest(form));
        queryClient.invalidateQueries({ queryKey: ['change-password'] });

        return fakeNetworkResponse(true);
      },
      true,
      updateMessage
    );
  }

  return useMutation(handler, options);
}
