/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { WorkerFilterHistoriesPlanModel } from '@/modules/worker/models';

function endpoint(workerId?: string) {
  return `/worker/filter-plan-histories?worker_id=${workerId || ''}`;
}
export function useGetWorkerFilterHistoriesPlan(
  workerId?: string,
  options?: QueryOptions<
    WorkerFilterHistoriesPlanModel[],
    unknown,
    WorkerFilterHistoriesPlanModel[],
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<WorkerFilterHistoriesPlanModel[]>(endpoint(workerId))
    );
  }

  return useQuery(['worker-filter-histories-plan', workerId], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
