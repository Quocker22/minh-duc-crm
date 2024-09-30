/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { SurveyQuestion } from '@/modules/communication/models';

function endpoint(query?: string) {
  return `/question/filter?${query || ''}`;
}

export function useGetQuestionList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<SurveyQuestion[]>,
    unknown,
    PaginationResponse<SurveyQuestion[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<SurveyQuestion[]>>(endpoint(query))
    );
  }

  return useQuery(['question-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
