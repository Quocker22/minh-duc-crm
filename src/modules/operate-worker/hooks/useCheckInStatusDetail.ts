import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { CheckInStatusModel } from '@/modules/operate-worker/models';

function endpoint() {
  return `/check-in/stats`;
}

export function useCheckInStatusDetail(
  options?: QueryOptions<CheckInStatusModel, unknown, CheckInStatusModel, string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<CheckInStatusModel>(endpoint()));
  }

  return useQuery(['overview-result-detail'], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
