import { authAPI } from '@/api/auth';
import { REFRESH_TOKEN, TOKEN } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useCallApi } from '@/hooks/useCallApi';
import { AuthModel, FormLoginModel } from '@/models';
import { authActions, selectCurrentUser, selectIsLoggedIn } from '@/modules/auth/core/authSlice';
import { HRModel } from '@/modules/hr-management/models';
import { localGetItem, localRemoveItem, localSetItem } from '@/utils';

function getToken() {
  const accessToken = localGetItem(TOKEN);
  const refreshToken = localGetItem(REFRESH_TOKEN);

  return { accessToken, refreshToken };
}

function setToken(auth: AuthModel) {
  const { access_token: accessToken, refresh_token: refreshToken } = auth.token;
  accessToken && localSetItem(TOKEN, accessToken);
  refreshToken && localSetItem(REFRESH_TOKEN, refreshToken);
}

function removeToken() {
  localRemoveItem(TOKEN);
  localRemoveItem(REFRESH_TOKEN);
}

function useAuth() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { isLoading, errorMessage, isError, handleCallApi } = useCallApi();

  /**
   * handle login,
   * set token,
   * get auth information => save to the redux store,
   * redirect to dashboard page.
   * if error occurs => handle logout
   */
  async function login(formData: FormLoginModel) {
    const auth = await handleCallApi(() => authAPI.login(formData), true);
    if (!auth) return logout();
    setToken(auth);

    const user = await getUserByToken();
    user ? setCurrentUser(user) : logout();
  }

  /**
   * remove token,
   * remove auth information in the redux store,
   * redirect to auth page
   */
  function logout() {
    removeToken();
    setCurrentUser();
  }

  /**
   * handle get auth information => success => save to the redux store.
   */
  function getUserByToken() {
    return handleCallApi(() => authAPI.getUserByToken());
  }

  /**
   * If the user is not null, dispatch the loginSuccess action, otherwise dispatch the logout action
   */
  function setCurrentUser(user?: HRModel) {
    const action = user ? authActions.loginSuccess(user) : authActions.logout();
    dispatch(action);
  }

  return {
    currentUser,
    errorMessage,
    getUserByToken,
    isError,
    isLoading,
    isLoggedIn,
    login,
    logout,
    setCurrentUser,
  };
}

export { getToken, removeToken, setToken, useAuth };
