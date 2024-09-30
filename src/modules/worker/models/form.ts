export enum WorkerStatus {
  active = 'ACTIVE',
  blacklist = 'BLACKLIST',
  inactive = 'INACTIVE',
}

export const WORKER_STATUS_OPTION = [
  {
    label: 'Đang hoạt đông',
    value: WorkerStatus.active,
  },
  {
    label: 'Dừng hoạt đông',
    value: WorkerStatus.inactive,
  },
  {
    label: 'Danh sách đen',
    value: WorkerStatus.blacklist,
  },
];

/* eslint-disable typescript-sort-keys/interface */
export interface FormWorkerModel {
  full_name: string;
  gender: string;
  operational_status_id?: string;
  plan_id?: string;
  phone: string;
  back_id_card_image_link?: string;
  bank_name?: string;
  bank_owner_account_name?: string;
  bank_owner_account_number?: string;
  birthday?: string;
  code?: string;
  cv_link?: string;
  creator?: {
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
  degree_id?: string;
  email?: string;
  front_id_card_image_link?: string;
  full_address?: string;
  id?: string;
  id_number?: string;
  manager_id?: string;
  status?: string;
  manager_name?: string;
  num_experience?: number;
  password?: string;
  province_code?: string;
  district_code?: string;
  ward_code?: string;
  recruitment_status_id?: string;
}

interface HistoryNote {
  updater_name: string;
  update_avt: string;
  note: string;
  created_at: string;
}

export interface HistoryWorker {
  company_name: string;
  status: string;
  start_date: string;
  end_date: any;
  history_notes: HistoryNote[];
}

export interface WorkerInfoHistory {
  [key: string]: HistoryWorker;
}
