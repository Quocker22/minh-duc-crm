import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { WorkerModel } from '@/modules/worker/models';

function endpoint(query?: string) {
  return `/worker/filter?${query || ''}`;
}

export function useGetTookBreakWorkerList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<WorkerModel[]>,
    unknown,
    PaginationResponse<WorkerModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<PaginationResponse<WorkerModel[]>>(endpoint(query)));
  }

  return useQuery(['took-break-worker-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
