import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { MasterModel, QueryOptions } from '@/models';

function endpoint() {
  return `/master-data/list`;
}

export function useGetMasterList(
  options?: QueryOptions<MasterModel[], unknown, MasterModel[], string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<MasterModel[]>(endpoint()));
  }

  return useQuery(['master'], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
