/* eslint-disable typescript-sort-keys/interface */
import { RecipientOptionType } from '@/modules/communication/constants';

interface WorkerRecipient {
  recruitment_status_id?: string;
  status_name?: string;
  manager_id?: string;
  customer_id?: string;
  worker_count?: number | string;
}
export interface FormSurveyModel {
  id?: string;
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  surveyQuestions?: SurveyQuestion[];
  form_type?: RecipientOptionType;
  file?: any;
  form_category?: Category;
  status?: StatusSurvey;
  workers?: WorkerRecipient[];
}

export interface SurveyQuestion {
  title?: string;
  answers: Option[];
  form_id?: string;
  order?: number | string;
  id?: string;
}

export interface Option {
  content?: string;
}

export type Category = 'survey' | 'salary_survey';

export type StatusSurvey = 'WORKING' | 'PENDING' | 'END';
