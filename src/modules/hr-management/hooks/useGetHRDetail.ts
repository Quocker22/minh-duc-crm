import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { HRModel } from '@/modules/hr-management/models';

function endpoint(hRId: string) {
  return `/employee/detail/${hRId}`;
}

export function useGetHRDetail(
  hRId: string,
  options?: QueryOptions<HRModel, unknown, HRModel, string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<HRModel>(endpoint(hRId)));
  }

  return useQuery(['HR-detail', hRId], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
