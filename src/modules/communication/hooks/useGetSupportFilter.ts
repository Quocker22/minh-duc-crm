/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { SupportModel } from '@/modules/communication/models';

function endpoint(query?: string) {
  return `/support/filter?${query || ''}`;
}

export function useGetSupportFilter(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<SupportModel[]>,
    unknown,
    PaginationResponse<SupportModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<SupportModel[]>>(endpoint(query))
    );
  }

  return useQuery(['support-filter', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
