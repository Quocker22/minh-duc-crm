/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { StatsManagerWorkerStatus } from '@/modules/communication/models';

function endpoint() {
  return '/recruitment-org/stats-manager-worker-status';
}

export function useGetAllStatsManagerWorkerStatus(
  query?: string,
  options?: QueryOptions<
    StatsManagerWorkerStatus[],
    unknown,
    StatsManagerWorkerStatus[],
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<StatsManagerWorkerStatus[]>(endpoint()));
  }

  return useQuery(['stats-manager-worker-status', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
