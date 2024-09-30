import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { GroupPermissionModel } from '@/modules/hr-management/models';

function endpoint() {
  return `/authorization/group-permission/list`;
}

export function useGetGroupPermissionList(
  query?: string,
  options?: QueryOptions<
    GroupPermissionModel[],
    unknown,
    GroupPermissionModel[],
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<GroupPermissionModel[]>(endpoint()));
  }

  return useQuery(['group-permission-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
