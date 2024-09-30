import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { ProvinceModel } from '@/models';

function endpoint() {
  return `region/provinces`;
}

export function useGetProvinceList() {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<ProvinceModel[]>(endpoint()));
  }

  return useQuery(['province'], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}
