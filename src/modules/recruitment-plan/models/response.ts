/* eslint-disable prettier/prettier */
/* eslint-disable typescript-sort-keys/string-enum */
import React from 'react';

import { HRModel, LeaderModel } from '@/modules/hr-management/models';
import { StatusOption } from '@/modules/worker/models';

export enum CustomerStatus {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}

export interface FormShiftWorkModel {
  end_time: string;
  start_time: string;
}

export interface StatusRecruitment {
  bgColor: string;
  label: string;
  textColor: string;
  value: StatusOption;
}

export enum CampaignOptions {
  active = 'ACTIVE',
  all_status = '',
  cho_den = 'TRANG-THAI-TUYEN-DUNG-NLD-03',
  chua_phan_loai = 'TRANG-THAI-TUYEN-DUNG-NLD-01',
  done = 'DONE',
  duoc_vao_lam = 'TRANG-THAI-TUYEN-DUNG-NLD-08',
  khong_den = 'TRANG-THAI-TUYEN-DUNG-NLD-05',
  khong_du_tieu_chuan = 'TRANG-THAI-TUYEN-DUNG-NLD-06',
  khong_tiem_nang = 'TRANG-THAI-TUYEN-DUNG-NLD-04',
  nha_may_thua_SL = 'TRANG-THAI-TUYEN-DUNG-NLD-07',
  pending = 'PENDING',
  tiem_nang = 'TRANG-THAI-TUYEN-DUNG-NLD-02',
}

export const CAMPAIGN_OPTIONS = [
  {
    bgColor: '#B8B8B8',
    label: 'Tất cả trạng thái',
    textColor: 'white',
    value: CampaignOptions.all_status,
  },
  { bgColor: '#ECF100', label: 'Chờ bắt đầu', textColor: 'black', value: CampaignOptions.pending },
  { bgColor: '#00C22B', label: 'Đã kết thúc', textColor: 'white', value: CampaignOptions.done },
  {
    bgColor: '#007DF1',
    label: 'Đang triển khai',
    textColor: 'white',
    value: CampaignOptions.duoc_vao_lam,
  },
];

export const RECRUITMENT_OPTION = [
  {
    bgColor: '#B8B8B8',
    label: 'Tất cả trạng thái',
    textColor: 'white',
    value: CampaignOptions.all_status,
  },
  { bgColor: '#ECF100', label: 'Chờ bắt đầu', textColor: 'black', value: CampaignOptions.pending },
  { bgColor: '#00C22B', label: 'Đã kết thúc', textColor: 'white', value: CampaignOptions.done },
  {
    bgColor: '#007DF1',
    label: 'Đang triển khai',
    textColor: 'white',
    value: CampaignOptions.active,
  },
];

export interface RecruitmentPlanModel {
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
    avatar?: string;
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
  num_of_added_data?: number;
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

export interface RecruitmentTeamModel {
  created_at: string;
  id: string;
  key: React.Key;
  num_of_added_data: string;
  plan_id: string;
  target: number;
  team: {
    code: string;
    created_at: string;
    id: string;
    leader: LeaderModel;
    leader_id: string;
    name: string;
    updated_at: string;
  };
  team_id: string;
  updated_at: string;
  members?: HRModel[];
}

export interface RecruitmentStatus {
  id?: string;
  value?: string;
}

/* eslint-disable typescript-sort-keys/interface */
export interface RecruitmentWorkerHistory {
  created_at?: string;
  id?: string;
  updated_at?: string;
  worker_id?: string;
  deleted_at?: any;
  plan_id?: string;
  updater_id?: string;
  updater?: {
    id?: string;
    name?: string;
    avatar?: string;
  };
  recruitment_status_id?: string;
  recruitment_status?: RecruitmentStatus;
  note?: string;
  recruitment_plan?: RecruitmentPlanModel;
}
