import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { RoleModel } from '@/modules/hr-management/models';

function endpoint(query?: string) {
  return `/authorization/role/filter?${query || ''}`;
}

export function useGetRoleList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<RoleModel[]>,
    unknown,
    PaginationResponse<RoleModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<PaginationResponse<RoleModel[]>>(endpoint(query)));
  }

  return useQuery(['role-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
