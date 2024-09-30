import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { FormSurveyModel } from '@/modules/communication/models';

function endpoint(formtypeEnpoint?: string) {
  return `/${formtypeEnpoint || 'form'}/create`;
}

export function useCreateSurvey(
  formtypeEnpoint?: string,
  options?: MutationOptions<boolean, FormSurveyModel>
) {
  const { handleCallApi } = useCallApi();
  const createMessageSuccess = 'Tạo đợt khảo sát thành công';
  const createMessageError = 'Tạo đợt khảo sát thất bại';

  function handler(form: FormSurveyModel) {
    return handleCallApi(
      async () => {
        const res = await axiosClient.post(endpoint(formtypeEnpoint), form);

        return res;
      },
      true,
      createMessageSuccess,
      createMessageError
    );
  }

  return useMutation(handler, options);
}
