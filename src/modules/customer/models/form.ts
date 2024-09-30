import { CustomerStatus, FormShiftWorkModel } from '@/modules/customer/models';

export interface FormCustomerModel {
  address?: string;
  avatar?: string;
  creator?: {
    avatar?: string;
    name?: string;
  };
  description?: string;
  district_id?: string;
  email?: string;
  factory_manager?: string;
  id?: string;
  manager_id?: string;
  name?: string;
  phone?: string;
  province_id?: string;
  shift_work?: FormShiftWorkModel[];
  status?: CustomerStatus;
  tax_code?: string;
  ward_id?: string;
}
