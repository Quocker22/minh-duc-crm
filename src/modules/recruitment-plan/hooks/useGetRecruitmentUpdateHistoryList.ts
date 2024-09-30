import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { RecruitmentUpdateHistoryModel } from '@/modules/recruitment-plan/models';

function endpoint(query?: string) {
  return `/recruitment-plan/update-history/filter?${query || ''}`;
}
export function useGetRecruitmentUpdateHistoryList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<RecruitmentUpdateHistoryModel[]>,
    unknown,
    PaginationResponse<RecruitmentUpdateHistoryModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<RecruitmentUpdateHistoryModel[]>>(endpoint(query))
    );
  }

  return useQuery(['recruitment-update-history-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
