import { Outlet, Route, Routes } from 'react-router-dom';

import { Error404 } from '@/modules/errors/components/Error404';
import { Error500 } from '@/modules/errors/components/Error500';

const ErrorsLayout = () => {
  return <Outlet />;
};

const ErrorsPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route element={<Error404 />} path="404" />
      <Route element={<Error500 />} path="500" />
      <Route element={<Error404 />} index />
    </Route>
  </Routes>
);

export { ErrorsPage };
