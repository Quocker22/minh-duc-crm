import { Key } from 'react';

export interface FormRecruitmentPlanModel {
  academic_level_id?: number;
  age_range?: {
    max: number;
    min: number;
  };
  career_id?: number;
  customer_id?: string;
  degree_id?: number;
  end_date?: string;
  experience?: number;
  gender_percentage?: {
    female: number;
    male: number;
  };
  id?: string;
  name?: string;
  other_requirement_id?: number;
  position_id?: number;
  quantity?: number;
  salary?: number;
  start_date?: string;
}

export interface FormRecruitmentOrgAddWorkerModel {
  plan_id: string;
  workers?: {
    id: Key;
    manager_id?: string;
  }[];
}

export interface FormUpdateHRTargetModel {
  member_id: string;
  plan_id: string;
  target: number;
}

export interface FormRecruitmentOrgAddMemberModel {
  member_ids: string[];
  plan_id: string;
}
