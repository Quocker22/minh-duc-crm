import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { RecruitmentPlanModel } from '@/modules/recruitment-plan/models';

function endpoint(recruitmentId: string) {
  return `/recruitment-plan/${recruitmentId}`;
}

export function useGetRecruitmentDetail(
  recruitmentId: string,
  options?: QueryOptions<RecruitmentPlanModel, unknown, RecruitmentPlanModel, string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<RecruitmentPlanModel>(endpoint(recruitmentId)));
  }

  return useQuery(['recruitment-plan-detail', recruitmentId], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
