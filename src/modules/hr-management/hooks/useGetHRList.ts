import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { HRModel } from '@/modules/hr-management/models';

function endpoint(query?: string) {
  return `/employee/filter?${query || ''}`;
}

export function useGetHRList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<HRModel[]>,
    unknown,
    PaginationResponse<HRModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<PaginationResponse<HRModel[]>>(endpoint(query)));
  }

  return useQuery(['HR-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
