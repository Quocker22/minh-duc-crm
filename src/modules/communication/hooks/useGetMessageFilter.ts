/* eslint-disable prettier/prettier */
/* eslint-disable  @typescript-eslint/no-inferrable-types */
import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { SupportModel } from '@/modules/communication/models';

function endpoint(query?: string) {
  return `/support/filter/message?${query || ''}`;
}

export function useGetMessageFilter(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<SupportModel[]>,
    unknown,
    PaginationResponse<SupportModel[]>,
    (string | undefined)[]
  >,
  keepPreviousData: boolean = true
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<SupportModel[]>>(endpoint(query))
    );
  }

  return useQuery(['message-filter', query], handler, {
    cacheTime: 0,
    keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
}
