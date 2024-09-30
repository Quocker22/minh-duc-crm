import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { QueryOptions } from '@/models';
import { CustomerDataModel } from '@/modules/customer/models';

function endpoint(customerId: string) {
  return `/recruitment-plan/customer-data/${customerId}`;
}

export function useGetCustomerData(
  customerId: string,
  options?: QueryOptions<CustomerDataModel, unknown, CustomerDataModel, string[]>
) {
  const { handleCallApi } = useCallApi();

  function handler() {
    return handleCallApi(() => axiosClient.get<CustomerDataModel>(endpoint(customerId)));
  }

  return useQuery(['customer-data-detail', customerId], handler, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
