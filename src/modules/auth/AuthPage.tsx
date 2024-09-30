import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { toAbsoluteUrl } from '@/_metronic/helpers';
import { Login } from '@/modules/auth/components/Login';

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body');

    return () => {
      document.body.classList.remove('bg-body');
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100">
      {/* Left Side */}
      <div
        className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-2 order-lg-1"
        style={{ backgroundImage: `url(${toAbsoluteUrl('/media/login/bg-login.jpg')})` }}
      >
        <div className="d-flex flex-column flex-center pt-20 px-5 px-md-15 w-100">
          <h1
            className="text-white text-center mt-20"
            style={{
              fontFamily: 'Roboto Slab',
              fontSize: '30px',
              fontStyle: 'normal',
              fontWeight: '800',
              lineHeight: 'normal',
            }}
          >
            Chào mừng đến với
          </h1>
          <img
            alt=""
            className="mx-auto mt-20 w-100px w-md-100px w-xl-120px mb-10 mb-lg-20"
            src={toAbsoluteUrl('/media/login/logo.png')}
          />

          <h1
            className="text-white text-center mb-20"
            style={{
              fontFamily: 'Roboto Slab',
              fontSize: '50px',
              fontStyle: 'normal',
              fontWeight: '800',
              lineHeight: 'normal',
            }}
          >
            MINH ĐỨC CRM
          </h1>

          <div className="text-white fs-base text-center mt-20">
            <img
              alt=""
              className="mx-auto ps-5 mt-20 w-250px w-md-300px w-xl-430px mb-4 "
              src={toAbsoluteUrl('/media/login/login-contact.png')}
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-1 order-lg-2">
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          <div className="w-lg-500px w-400px p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route element={<Login />} path="login" />
      <Route element={<Login />} index />

      {/* Page Not Found */}
      <Route element={<Navigate to="/error/404" />} path="*" />
    </Route>
  </Routes>
);

export { AuthPage };
