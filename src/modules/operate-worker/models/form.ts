export interface FormRecruitmentPlanModel {
  academic_level_id?: number;
  age_range?: {
    max: number;
    min: number;
  };
  career_id?: number;
  customer_id?: string;
  degree_id?: number;
  end_date?: string;
  experience?: number;
  gender_percentage?: {
    female: number;
    male: number;
  };
  id?: string;
  name?: string;
  other_requirement_id?: number;
  position_id?: number;
  quantity?: number;
  salary?: number;
  start_date?: string;
}

export interface FromCheckInWorkerModel {
  checkin_date: string;
  checkin_type: string;
  worker_id: string;
  checkin_shifts?: {
    name: string;
    value?: number;
  }[];
  id?: string;
  note?: string;
}

export interface FromCheckInWorkerManyModel {
  data: FromCheckInWorkerModel[];
}

export enum OperationalStatusOption {
  biDuoi = 'TRANG-THAI-VAN-HANH-NLD-03',
  catGiam = 'TRANG-THAI-VAN-HANH-NLD-04',
  dangChoViec = 'TRANG-THAI-VAN-HANH-NLD-02',
  dangLamViec = 'TRANG-THAI-VAN-HANH-NLD-01',
  tuNghi = 'TRANG-THAI-VAN-HANH-NLD-05',
}

export const OPERATIONAL_STATUS_OPTION = [
  {
    bgColor: '#00C22B',
    label: 'Đang làm việc',
    textColor: 'white',
    value: OperationalStatusOption.dangLamViec,
  },
  {
    bgColor: '#ffc700',
    label: 'Đang chờ việc',
    textColor: 'white',
    value: OperationalStatusOption.dangChoViec,
  },
  {
    bgColor: '#A60000',
    label: 'Tự nghỉ',
    textColor: 'white',
    value: OperationalStatusOption.tuNghi,
  },
  {
    bgColor: '#A60000',
    label: 'Cắt giảm',
    textColor: 'white',
    value: OperationalStatusOption.catGiam,
  },
  {
    bgColor: '#A60000',
    label: 'Bị đuổi',
    textColor: 'white',
    value: OperationalStatusOption.biDuoi,
  },
];
