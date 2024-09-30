import { AxiosError } from 'axios';

import { INetworkError } from '@/models';
import { getCurrentTimeFormat } from '@/utils';

export type IAppAxiosError = AppError<IAxiosNetworkError>;
export type IAxiosNetworkError = AxiosError<INetworkError, unknown>;
type ErrorLang = 'vi' | 'en';
type LogType = 'log' | 'info' | 'warn' | 'error';
type IError<OriginError extends Error> = {
  code: string;
  message: { en: string; vi: string };
} & (
  | { isServerError: true; originError: IAxiosNetworkError }
  | { isServerError: false; originError: OriginError }
);

interface IAppError<OriginError extends Error> {
  getError: () => IError<OriginError>;
  getMessage: () => string;
  isServerError: () => boolean;
  log: (type: LogType) => this;
  setError: (error: OriginError) => this;
  setMessage: (message: string, type: ErrorLang) => this;
}

class AppError<OriginError extends Error> implements IAppError<OriginError> {
  private _error: IError<OriginError>;
  private _lang: ErrorLang;

  constructor(error: OriginError) {
    this._lang = 'vi';
    this._error = {
      code: '',
      isServerError: false,
      message: { en: '', vi: '' },
      originError: error,
    };
    this.setError(error);
  }

  log(type: LogType = 'error') {
    console[type](`[${getCurrentTimeFormat()}]`, this._error);

    return this;
  }

  isServerError() {
    return (this._error.originError as unknown as IAxiosNetworkError).isAxiosError;
  }

  getError() {
    return this._error;
  }

  setError(error: OriginError) {
    this._error.originError = error;
    this._error.isServerError = this.isServerError();
    this._error.code = this._error.isServerError
      ? this._error.originError.response?.data.status || ''
      : '';

    const message = this._error.isServerError
      ? this._error.originError.response?.data.message || error.message
      : error.message;

    this.setMessage(message, 'vi');
    this.setMessage(message, 'en');

    return this;
  }

  setMessage(message: string, type: ErrorLang = 'vi') {
    this._error.message[type] = message;

    return this;
  }

  getMessage() {
    return this._error.message[this._lang];
  }
}

function newAppError<OriginError extends Error>(
  error: OriginError,
  isSilent = false
): AppError<OriginError> {
  const appError = new AppError(error);
  !isSilent && appError.log();

  return appError;
}

export { newAppError };
