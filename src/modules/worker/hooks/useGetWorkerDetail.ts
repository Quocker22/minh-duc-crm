import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { WorkerModel } from '@/modules/worker/models';

function endpoint(workerId: string) {
  return `/worker/detail/${workerId}`;
}

export function useGetWorkerDetail(
  workerId: string,
  options?: QueryOptions<WorkerModel, unknown, WorkerModel, string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<WorkerModel>(endpoint(workerId)));
  }

  return useQuery(['worker-detail', workerId], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
