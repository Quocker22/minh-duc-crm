import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormSurveyModel } from '@/modules/communication/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint(formTypeEnpoint?: string) {
  return `/${formTypeEnpoint}/update`;
}

export function useUpdateSurvey(
  formTypeEnpoint?: string,
  options?: MutationOptions<boolean, FormSurveyModel>
) {
  const { handleCallApi } = useCallApi();
  const queryClient = useQueryClient();
  const updateMessageSuccess = 'Cập nhật khảo sát thành công';
  const updateMessageError = 'Cập nhật khảo sát thất bại';

  function handler(form: FormSurveyModel) {
    return handleCallApi(
      async () => {
        await axiosClient.patch(endpoint(formTypeEnpoint), form);
        queryClient.invalidateQueries({ queryKey: ['survey-detail'] });

        return fakeNetworkResponse(true);
      },
      true,
      updateMessageSuccess,
      updateMessageError
    );
  }

  return useMutation(handler, options);
}
