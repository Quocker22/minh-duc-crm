import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { HRModel } from '@/modules/hr-management/models';

function endpoint(id?: string) {
  return `/recruitment-org/filter-employee?recruitment_plan_id=${id || ''}`;
}

export function useGetHRListByRecruitmentPlanId(
  id?: string,
  options?: QueryOptions<
    PaginationResponse<HRModel[]>,
    unknown,
    PaginationResponse<HRModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<PaginationResponse<HRModel[]>>(endpoint(id)));
  }

  return useQuery(['hr-list-by-recruitment-plan-id', id], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
