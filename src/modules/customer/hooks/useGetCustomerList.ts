import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse, QueryOptions } from '@/models';
import { CustomerModel } from '@/modules/customer/models';

function endpoint(query?: string) {
  return `/customer/filter?${query || ''}`;
}

export function useGetCustomerList(
  query?: string,
  options?: QueryOptions<
    PaginationResponse<CustomerModel[]>,
    unknown,
    PaginationResponse<CustomerModel[]>,
    (string | undefined)[]
  >
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() =>
      axiosClient.get<PaginationResponse<CustomerModel[]>>(endpoint(query))
    );
  }

  return useQuery(['customer-list', query], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
