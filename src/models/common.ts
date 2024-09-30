import { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AnySchema } from 'yup';

import { PaginationState } from '@/models';

export type IFunction = (...agrs: any[]) => any;

export type Shape<Fields extends Record<any, any>> = {
  [Key in keyof Fields]: AnySchema;
};

export interface INetworkResponse<Data> {
  data: Data;
  error_info?: { code: string; message: string[] };
}

export interface INetworkError {
  message: string;
  status: string;
}

export interface PaginationResponse<Data> extends PaginationState {
  rows: Data;
}

export type ID = undefined | null | string;

export type ServerTime = `${number}${number}:${number}${number}:${number}${number}`;

export type ServerDate =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

export type ServerDateTime =
  `${number}${number}${number}${number}-${number}${number}-${number}${number} ${number}${number}:${number}${number}:${number}${number}`;

export type ClientTime = ServerTime;

export type ClientDate =
  `${number}${number}/${number}${number}/${number}${number}${number}${number}`;

export type ClientDateTime =
  `${number}${number}/${number}${number}/${number}${number}${number}${number} ${number}${number}:${number}${number}:${number}${number}`;

export enum PlacementDrawerType {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top',
}
export enum SizeDrawerType {
  default = 'default',
  large = 'large',
}

export enum StatusType {
  bottom_left = 'error',
  bottom_right = 'warning',
}

export enum PlacementType {
  bottom_left = 'bottomLeft',
  bottom_right = 'bottomRight',
  top_left = 'topLeft',
  top_right = 'topRight',
}
export interface IMap {
  label?: string;
  lat?: number;
  lng?: number;
}
export interface IPosition {
  from?: IMap;
  to?: IMap;
}

export enum Color {
  danger = 'danger',
  dark = 'dark',
  info = 'info',
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  warning = 'warning',
}

export enum Placement {
  top = 'top',
}

export enum DatePickerType {
  date = 'date',
  month = 'month',
  quarter = 'quarter',
  week = 'week',
  year = 'year',
}

export enum ProgressStatuses {
  active = 'active',
  exception = 'exception',
  normal = 'normal',
  success = 'success',
}

export type MutationOptions<TData = unknown, TVariables = void> = Omit<
  UseMutationOptions<TData | undefined, unknown, TVariables, unknown>,
  'mutationFn'
>;

export type QueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  UseQueryOptions<TQueryFnData | undefined, TError, TData | undefined, TQueryKey>,
  'queryKey' | 'queryFn'
>;

export enum GenderTypeOptions {
  female = 'FEMALE',
  male = 'MALE',
}

export const GENDER_TYPE_OPTIONS = [
  { label: 'Nam', value: GenderTypeOptions.male },
  { label: 'Nữ', value: GenderTypeOptions.female },
];

export const WORKER_STATUS_OPTIONS = [
  { label: 'Đã dừng', value: 'INACTIVE' },
  { label: 'Đang hoạt động', value: 'ACTIVE' },
  { label: 'Danh sách đen', value: 'BLACKLIST' },
];
