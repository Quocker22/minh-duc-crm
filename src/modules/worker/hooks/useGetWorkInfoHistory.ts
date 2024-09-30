import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { WorkerInfoHistory } from '@/modules/worker/models';

function endpoint(workerId?: string) {
  return `/worker/filter-all-histories?worker_id=${workerId || ''}`;
}
export function useGetWorkInfoHistory(
  workerId?: string,
  options?: QueryOptions<WorkerInfoHistory, unknown, WorkerInfoHistory, (string | undefined)[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<WorkerInfoHistory>(endpoint(workerId)));
  }

  return useQuery(['worker-work-info-history', workerId], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
