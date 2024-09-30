export interface RecruitmentWorkerModel {
  created_at: string;
  created_by: {
    account_type: string;
    avatar: string;
    birthday: string;
    code: string;
    created_at: string;
    deleted_at: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    phone: string;
    status: string;
    updated_at: string;
  };
  deleted_at: string;
  deleted_by: {
    account_type: string;
    avatar: string;
    birthday: string;
    code: string;
    deleted_at: string;
    email: string;
    gender: string;
    name: string;
    phone: string;
    status: string;
  };
  deleter_id: string;
  emp_id: string;
  id: string;
  plan_id: string;
  recruitment_team_link: {
    employee_id: string;
    recruitment_plan_id: string;
    team?: {
      code: string;
      created_at: string;
      deleted_at: string;
      description: string;
      id: string;
      leader: {
        account_type: string;
        avatar: string;
        birthday: string;
        code: string;
        email: string;
        gender: string;
        id: string;
        name: string;
        num_of_plan: number;
        phone: string;
        status: string;
      };
      leader_id: string;
      member: string;
      name: string;
      updated_at: string;
    };
  };
  updated_at: string;
  worker: {
    acc_type_data: string;
    birthday: string;
    code: string;
    degree: {
      id: string;
      value: string;
    };
    degree_id: string;
    doc_verification_status: string;
    full_name: string;
    gender: string;
    id: string;
    phone: string;
    recruitment_status: {
      id: string;
      value: string;
    };
    recruitment_status_id: string;
    avatar?: string;
  };
  worker_id: string;
  worker_status: string;
}
