import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { RecruitmentTeamModel } from '@/modules/recruitment-plan/models';

function endpoint(query?: string) {
  return `/recruitment-plan/filter-teams?${query || ''}`;
}

export function useGetRecruitmentTeamList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<RecruitmentTeamModel[]>,
    unknown,
    PaginationResponse<RecruitmentTeamModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<RecruitmentTeamModel[]>>(endpoint(query))
    );
  }

  return useQuery(['recruitment-team-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
