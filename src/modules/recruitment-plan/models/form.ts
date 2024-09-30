import { CAMPAIGN_OPTIONS } from '@/modules/recruitment-organization/models/response';

export interface FormRecruitmentPlanModel {
  academic_level_id?: number;
  age_range?: {
    max: number;
    min: number;
  };
  age_range_max?: number;
  age_range_min?: number;
  career_id?: number;
  customer_id?: string;
  customer_name?: string;
  degree_id?: number;
  end_date?: string;
  experience?: number;
  gender_percentage?: {
    female: number;
    male: number;
  };
  id?: string;
  name?: string;
  note?: string;
  other_requirement_id?: number;
  position_id?: number;
  quantity?: number;
  salary?: number;
  start_date?: string;
  // eslint-disable-next-line prettier/prettier
  status?: typeof CAMPAIGN_OPTIONS[number]['value'];
}

export interface FormUpdateTeamTargetModel {
  plan_id: string;
  target: number;
  team_id: string;
}

export interface FormDeleteTeamModel {
  plan_id: string;
  team_id: string;
}

export interface FormAddTeamRecruitment {
  plan_id: string;
  team_ids: string[];
}
