import { CampaignOptions } from '@/modules/recruitment-plan/models';

/* eslint-disable prettier/prettier */
export enum CustomerStatus {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}

export interface FormShiftWorkModel {
  end_time: string;
  start_time: string;
}

export const CAMPAIGN_OPTIONS = [
  { bgColor: '#ECF100', label: 'Chờ bắt đầu', textColor: 'black', value: CampaignOptions.pending },
  { bgColor: '#00C22B', label: 'Đã kết thúc', textColor: 'white', value: CampaignOptions.done },
  {
    bgColor: '#007DF1',
    label: 'Đang triển khai',
    textColor: 'white',
    value: CampaignOptions.active,
  },
  {
    bgColor: '#B8B8B8',
    label: 'Tất cả trạng thái',
    textColor: 'white',
    value: CampaignOptions.all_status,
  },
];

export interface RecruitmentModel {
  academic_level?: {
    id?: number;
    value?: string;
  };
  academic_level_id?: number;
  age_range?: {
    max?: number;
    min?: number;
  };
  career?: {
    id?: number;
    value?: string;
  };
  career_id?: number;
  code?: string;
  created_at?: string;
  customer?: {
    id?: string;
    name?: string;
  };
  customer_id?: string;
  degree?: {
    id?: number;
    value?: string;
  };
  degree_id?: number;
  deleted_at?: null;
  end_date?: string;
  experience?: number;
  gender_percentage?: {
    female?: number;
    male?: number;
  };
  id?: string;
  name?: string;
  other_requirement?: {
    id?: number;
    value?: string;
  };
  other_requirement_id?: number;
  position?: {
    id?: number;
    value?: string;
  };
  position_id?: number;
  quantity?: number;
  salary?: number;
  start_date?: string;
  status?: CampaignOptions;
  updated_at?: string;
}

export interface RecruitmentUpdateHistoryModel {
  created_at: string;
  employee_id: string;
  id: string;
  message: string;
  recruitment_plan_id: string;
  updated_at: string;
  updated_by: {
    account_type: string;
    avatar: string;
    birthday: string;
    code: string;
    created_at: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    phone: string;
    status: string;
    updated_at: string;
  };
}

export interface OverviewResultModel {
  end_date: string;
  remain: number;
  result_by_gender: {
    female: number;
    male: number;
    target_female: number;
    target_male: number;
  };
  result_by_member: {
    name: string;
    quantity: number;
  }[];
  result_by_team: {
    quantity: number;
    team_name: string;
  }[];
  result_by_worker_type: {
    percentage: number;
    worker_type: string;
  }[];
  start_date: string;
  target: number;
  target_percentage: number;
}
