import { useState } from 'react';

import { IAppAxiosError } from '@/common/error';
import { useAppDispatch } from '@/hooks';
import { useToast } from '@/hooks/useToast';
import { INetworkResponse } from '@/models';
import { authActions } from '@/modules/auth/core/authSlice';
import { isTokenExpired } from '@/utils';

function useCallApi() {
  const dispatch = useAppDispatch();
  const { toastSuccess, toastError } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * It's a function that is used to handle api call.
   * It will handle logout if an expired token error occurs.
   * It takes in a function that returns a promise, and returns a promise that resolves to the data of
   * the response, or false if there was an error
   * @param action - () => Promise<INetworkResponse<T>>
   * @param [isShowErrorResponse=false] - If true, the error response will be shown in the error
   * message.
   * @param [messageOnSuccess] - The message to show when the API call is successful.
   * @param [messageOnError] - The message to show when the API call fails.
   * @param [responseHandler] - A function to process the response before returning it.
   * @returns A function that returns a promise.
   */
  async function handleCallApi<T>(
    action: () => Promise<INetworkResponse<T>>,
    isShowErrorResponse = false,
    messageOnSuccess = '',
    messageOnError = '',
    responseHandler?: (response: INetworkResponse<T>) => void
  ): Promise<T | undefined> {
    setErrorMessage('');
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await action();
      if (responseHandler) {
        responseHandler(response);
      }
      handleSuccess(messageOnSuccess);

      return response?.data;
    } catch (error) {
      const appError = error as IAppAxiosError;
      setErrorMessage(appError.getMessage());
      setIsError(true);
      handleError(appError, isShowErrorResponse, messageOnError);

      return;
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuccess(messageOnSuccess?: string) {
    messageOnSuccess &&
      toastSuccess({ i18nTitle: 'GENERAL.ACTION.SUCCESS', subtitle: messageOnSuccess });
  }

  function handleError(
    appError: IAppAxiosError,
    isShowErrorResponse?: boolean,
    messageOnError?: string
  ) {
    // Axios Client handled refresh token if token expired error => refresh token processing failed
    if (isTokenExpired(appError)) {
      dispatch(authActions.logout());
      toastError({ i18nSubTitle: 'AUTH.LOGIN.AGAIN', i18nTitle: 'AUTH.SESSION.TIMEOUT' });

      return;
    }

    // if (appError.getMessage() === 'Forbidden' || appError.getError().code === 'ERR_403') {
    //   history.push(`/access-denied`);

    //   return;
    // }

    if (isShowErrorResponse) {
      toastError({ i18nTitle: 'GENERAL.ACTION.FAILURE', subtitle: appError.getMessage() });

      return;
    }

    messageOnError && toastError({ i18nTitle: 'GENERAL.ACTION.FAILURE', subtitle: messageOnError });
  }

  return { errorMessage, handleCallApi, isError, isLoading };
}

export { useCallApi };
