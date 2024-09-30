import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { authAPI } from '@/api/auth';
import { IAxiosNetworkError, newAppError } from '@/common/error';
import { TOKEN } from '@/constants';
import { getToken, removeToken } from '@/hooks/useAuth';
import { AuthModel, INetworkResponse } from '@/models';
import { isTokenExpired, localSetItem } from '@/utils';

const baseAPIUrl = import.meta.env.VITE_BASE_API_URL;
const axiosClient = setupInterceptorsTo(axios.create({ baseURL: baseAPIUrl }));

const maxRefreshTokenRequest = 5; // first call error and 5 times retry => 6 errors
let refreshTokenRequestCount = 0;
let refreshTokenRequest: Promise<INetworkResponse<AuthModel>> | null = null;

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}

function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  if (config.headers && !config.headers?.Authorization) {
    const { accessToken } = getToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  const appError = newAppError(error as IAxiosNetworkError);

  return Promise.reject(appError);
}

function onResponse<T>(response: AxiosResponse<INetworkResponse<T>>): INetworkResponse<T> {
  if (!response.data.error_info) return response.data;

  // BE always returns 200 (except expired token return 401) => can detect error if error_info is not empty
  const error: AxiosError = {
    code: response.data.error_info.code,
    config: response.config,
    isAxiosError: true,
    message: response.data.error_info.message.join(', '),
    name: response.data.error_info.code,
    request: response.request,
    response,
    toJSON: () => response,
  };
  const appError = newAppError(error as IAxiosNetworkError);
  throw appError;
}

async function onResponseError(
  error: AxiosError
): Promise<AxiosError | undefined | AxiosPromise<unknown>> {
  const appError = newAppError(error as IAxiosNetworkError);

  const { config } = error;
  const { refreshToken } = getToken();

  if (
    !isTokenExpired(appError) ||
    !refreshToken ||
    refreshTokenRequestCount >= maxRefreshTokenRequest
  ) {
    return Promise.reject(appError);
  }

  refreshTokenRequestCount += 1;

  try {
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : authAPI.refreshToken(refreshToken);

    const { data: auth } = await refreshTokenRequest;
    refreshTokenRequest = null;

    const newAccessToken = auth as unknown as { access_token: string };

    localSetItem(TOKEN, newAccessToken.access_token);

    const accessToken = getToken().accessToken;
    if (accessToken && config.headers?.Authorization)
      config.headers.Authorization = `Bearer ${accessToken}`;

    return axiosClient(config);
  } catch (error) {
    removeToken();

    // don't need wrap by app error (line 29 file api/auth.ts is handled)
    return Promise.reject(error);
  }
}

export { axiosClient };
