import { HRModel } from '@/modules/hr-management/models';

export interface AuthModel extends HRModel {
  token: { access_token: string; expired_time: number; refresh_token: string };
}

export interface FormLoginModel {
  password: string;
  phone: string;
}
