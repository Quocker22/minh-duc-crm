import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { SurveyQuestion } from '@/modules/communication/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/question/create';
}

export function useCreateQuestion(options?: MutationOptions<boolean, SurveyQuestion>) {
  const { handleCallApi } = useCallApi();
  const createMessageSuccess = 'Tạo câu hỏi thành công';
  const createMessageError = 'Tạo câu hỏi thất bại';

  function handler(form: SurveyQuestion) {
    return handleCallApi(
      async () => {
        await axiosClient.post(endpoint(), form);

        return fakeNetworkResponse(true);
      },
      true,
      createMessageSuccess,
      createMessageError
    );
  }

  return useMutation(handler, options);
}
