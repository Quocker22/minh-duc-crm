import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { SurveyModel } from '@/modules/communication/models';

function endpoint(formTypeEnpoint: string, surveyId: string) {
  return `/${formTypeEnpoint}/${surveyId}`;
}

export function useGetSurveyDetail(
  surveyId: string,
  formTypeEnpoint: string,
  options?: QueryOptions<SurveyModel, unknown, SurveyModel, string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<SurveyModel>(endpoint(formTypeEnpoint, surveyId)));
  }

  return useQuery(['survey-detail', surveyId], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
