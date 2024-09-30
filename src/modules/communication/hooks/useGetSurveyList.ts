/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { SurveyModel } from '@/modules/communication/models';

function endpoint(formTypeEnpoint?: string, query?: string) {
  return `/${formTypeEnpoint}/filter?${query || ''}`;
}

export function useGetSurveyList(
  query?: string,
  formTypeEnpoint?: string,
  options?: QueryOptions<
    PaginationResponse<SurveyModel[]>,
    unknown,
    PaginationResponse<SurveyModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<SurveyModel[]>>(endpoint(formTypeEnpoint, query))
    );
  }

  return useQuery(['survey-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
