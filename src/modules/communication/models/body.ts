/* eslint-disable typescript-sort-keys/interface */
export interface FilterSupport {
  limit?: number;
  message?: string;
  page?: number;
  supporter_id?: string;
  target_ask?: string;
  worker_id?: string;
}

export interface FilterMessage {
  limit?: number;
  message?: string;
  page?: number;
  supporter_id?: string;
  target_ask?: string;
  worker_id?: string;
}

export interface SupportMessage {
  message?: string;
  supporter_id?: string;
  target_ask?: string;
  worker_id?: string;
  sender?: 'SUPPORTER' | 'WORKER';
}
