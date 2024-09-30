import { GenderTypeOptions } from '@/models';
import { CampaignOptions } from '@/modules/recruitment-plan/models';

export interface DataListFilterModel {
  degree_id?: string;
  gender?: GenderTypeOptions;
  name?: string;
  recruitment_plan_id?: string;
  status?: CampaignOptions;
}

export interface RecruitmentFilterModel {
  gender?: GenderTypeOptions;
  name?: string;
  status?: CampaignOptions;
}

export interface CheckInFilterModel {
  checkin_type?: string;
}
