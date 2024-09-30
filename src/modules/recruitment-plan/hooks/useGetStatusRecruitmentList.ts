import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { StatusRecruitment } from '@/modules/recruitment-plan/models';

function endpoint(id?: string) {
  return `/worker/detail/${id}/status`;
}

export function useGetStatusRecruitmentList(
  id?: string,
  options?: QueryOptions<StatusRecruitment[], unknown, StatusRecruitment[], (string | undefined)[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<StatusRecruitment[]>(endpoint(id)));
  }

  return useQuery(['status-recruitment-list', id], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
