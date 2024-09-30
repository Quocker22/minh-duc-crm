import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { WorkerModel } from '@/modules/worker/models';

function endpoint(query?: string) {
  return `/worker/filter?${query || ''}`;
}

export function useGetWorkersClockTimeList(
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

  return useQuery(['use-get-workers-clock-time-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
