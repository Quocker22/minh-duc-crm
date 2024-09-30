import { TableColumnsType } from 'antd';
import moment from 'moment';

import { DateTimeFormat } from '@/constants';
import { CheckInModel, ColWorkerCheckInModel } from '@/modules/operate-worker/models';
import { WorkerModel } from '@/modules/worker/models';

export function getAllDaysInCurrentMonth(month?: string): TableColumnsType<ColWorkerCheckInModel> {
  const selectedMonth = month ? moment(month, 'YYYY-MM-DD') : moment();
  const daysInMonth: number = selectedMonth.daysInMonth();

  const daysArray: TableColumnsType<ColWorkerCheckInModel> = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const day: moment.Moment = selectedMonth.date(i);
    const dataIndex = day.format('DD/MM/YYYY');

    daysArray.push({
      align: 'center',
      dataIndex,
      width: 120,
    });
  }

  return daysArray;
}

export const getTitleFromIndex = (number: number): string => {
  switch (number) {
    case 0:
      return 'Check in';
    case 1:
      return 'HC ngày (h)';
    case 2:
      return 'TC trưa (h)';
    case 3:
      return 'TC ngày (h)';
    case 4:
      return 'HC đêm (h)';
    default:
      return 'TC đêm (h)';
  }
};

export const getDataCheckInWorker = (record: WorkerModel): ColWorkerCheckInModel[] => {
  const currentDate = moment();

  const lastDayOfMonth = currentDate.endOf('month').date();

  const data: ColWorkerCheckInModel[] = [];
  for (let l = 0; l < 6; ++l) {
    const DataRow: ColWorkerCheckInModel = {
      check_in: getTitleFromIndex(l),
    };

    for (let i = 1; i <= lastDayOfMonth; ++i) {
      const dateKey = currentDate.date(i).format('DD/MM/YYYY');
      const valueCheckIn = record?.manager_checkins?.find((checkIn) => {
        const checkInDate = moment(checkIn?.checkin_date).format('DD/MM/YYYY');

        return checkInDate === dateKey;
      });

      if (!valueCheckIn) {
        DataRow[dateKey] = '';
        continue;
      }
      switch (DataRow.check_in) {
        case 'Check in':
          DataRow[dateKey] = moment(valueCheckIn.checkin_date).format(DateTimeFormat.time);

          if (valueCheckIn.checkin_type !== 'CDL') {
            DataRow[dateKey] = valueCheckIn.checkin_type;
          }
          continue;
        case 'HC ngày (h)':
          valueCheckIn.checkin_shifts?.find((checkinShift) => {
            if (checkinShift.name === 'HC_NGAY') {
              DataRow[dateKey] = checkinShift.value.toString();
            }
          });
          if (valueCheckIn.checkin_type !== 'CDL') {
            DataRow[dateKey] = '';
          }
          continue;
        case 'TC trưa (h)':
          valueCheckIn.checkin_shifts?.find((checkinShift) => {
            if (checkinShift.name === 'TC_TRUA') {
              DataRow[dateKey] = checkinShift.value.toString();
            }
          });
          if (valueCheckIn.checkin_type !== 'CDL') {
            DataRow[dateKey] = '';
          }
          continue;
        case 'TC ngày (h)':
          valueCheckIn.checkin_shifts?.find((checkinShift) => {
            if (checkinShift.name === 'TC_NGAY') {
              DataRow[dateKey] = checkinShift.value.toString();
            }
          });
          if (valueCheckIn.checkin_type !== 'CDL') {
            DataRow[dateKey] = '';
          }
          continue;
        case 'HC đêm (h)':
          valueCheckIn.checkin_shifts?.find((checkinShift) => {
            if (checkinShift.name === 'HC_DEM') {
              DataRow[dateKey] = checkinShift.value.toString();
            }
          });
          if (valueCheckIn.checkin_type !== 'CDL') {
            DataRow[dateKey] = '';
          }
          continue;
        case 'TC đêm (h)':
          valueCheckIn.checkin_shifts?.find((checkinShift) => {
            if (checkinShift.name === 'TC_DEM') {
              DataRow[dateKey] = checkinShift.value.toString();
            }
          });
          if (valueCheckIn.checkin_type !== 'CDL') {
            DataRow[dateKey] = '';
          }
          continue;
        default:
          DataRow[dateKey] = '';
      }
    }
    data.push(DataRow);
  }

  return data;
};

export function formatDateTimeCustom(date?: string, time?: string) {
  const formattedDate = moment(date, 'DD/MM/YYYY');
  const formattedTime = moment(time, 'HH:mm');
  formattedDate.hour(formattedTime.hour());
  formattedDate.minute(formattedTime.minute());
  formattedDate.utcOffset('+07:00');
  const formattedDateTime = formattedDate.format('YYYY-MM-DDTHH:mm:ssZ');

  return formattedDateTime;
}

export const sumValueWorker = (worker?: WorkerModel[]) => {
  worker?.map((i) => {
    let cnDem = 0,
      cnNgay = 0,
      hcDem = 0,
      hcNgay = 0,
      tcDem = 0,
      tcNgay = 0,
      tcTrua = 0,
      countChuNhat = 0;
    i?.manager_checkins?.map((l) => {
      l?.checkin_shifts?.map((o) => {
        if (i.id === l.worker_id && l.id === o.checkin_id)
          switch (o.name) {
            case 'CN_DEM':
              hcDem += o.value;
              cnDem += o.value;
              break;
            case 'CN_NGAY':
              hcNgay += o.value;
              cnNgay += o.value;
              break;
            case 'HC_NGAY':
              hcNgay += o.value;
              break;
            case 'HC_DEM':
              hcDem += o.value;
              break;
            case 'TC_NGAY':
              tcNgay += o.value;
              break;
            case 'TC_TRUA':
              tcTrua += o.value;
              break;
            case 'TC_DEM':
              tcDem += o.value;
              break;
          }
        if (cnDem + cnNgay >= 8) {
          countChuNhat++;
        }
      });
    });
    i.cnDem = cnDem;
    i.cnNgay = cnNgay;
    i.hcDem = hcDem;
    i.hcNgay = hcNgay;
    i.tcDem = tcDem;
    i.tcNgay = tcNgay;
    i.tcTrua = tcTrua;
    i.ngayDiLam = Math.floor((hcNgay + hcDem) / 8);
    i.chuNhatLe = countChuNhat;
  });

  const resData = worker?.map((i) => ({
    ...i,
    key: i.id,
  }));

  return resData;
};

export function getFirstAndLastDayOfMonthFromDate(dateString: string): {
  firstDay: string;
  lastDay: string;
} {
  const date = moment(dateString);

  const month = date.month() + 1;
  const year = date.year();

  const firstDayOfMonth = moment(`${year}-${month}-01`);
  const lastDayOfMonth = firstDayOfMonth.clone().endOf('month');
  const firstDayString = firstDayOfMonth.format('YYYY-MM-DD');
  const lastDayString = lastDayOfMonth.format('YYYY-MM-DD');

  return {
    firstDay: firstDayString,
    lastDay: lastDayString,
  };
}

export function filterByWorkerId(
  managerCheckins?: CheckInModel[],
  workers?: WorkerModel[]
): WorkerModel[] | undefined {
  return workers?.filter((checkin) => {
    return managerCheckins?.some((worker) => worker.worker_id === checkin.id);
  });
}
