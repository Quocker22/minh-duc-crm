import { rankItem } from '@tanstack/match-sorter-utils';
import { cloneDeep, isArray, isObject } from 'lodash-es';
import moment, { Moment } from 'moment';

import { IAppAxiosError } from '@/common/error';
import { APP_COLOR } from '@/constants';
import { Color, INetworkResponse } from '@/models';
import {
  GroupPermissionModel,
  HRRole,
  LeaderModel,
  RecruitmentTeamsModel,
  SimplifiedRecruitmentPlan,
} from '@/modules/hr-management/models';
import { CheckInsModel, WorkerModel } from '@/modules/worker/models';
import { fileUploadModelToString, isFileUploadModel } from '@/utils';

export const isTokenExpired = (appError: IAppAxiosError) => {
  const statusCode = appError.getError().code;
  const message = appError.getMessage();

  return statusCode === 'ERR_401' && message === 'Token is expired';
};

export const removeUTF8Chars = (str: string, toLowerCase = true) => {
  // remove accents
  str = toLowerCase ? str.toLowerCase() : str;

  return str
    .normalize('NFD') //remove accents with Normalize, NFD is Normalized Form D
    .replace(/[\u0300-\u036f]/g, '') //range from u0300 within u036f the Unicode encoding
    .replace(/đ/g, 'd') // case 'đ': normalize will not return d ,so have to do it like this
    .replace(/Đ/g, 'D'); //same as above
};

export const getRandomAppColor = (): string => {
  return APP_COLOR[Math.floor(Math.random() * APP_COLOR.length)];
};

export const formatMoney = (number: number): string => {
  return number.toLocaleString('vi', { currency: 'VND', style: 'currency' });
};

export const fakeNetworkResponse = <T>(data: T): INetworkResponse<T> => {
  return { data };
};

/**
 * It takes an object and returns a new object with all FileUploadModel values converted to strings
 * @param {T} data - T - the data to be prepared
 * @returns A function that takes a generic type T and returns a generic type T.
 */
export const prepareDataToRequest = <T extends object>(data: T): T => {
  if (!isObject(data)) return data;
  const newData = cloneDeep(data);

  for (const key in newData) {
    const value = newData[key];
    if (isFileUploadModel(value)) {
      newData[key] = fileUploadModelToString(value) as unknown as T[Extract<keyof T, string>];
    } else if (isArray(value)) {
      newData[key] = value.map((v) => {
        if (isFileUploadModel(v)) {
          return fileUploadModelToString(v);
        }

        return v;
      }) as unknown as T[Extract<keyof T, string>];
    }
  }

  return newData;
};

export const formatPhoneNumber = (phone: string, prefix = '(+84)') => {
  // remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // phone number is 10 digits
  const match = cleaned.match(/^(\d{1})(\d{2})(\d{3})(\d{4})$/);
  if (!match) return;

  return `${prefix || match[1]}${match[2]} ${match[3]} ${match[4]}`;
};

/**
 * It takes in a string and a comparison string, and returns a boolean value based on whether the
 * string matches the comparison string
 * @param {string} input - The input string that the user is typing into the search box
 * @param {string} comparison - The string to compare against
 * @returns A function that takes two arguments, input and comparison, and returns a boolean.
 */
export const fuzzyFilter = (input: string, comparison: string) => {
  // Rank the item
  const itemRank = rankItem(comparison, input);

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const getHRRoleColor = (role?: HRRole) => {
  switch (role) {
    case HRRole.admin:
      return {
        color: Color.success,
        role: 'Admin',
      };
    case HRRole.member:
      return {
        color: Color.secondary,
        role: 'Member',
      };
    case HRRole.owner:
      return {
        color: Color.info,
        role: 'Owner',
      };

    case HRRole.factory:
      return {
        color: Color.warning,
        role: 'QL nhà máy',
      };
  }
};

export const formatInputMoney = (number: number): string => {
  return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const capitalizeFirstLetter = (text?: string) => {
  return (text || '').charAt(0).toUpperCase() + (text || '').slice(1);
};

export function filterNameAndId(
  recruitmentPlans: GroupPermissionModel[]
): SimplifiedRecruitmentPlan[] {
  return recruitmentPlans.map((plan) => ({
    label: plan.name,
    permissions: plan.permissions.map((permission) => ({
      label: permission.name,
      value: permission.id,
    })),
    value: plan.id,
  }));
}

export function filterLeaders(recruitmentTeams: RecruitmentTeamsModel[]): LeaderModel[] {
  const leaders: LeaderModel[] = [];
  const addedLeaderIds: { [leaderId: string]: boolean } = {};

  for (const project of recruitmentTeams) {
    if (project.leader_id && project.leader && !addedLeaderIds[project.leader_id]) {
      leaders.push(project.leader);
      addedLeaderIds[project.leader_id] = true;
    }
  }

  return leaders;
}

export function checkRoleSystem(currentUser?: string, role?: string, roleMember?: boolean) {
  switch (currentUser) {
    case 'OWNER':
      return true;
    case 'ADMIN':
      switch (role) {
        case 'ADMIN':
          return false;
        case 'MEMBER':
          return true;
      }
      break;
    case 'MEMBER':
      return roleMember;
  }
}

export const disabledDateBirthday = (currentDate: Moment) => {
  // Có thể disable ngày hiện tại và ngày trong tương lai
  return currentDate && currentDate > moment().startOf('day');
};

export function filterWorkersInCheckInList(
  workers: WorkerModel[],
  managerCheckins: CheckInsModel[]
): WorkerModel[] {
  const workerIdsToRemove = new Set(managerCheckins.map((checkin) => checkin.worker_id));

  return workers.filter((worker) => !workerIdsToRemove.has(worker.id));
}
