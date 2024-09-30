/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { StatsCustomerWorkerStatus } from '@/modules/communication/models';

function endpoint() {
  return '/recruitment-org/stats-customer-worker-status';
}

export function useGetAllStatsCustomerWorkerStatus(
  query?: string,
  options?: QueryOptions<
    StatsCustomerWorkerStatus[],
    unknown,
    StatsCustomerWorkerStatus[],
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<StatsCustomerWorkerStatus[]>(endpoint()));
  }

  return useQuery(['stats-customer-worker-status', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
