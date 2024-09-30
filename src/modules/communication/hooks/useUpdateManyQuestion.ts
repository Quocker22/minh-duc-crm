/* eslint-disable unused-imports/no-unused-vars */
import { useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MutationOptions } from '@/models';
import { SurveyQuestion } from '@/modules/communication/models';
import { fakeNetworkResponse } from '@/utils';

function endpoint() {
  return '/question/update-many';
}

export interface SurveyQuestionForm {
  data: SurveyQuestion[];
}

export function useUpdateManyQuestion(options?: MutationOptions<boolean, SurveyQuestionForm>) {
  const { handleCallApi } = useCallApi();
  const updateMessageSuccess = 'Cập nhật câu hỏi thành công';
  const updateMessageError = 'Cập nhật câu hỏi thất bại';

  function handler(form: SurveyQuestionForm) {
    return handleCallApi(
      async () => {
        await axiosClient.patch(endpoint(), form);

        return fakeNetworkResponse(true);
      },
      true,
      '',
      updateMessageError
    );
  }

  return useMutation(handler, options);
}
