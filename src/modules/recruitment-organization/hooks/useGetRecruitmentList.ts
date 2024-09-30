import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { RecruitmentPlanModel } from '@/modules/recruitment-plan/models';

function endpoint(query?: string) {
  return `/recruitment-plan/filter-plans?${query || ''}`;
}

export function useGetRecruitmentList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<RecruitmentPlanModel[]>,
    unknown,
    PaginationResponse<RecruitmentPlanModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<RecruitmentPlanModel[]>>(endpoint(query))
    );
  }

  return useQuery(['recruitment-plan-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
