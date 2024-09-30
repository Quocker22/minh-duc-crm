import { ReactNode } from 'react';

export interface OperateWorkerModel {
  code: string;
  count_employee: number;
  id: string;
  local: string;
  manager: string;
  name: string;
}

export interface CheckInModel {
  checkin_date: string;
  checkin_type: string;
  created_at: string;
  deleted_at: string;
  id: string;
  updated_at: string;
  worker: string;
  worker_id: string;
  checkin_shifts?: {
    checkin_id: string;
    created_at: string;
    deleted_at: string;
    id: string;
    name: string;
    updated_at: string;
    value: number;
  }[];
  manager_checkin_shifts?: {
    checkin_id: string;
    created_at: string;
    deleted_at: string;
    id: string;
    name: string;
    updated_at: string;
    value: number;
  }[];
}

export interface TransformedCheckInModel {
  checkin_date: string;
  checkin_type: string;
  index: number;
  worker_id: string;
  checkin_id?: string;
  created_at?: string;
  deleted_at?: string;
  id?: string;
  name?: string;
  updated_at?: string;
  value?: number;
}

export interface ColWorkerCheckInModel {
  [key: string]: string | ReactNode;
  check_in: string;
}

export interface CheckInStatusModel {
  total_worker: number;
  total_worker_absent: number;
  total_worker_plan: number;
  total_worker_working: number;
}
