import { Key } from 'react';

export enum HRStatus {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}

export enum HRRole {
  admin = 'ADMIN',
  factory = 'FACTORY',
  member = 'MEMBER',
  owner = 'OWNER',
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

export interface HRModel {
  account_type: HRRole;
  avatar: string;
  birthday: string;
  code: string;
  created_at: string;
  deleted_at: string;
  email: string;
  gender: HRGender;
  id: string;
  login_at: string;
  name: string;
  number_workers: number;
  phone: string;
  status: HRStatus;
  updated_at: string;
  isLeader?: boolean;
  key?: Key;
  permission_codes?: string[];
  roles?: RoleModel[];
  target?: number;
}

export interface RoleModel {
  created_at: string;
  creator: HRModel;
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
  description?: string;
  id?: string;
  leader?: LeaderModel;
  leader_id?: string;
  member?: HRModel[];
  name?: string;
  updated_at?: string;
}
