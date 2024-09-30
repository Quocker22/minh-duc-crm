import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { RecruitmentWorkerHistory } from '@/modules/recruitment-plan/models';

function endpoint(query?: string) {
  return `/worker/filter-histories?${query || ''}`;
}
export function useGetHistoriesWorker(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<RecruitmentWorkerHistory[]>,
    unknown,
    PaginationResponse<RecruitmentWorkerHistory[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<RecruitmentWorkerHistory[]>>(endpoint(query))
    );
  }

  return useQuery(['recruitment-worker-noted', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
