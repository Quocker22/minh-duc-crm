import { FC, useEffect, useState } from 'react';

import { WithChildren } from '@/_metronic/helpers';
import { LayoutSplashScreen } from '@/_metronic/layout/core';
import { useAuth } from '@/hooks/useAuth';

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { getUserByToken, logout, isLoggedIn, setCurrentUser } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    handleGetUser();
  }, []);

  async function handleGetUser() {
    if (!isLoggedIn) return setShowSplashScreen(false);
    const user = await getUserByToken();
    user ? setCurrentUser(user) : logout();
    setShowSplashScreen(false);
  }

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthInit };
