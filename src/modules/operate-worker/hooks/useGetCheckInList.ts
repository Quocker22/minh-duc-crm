import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { CheckInModel } from '@/modules/operate-worker/models';

function endpoint(query?: string) {
  return `/check-in/filter?${query || ''}`;
}

export function useGetCheckInList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<CheckInModel[]>,
    unknown,
    PaginationResponse<CheckInModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<CheckInModel[]>>(endpoint(query))
    );
  }

  return useQuery(['check-in-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
