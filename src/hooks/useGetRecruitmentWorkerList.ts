import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions, RecruitmentWorkerModel } from '@/models';

function endpoint(query?: string) {
  return `/recruitment-org/filter-worker?${query || ''}`;
}

export function useGetRecruitmentWorkerList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<RecruitmentWorkerModel[]>,
    unknown,
    PaginationResponse<RecruitmentWorkerModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<RecruitmentWorkerModel[]>>(endpoint(query))
    );
  }

  return useQuery(['recruitment-worker', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
