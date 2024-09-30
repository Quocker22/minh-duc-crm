/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { StatsAnswer } from '@/modules/communication/models/response';

function endpoint({ query, formId }: { formId: string; query?: string }) {
  return `/form/${formId}/stats-answers?${query || ''}`;
}

export function useGetSubmitWorkers(
  formId: string,
  query?: string,
  options?: QueryOptions<
    PaginationResponse<StatsAnswer[]>,
    unknown,
    PaginationResponse<StatsAnswer[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<StatsAnswer[]>>(endpoint({ query, formId }))
    );
  }

  return useQuery(['submit-workers', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
