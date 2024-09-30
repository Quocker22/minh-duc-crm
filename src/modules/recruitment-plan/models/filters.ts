import { GenderTypeOptions } from '@/models';
import { CampaignOptions } from '@/modules/recruitment-plan/models';

export interface DataListFilterModel {
  edu_level?: string;
  from?: string;
  gender?: GenderTypeOptions;
  manager_ids?: string;
  name?: string;
  operational_status_id?: string;
  recruitment_plan_id?: string;
  recruitment_team_id?: string;
  status?: string;
  to?: string;
}

export interface RecruitmentPlanFilterModel {
  customer_id?: string;
  gender?: GenderTypeOptions;
  name?: string;
  status?: CampaignOptions;
}
