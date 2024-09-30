import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint(formTypeEnpoint: string, surveyId: string) {
  return `/${formTypeEnpoint}/${surveyId}`;
}

export function useDeleteSurvey(
  formTypeEnpoint: string,
  options?: MutationOptions<boolean, string>
) {
  const { handleCallApi } = useCallApi();
  const deleteMessageSuccess = 'Xóa đợt khảo sát thành công';
  const deleteMessageError = 'Xóa đợt khảo sát thất bại';

  function handler(surveyId: string) {
    return handleCallApi(
      async () => {
        await axiosClient.delete(endpoint(formTypeEnpoint, surveyId));

        return fakeNetworkResponse(true);
      },
      true,
      deleteMessageSuccess,
      deleteMessageError
    );
  }

  return useMutation(handler, options);
}
