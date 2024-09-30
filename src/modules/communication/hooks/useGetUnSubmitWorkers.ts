/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { WorkerModel } from '@/modules/worker/models';

function endpoint({ query, formId }: { formId: string; query?: string }) {
  return `/form/${formId}/unsubmit-workers?${query || ''}`;
}

export function useGetUnSubmitWorkers(
  formId: string,
  query?: string,
  options?: QueryOptions<
    PaginationResponse<WorkerModel[]>,
    unknown,
    PaginationResponse<WorkerModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<WorkerModel[]>>(endpoint({ query, formId }))
    );
  }

  return useQuery(['unsubmit-workers', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
