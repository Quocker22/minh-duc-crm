import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { OverviewResultModel } from '@/modules/recruitment-organization/models';

function endpoint(recruitmentId: string) {
  return `/recruitment-org/get-plan-result/${recruitmentId}`;
}

export function useOverviewResultDetail(
  recruitmentId: string,
  options?: QueryOptions<OverviewResultModel, unknown, OverviewResultModel, string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<OverviewResultModel>(endpoint(recruitmentId)));
  }

  return useQuery(['overview-result-detail', recruitmentId], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
