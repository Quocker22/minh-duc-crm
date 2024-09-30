/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from 'react';
import { Navigate, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { App } from '@/App';
import { useAuth } from '@/hooks/useAuth';
import { AuthPage } from '@/modules/auth';
import { ErrorsPage } from '@/modules/errors/ErrorsPage';
import { PrivateRoutes } from '@/router/PrivateRoutes';
import { history } from '@/utils';

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { VITE_PUBLIC_URL: PUBLIC_URL } = import.meta.env;

const AppRoutes: FC = () => {
  const { currentUser } = useAuth();

  return (
    <HistoryRouter basename={PUBLIC_URL} history={history}>
      <Routes>
        <Route element={<App />}>
          <Route element={<ErrorsPage />} path="error/*" />
          {currentUser ? (
            <>
              <Route element={<PrivateRoutes />} path="*" />
              <Route element={<Navigate to="/recruitment-plan/list" />} index />
            </>
          ) : (
            <>
              <Route element={<AuthPage />} path="auth/*" />
              <Route element={<Navigate to="/auth" />} path="*" />
            </>
          )}
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export { AppRoutes };
