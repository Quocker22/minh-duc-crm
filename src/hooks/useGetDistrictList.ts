import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { DistrictModel, QueryOptions } from '@/models';

function endpoint(provinceCode: string) {
  return `region/districts?province_code=${provinceCode}`;
}

export function useGetDistrictList(
  provinceCode: string,
  options?: QueryOptions<DistrictModel[], unknown, DistrictModel[], string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<DistrictModel[]>(endpoint(provinceCode)));
  }

  return useQuery(['districts', provinceCode], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
