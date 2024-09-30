import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions, WardModel } from '@/models';

function endpoint(wardCode: string) {
  return `region/wards?district_code=${wardCode}`;
}

export function useGetwardList(
  wardCode: string,
  options?: QueryOptions<WardModel[], unknown, WardModel[], string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<WardModel[]>(endpoint(wardCode)));
  }

  return useQuery(['Wards', wardCode], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
