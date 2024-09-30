import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { RecruitmentWorkerHistory } from '@/modules/recruitment-plan/models';

function endpoint(query?: string) {
  return `/manager/check-in/filter?${query || ''}`;
}

export function useGetNoteCheckInList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<RecruitmentWorkerHistory[]>,
    unknown,
    PaginationResponse<RecruitmentWorkerHistory[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<RecruitmentWorkerHistory[]>>(endpoint(query))
    );
  }

  return useQuery(['note-check-in-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
