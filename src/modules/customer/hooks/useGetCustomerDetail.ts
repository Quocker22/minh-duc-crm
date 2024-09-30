import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { CustomerModel } from '@/modules/customer/models';

function endpoint(customerId: string) {
  return `/customer/${customerId}`;
}

export function useGetCustomerDetail(
  customerId: string,
  options?: QueryOptions<CustomerModel, unknown, CustomerModel, string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<CustomerModel>(endpoint(customerId)));
  }

  return useQuery(['customer-detail', customerId], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
