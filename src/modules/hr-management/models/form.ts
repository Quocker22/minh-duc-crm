import { HRGender, HRRole, HRStatus } from '@/modules/hr-management/models';

export const HR_STATUS_OPTION = [
  {
    label: 'Đang hoạt động',
    value: 'ACTIVE',
  },
  {
    label: 'Dừng hoạt đông',
    value: 'INACTIVE',
  },
];

export interface FormHRModel {
  account_type?: HRRole;
  avatar?: string;
  birthday?: string;
  email?: string;
  gender?: HRGender;
  id?: string;
  name?: string;
  password?: string;
  phone?: string;
  role_ids?: React.Key[];
  roles?: FormRoleModel[];
  status?: HRStatus;
}

export interface FormChangePasswordModel {
  current_pwd?: string;
  new_password_confirmation?: string;
  new_pwd?: string;
}
export interface FormRoleModel {
  creator_id?: string;
  description?: string;
  id?: string;
  name?: string;
  permissions?: {
    id: string;
  }[];
}
export interface FormRecruitmentTeamsModel {
  name: string;
  description?: string;
  id?: string;
  leader_id?: string;
  member?: {
    id: React.Key;
  }[];
}
