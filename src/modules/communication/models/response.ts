/* eslint-disable prettier/prettier */
/* eslint-disable typescript-sort-keys/string-enum */
/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable simple-import-sort/imports */
import { RecipientOptionType } from '@/modules/communication/constants';
import { Category, StatusSurvey } from '@/modules/communication/models/form';
import { WorkerModel } from '@/modules/worker/models';

export enum HRStatus {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}

export enum HRRole {
  admin = 'ADMIN',
  member = 'MEMBER',
  owner = 'OWNER',
  factory = 'FACTORY',
}

export enum HRGender {
  female = 'FEMALE',
  male = 'MALE',
}

interface Permission {
  label: string;
  value: string;
}

export interface SimplifiedRecruitmentPlan {
  label: string;
  permissions: Permission[];
  value: string;
}

export interface SurveyModel {
  created_at: string;
  deleted_at: string;
  id: string;
  name: string;
  status: StatusSurvey;
  updated_at: string;
  created_by_user?: User;
  updated_by_user?: User;
  result?: any;
  workers?: any;
  form_type?: RecipientOptionType;
  start_date: string;
  end_date: string;
  description: string;
  form_category: Category;
  total_workers?: number;
  total_workers_submitted?: number;
  file: string;
}

interface User {
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
}

export interface RoleModel {
  created_at: string;
  creator: SurveyModel;
  creator_id: string;
  deleted_at: string;
  description: string;
  id: string;
  name: string;
  updated_at: string;
  group_permissions?: GroupPermissionModel[];
  role_ids?: React.Key[];
}

export interface GroupPermissionModel {
  created_at: string;
  deleted_at: string;
  id: string;
  name: string;
  permissions: PermissionModel[];
  updated_at: string;
}

export interface PermissionModel {
  code: string;
  created_at: string;
  deleted_at: string;
  group_id: string;
  id: string;
  name: string;
  updated_at: string;
  checked?: boolean;
}

export interface LeaderModel {
  account_type: string;
  avatar: string;
  birthday: string;
  code: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  phone: string;
  status: string;
}

export interface RecruitmentTeamsModel {
  active_recruitment_plan?: number;
  code?: string;
  created_at?: string;
  creator?: LeaderModel;
  deleted_at?: string;
  id?: string;
  leader?: LeaderModel;
  leader_id?: string;
  member?: [];
  name?: string;
  updated_at?: string;
}

export interface SupportModel {
  id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
  target_ask?: 'COMPANY' | 'MANAGER';
  sender?: 'SUPPORTER' | 'WORKER';
  message?: string;
  supporter_id?: string;
  worker_id?: string;
  worker_info?: WorkerModel;
  manager_info?: ManagerInfo;
  replier_info?: ManagerInfo;
  indexSelected?: number;
}

export interface ManagerInfo {
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
}

export enum SurveyStatusOption {
  pending = 'PENDING',
  working = 'WORKING',
  end = 'END',
}

export const SURVEY_STATUS_OPTION = [
  {
    bgColor: '#F8D000',
    label: 'Chờ bắt đầu',
    textColor: 'white',
    value: SurveyStatusOption.pending,
  },
  {
    bgColor: '#00C22B',
    label: 'Đang diễn ra',
    textColor: 'white',
    value: SurveyStatusOption.working,
  },
  { bgColor: '#C4C4C4', label: 'Đã kết thúc', textColor: 'white', value: SurveyStatusOption.end },
];

export interface StatsWorkerStatus {
  recruitment_status_id: string;
  worker_count?: number | string;
  status_name?: string;
}

export interface StatsManagerWorkerStatus {
  workers: StatsWorkerStatus[];
  manager_id: string;
  total?: number | string;
  manager: {
    id?: string;
    name?: string;
    avatar?: string;
  };
}

export interface StatsCustomerWorkerStatus {
  workers: StatsWorkerStatus[];
  customer_id: string;
  total?: number | string;
  customer: {
    id?: string;
    name?: string;
    avatar?: string;
  };
}

export interface Answer {
  id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  question_id?: string;
  content: string;
}

export interface Question {
  form_id: string;
  worker_id: string;
  question_id: string;
  answer_id: string;
  questions: {
    id: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    title: string;
    form_id: string;
    order?: number | string;
    answers?: string;
  };
  answers: Answer;
}

export interface StatsAnswer {
  worker_id?: string;
  worker?: WorkerModel;
  question: Question[];
}
