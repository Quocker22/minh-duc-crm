/* eslint-disable typescript-sort-keys/interface */

import { WorkerStatus } from '@/modules/worker/models';

/* eslint-disable prettier/prettier */

export interface CheckInsModel {
  checkin_date: string;
  checkin_shifts: {
    checkin_id: string;
    created_at: string;
    deleted_at: string;
    id: string;
    name: string;
    updated_at: string;
    value: 1;
  }[];
  checkin_type: string;
  created_at: string;
  deleted_at: string;
  id: string;
  note: string;
  updated_at: string;
  worker: string;
  worker_id: string;
}
export interface WorkerModel {
  avatar?: string;
  acc_type_data: string;
  manager_checkins: CheckInsModel[];
  back_id_card_image_link: string;
  bank_name: string;
  bank_owner_account_name: string;
  bank_owner_account_number: string;
  worker_status: string;
  birthday: string;
  checkin_from: string;
  checkin_status: string;
  checkin_to: string;
  in_plan: boolean;
  checkin_stats: {
    hc_ngay: number;
    hc_dem: number;
    tc_ngay: number;
    tc_dem: number;
    cn_ngay: number;
    cn_dem: number;
    ngay_dl: number;
    ngay_cn_le: number;
  };
  checkins: CheckInsModel[];
  code: string;
  created_at: string;
  creator: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    name: string;
    code: string;
    phone: string;
    email: string;
    avatar: string;
    status: string;
    birthday: string;
    gender: string;
    account_type: string;
  };
  creator_id: string;
  cv_link: string;
  degree: {
    id: string;
    value: string;
  };
  degree_id: string;
  deleted_at: string;
  doc_verification_status: string;
  email: string;
  front_id_card_image_link: string;
  full_address: string;
  full_name: string;
  gender: string;
  id: string;
  id_number: string;
  index: number;
  manager_id: string;
  manager?: {
    id?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: any;
    name?: string;
    code?: string;
    phone?: string;
    email?: string;
    avatar?: string;
    status?: string;
    birthday?: string;
    gender?: string;
    account_type?: string;
  };
  num_experience: number;
  operational_status: {
    id: string;
    value: string;
  };
  operational_status_id: string;
  password: string;
  phone: string;
  province_code: string;
  recruitment_status: {
    id: StatusOption;
    value: string;
  };
  recruitment_status_id: string;
  status: WorkerStatus;
  updated_at: string;
  district_code: string;
  ward_code: string;
  with_checkin: string;
  chuNhatLe?: number;
  cnDem?: number;
  cnNgay?: number;
  hcDem?: number;
  hcNgay?: number;
  key?: React.Key;
  ngayDiLam?: number;
  tcDem?: number;
  tcNgay?: number;
  tcTrua?: number;
}

export enum StatusOption {
  trangThai01 = 'TRANG-THAI-TUYEN-DUNG-NLD-01',
  trangThai02 = 'TRANG-THAI-TUYEN-DUNG-NLD-02',
  trangThai03 = 'TRANG-THAI-TUYEN-DUNG-NLD-03',
  trangThai04 = 'TRANG-THAI-TUYEN-DUNG-NLD-04',
  trangThai05 = 'TRANG-THAI-TUYEN-DUNG-NLD-05',
  trangThai06 = 'TRANG-THAI-TUYEN-DUNG-NLD-06',
  trangThai07 = 'TRANG-THAI-TUYEN-DUNG-NLD-07',
  trangThai08 = 'TRANG-THAI-TUYEN-DUNG-NLD-08',
  trangThai09 = 'TRANG-THAI-TUYEN-DUNG-NLD-09',
}

export const STATUS_OPTION = [
  {
    bgColor: '#B8B8B8',
    label: 'Chưa phân loại',
    textColor: 'white',
    value: StatusOption.trangThai01,
  },
  { bgColor: '#00BFCB', label: 'Tiềm năng', textColor: 'white', value: StatusOption.trangThai02 },
  { bgColor: '#ECF100', label: 'Chờ đến', textColor: 'black', value: StatusOption.trangThai03 },
  {
    bgColor: '#3F3F3F',
    label: 'Không tiềm năng',
    textColor: 'white',
    value: StatusOption.trangThai04,
  },
  { bgColor: '#A60000', label: 'Không đến', textColor: 'white', value: StatusOption.trangThai05 },
  {
    bgColor: '#A60000',
    label: 'Không đủ tiêu chuẩn',
    textColor: 'white',
    value: StatusOption.trangThai06,
  },
  {
    bgColor: '#A60000',
    label: 'Nhà máy thừa SL',
    textColor: 'white',
    value: StatusOption.trangThai07,
  },
  {
    bgColor: '#00C22B',
    label: 'Được vào làm',
    textColor: 'white',
    value: StatusOption.trangThai08,
  },
  {
    bgColor: '#A60000',
    label: 'Bỏ về',
    textColor: 'white',
    value: StatusOption.trangThai09,
  },
];
