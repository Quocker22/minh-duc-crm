/* eslint-disable typescript-sort-keys/interface */
export interface WorkerModelFilterModel {
  checkin_from?: string;
  checkin_status?: string;
  checkin_to?: string;
  degree_id?: string;
  doc_verification_status?: string;
  full_name?: string;
  gender?: string;
  customer_id?: string;
  with_manager_checkin?: boolean;
  operational_status_id?: string;
  phone?: string;
  recruitment_status_id?: string;
  status?: string;
  with_checkin?: boolean;
}

export interface WorkerFilterHistoriesPlanModel {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  name: string;
  code: string;
  customer_id: string;
  customer: {
    id: string;
    name: string;
    avatar: string;
  };
  start_date: string;
  end_date: string;
  career_id: string;
  career: {
    id: string;
    value: string;
  };
  position_id: string;
  position: {
    id: string;
    value: string;
  };
  quantity: number;
  salary: number;
  age_range: {
    min: number;
    max: number;
  };
  gender_percentage: {
    male: number;
    female: number;
  };
  academic_level_id: string;
  academic_level: {
    id: string;
    value: string;
  };
  degree_id: string;
  degree: {
    id: string;
    value: string;
  };
  experience: number;
  other_requirement_id: string;
  other_requirement: {
    id: string;
    value: string;
  };
  status: string;
}
