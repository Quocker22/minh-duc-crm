/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable prettier/prettier */
export const RECIPIENT_OPTION = [
  {
    label: 'Tất cả NLĐ trong hệ thống',
    value: 'all_workers',
  },
  {
    label: 'Nhân sự đang quản lý',
    value: 'worker_of_employees',
  },
  {
    label: 'Đang vận hành cho KH',
    value: 'worker_for_customers',
  },
];

export type RecipientOptionType = typeof RECIPIENT_OPTION[number]['value'];

export const TARGET_ASK_OPTION = [
  {
    label: 'Công ty',
    value: 'COMPANY',
    bgColor: '#006AFD',
    textColor: 'white',
  },
  {
    label: 'Quản lý',
    value: 'MANAGER',
    bgColor: '#00C22B',
    textColor: 'white',
  },
];
