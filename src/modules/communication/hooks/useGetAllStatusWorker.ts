/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { StatsWorkerStatus } from '@/modules/communication/models';

function endpoint() {
  return '/recruitment-org/stats-worker-status';
}

export function useGetAllStatusWorker(
  query?: string,
  options?: QueryOptions<StatsWorkerStatus[], unknown, StatsWorkerStatus[], (string | undefined)[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<StatsWorkerStatus[]>(endpoint()));
  }

  return useQuery(['all-status-worker', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
