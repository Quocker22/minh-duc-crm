import { DistrictModel, ProvinceModel, WardModel } from '@/models';

export enum CustomerStatus {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}

export const CUSTOMER_STATUS_OPTION = [
  {
    label: 'Đang hoạt đông',
    value: CustomerStatus.active,
  },
  {
    label: 'Dừng hoạt đông',
    value: CustomerStatus.inactive,
  },
];

export interface FormShiftWorkModel {
  end_time: string;
  start_time: string;
}

export interface CustomerModel {
  name: string;
  address?: string;
  avatar?: string;
  code?: string;
  created_at?: string;
  deleted_at?: string;
  description?: string;
  district?: DistrictModel;
  email?: string;
  id?: string;
  num_of_target?: number;
  num_of_worker?: number;
  phone?: string;
  province?: ProvinceModel;
  shift_work?: FormShiftWorkModel[];
  status?: CustomerStatus;
  tax_code?: string;
  updated_at?: string;
  ward?: WardModel;
}

export interface CustomerDataModel {
  end: string;
  got_work: number;
  quited: number;
  start: string;
  total_plan: number;
  total_target: number;
  working: number;
}
