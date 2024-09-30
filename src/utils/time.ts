import moment, { MomentFormatSpecification } from 'moment';

import { DateTimeFormat } from '@/constants';
import {
  ClientDate,
  ClientDateTime,
  ClientTime,
  ServerDate,
  ServerDateTime,
  ServerTime,
} from '@/models';

export const getCurrentTimeFormat = (format: DateTimeFormat = DateTimeFormat.fe_full_date_time) => {
  return moment().format(format);
};

export const getTimeFormat = (
  time?: string,
  outputFormat: DateTimeFormat = DateTimeFormat.fe_full_date_time,
  format?: MomentFormatSpecification
): string | undefined => {
  const date = moment(time, format);
  if (!date.isValid()) return;

  return moment(time, format).format(outputFormat);
};

export const getServerTime = (
  time?: string,
  format?: MomentFormatSpecification
): ServerTime | undefined => {
  return getTimeFormat(time, DateTimeFormat.full_time, format) as ServerTime | undefined;
};

export const getServerDate = (
  time?: string,
  format?: MomentFormatSpecification
): ServerDate | undefined => {
  return getTimeFormat(time, DateTimeFormat.be_date, format) as ServerDate | undefined;
};

export const getClientMonthYear = (
  time?: string,
  format?: MomentFormatSpecification
): ClientDate | undefined => {
  return getTimeFormat(time, DateTimeFormat.month_year, format) as ClientDate | undefined;
};

export const getServerDateTime = (
  time?: string,
  format?: MomentFormatSpecification
): ServerDateTime | undefined => {
  return getTimeFormat(time, DateTimeFormat.be_full_date_time, format) as
    | ServerDateTime
    | undefined;
};

export const getClientTime = (
  time?: string,
  format?: MomentFormatSpecification
): ClientTime | undefined => {
  return getTimeFormat(time, DateTimeFormat.full_time, format) as ClientTime | undefined;
};

export const getClientDate = (
  time?: string,
  format?: MomentFormatSpecification
): ClientDate | undefined => {
  return getTimeFormat(time, DateTimeFormat.fe_date, format) as ClientDate | undefined;
};

export const getClientDateTime = (
  time?: string,
  format?: MomentFormatSpecification
): ClientDateTime | undefined => {
  return getTimeFormat(time, DateTimeFormat.fe_full_date_time, format) as
    | ClientDateTime
    | undefined;
};

export const isServerDate = (data: string): data is ServerDate => {
  return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(data);
};

export const isServerDateTime = (data: string): data is ServerDateTime => {
  return /^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(data);
};
