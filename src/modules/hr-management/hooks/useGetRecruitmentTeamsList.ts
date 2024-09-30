import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { RecruitmentTeamsModel } from '@/modules/hr-management/models';

function endpoint(query?: string) {
  return `/recruitment-team/filter?${query || ''}`;
}

export function useGetRecruitmentTeamsList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<RecruitmentTeamsModel[]>,
    unknown,
    PaginationResponse<RecruitmentTeamsModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<RecruitmentTeamsModel[]>>(endpoint(query))
    );
  }

  return useQuery(['recruitment-teams-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
