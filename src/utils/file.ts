import { isEmpty, isObject, isUndefined } from 'lodash-es';

import { FileUploadModel } from '@/models';

export const fileUploadModelToString = (file?: FileUploadModel): string => {
  return file?.url || '';
};

export const fileUploadModelsToStrings = (files?: FileUploadModel[]): string[] => {
  return files?.map((f) => f.url || '') || [];
};

export const stringToFileUploadModel = (url?: string): FileUploadModel => {
  return { url };
};

export const stringsToFileUploadModels = (urls?: string[]): FileUploadModel[] => {
  return urls?.map((u) => ({ url: u })) || [];
};

export const isFileUploadModel = (data?: any): data is FileUploadModel => {
  if (isEmpty(data) || !isObject(data)) return false;

  return !isUndefined((data as any).url) || !isUndefined((data as any).progress);
};

export function getFileNameFromUrl(url: string): string | null {
  // Tách URL thành các thành phần bằng '/'
  const parts = url.split('/');

  // Lấy phần tử cuối cùng của mảng parts, đó là tên file
  const fileName = parts?.[parts.length - 1];

  // Trả về tên file
  return fileName || null; // Trả về null nếu không tìm thấy tên file
}
