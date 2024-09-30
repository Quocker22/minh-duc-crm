import axios from 'axios';

import { axiosClient } from '@/api/axiosClient';
import { IAxiosNetworkError, newAppError } from '@/common/error';
import { AuthModel, FormLoginModel, INetworkResponse } from '@/models';
import { HRModel } from '@/modules/hr-management/models';

const authAPI = {
  getUserByToken(): Promise<INetworkResponse<HRModel>> {
    const url = `/employee/profile`;

    return axiosClient.get(url);
  },

  login(formData: FormLoginModel): Promise<INetworkResponse<AuthModel>> {
    const url = `/employee/login`;

    return axiosClient.post(url, formData);
  },

  async refreshToken(refreshToken: string): Promise<INetworkResponse<AuthModel>> {
    // need to create new axios to avoid await promise pending endlessly because onResponseError calls itself
    const url = `/token/refresh-token`;
    const baseAPIUrl = import.meta.env.VITE_BASE_API_URL;
    const axiosClientRefreshToken = axios.create({ baseURL: baseAPIUrl });

    try {
      const { data } = await axiosClientRefreshToken.post(url, null, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      return new Promise((resolve) => resolve(data));
    } catch (error) {
      const appError = newAppError(error as IAxiosNetworkError);

      return new Promise((resolve, reject) => reject(appError));
    }
  },
};

export { authAPI };
