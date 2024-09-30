import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { RecruitmentTeamsModel } from '@/modules/hr-management/models';

function endpoint(recruitmentTeam: string) {
  return `/recruitment-team/${recruitmentTeam}`;
}

export function useGetRecruitmentTeamsDetail(
  recruitmentTeam: string,
  options?: QueryOptions<RecruitmentTeamsModel, unknown, RecruitmentTeamsModel, string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<RecruitmentTeamsModel>(endpoint(recruitmentTeam)));
  }

  return useQuery(['recruitment-team-detail', recruitmentTeam], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
