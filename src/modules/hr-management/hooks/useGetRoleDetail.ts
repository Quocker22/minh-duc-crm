import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { RoleModel } from '@/modules/hr-management/models';

function endpoint(roleId: string) {
  return `/authorization/role/detail/${roleId}`;
}

export function useGetRoleDetail(
  roleId: string,
  options?: QueryOptions<RoleModel, unknown, RoleModel, string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<RoleModel>(endpoint(roleId)));
  }

  return useQuery(['authorization-role-detail', roleId], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
