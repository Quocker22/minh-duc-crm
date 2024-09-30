import { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

import { getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { WithChildren } from '@/_metronic/helpers';
import { AccessDenied } from '@/_metronic/layout/components/AccessDenied';
import { PageTitle } from '@/_metronic/layout/core';
import { MasterLayout } from '@/_metronic/layout/MasterLayout';
import CommunicationPage from '@/modules/communication/CommunicationPage';
import CustomerPage from '@/modules/customer/CustomerPage';
import { Profile } from '@/modules/hr-management/components/Profile';
import HRPage from '@/modules/hr-management/HRPage';
import OperateWorker from '@/modules/operate-worker/OperateWorker';
import RecruitmentOrganizationPage from '@/modules/recruitment-organization/RecruitmentOrganizationPage';
import RecruitmentPage from '@/modules/recruitment-plan/RecruitmentPage';
import WorkerPage from '@/modules/worker/WorkerPage';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route element={<Navigate to="/recruitment-plan/list" />} path="auth/*" />
        {/* Pages */}
        <Route
          element={
            <SuspensedView>
              <div>dashboard</div>
            </SuspensedView>
          }
          path="dashboard/"
        />
        {/* profile */}
        <Route
          element={
            <SuspensedView>
              <PageTitle
                breadcrumbs={[
                  {
                    isActive: false,
                    isSeparator: false,
                    path: '/profile',
                    title: 'Thông tin cá nhân',
                  },
                ]}
              />
              <Profile />
            </SuspensedView>
          }
          path="profile/"
        />
        {/* recruitment */}
        <Route
          element={
            <SuspensedView>
              <RecruitmentPage />
            </SuspensedView>
          }
          path="recruitment-plan/*"
        />
        {/* recruitment-organization */}
        <Route
          element={
            <SuspensedView>
              <RecruitmentOrganizationPage />
            </SuspensedView>
          }
          path="recruitment-organization/*"
        />
        {/* customer-management */}
        <Route
          element={
            <SuspensedView>
              <CustomerPage />
            </SuspensedView>
          }
          path="customer/*"
        />
        {/* hr-management */}
        <Route
          element={
            <SuspensedView>
              <HRPage />
            </SuspensedView>
          }
          path="hr-management/*"
        />

        {/* labor-operation */}
        <Route
          element={
            <SuspensedView>
              <OperateWorker />
            </SuspensedView>
          }
          path="operate-worker/*"
        />

        {/* labor-operation */}
        <Route
          element={
            <SuspensedView>
              <CommunicationPage />
            </SuspensedView>
          }
          path="communication/*"
        />

        {/* account-management */}
        <Route
          element={
            <SuspensedView>
              <div>account-management</div>
            </SuspensedView>
          }
          path="account-management/*"
        />
        {/* worker */}
        <Route
          element={
            <SuspensedView>
              <WorkerPage />
            </SuspensedView>
          }
          path="worker/*"
        />
        {/* worker */}
        <Route element={<AccessDenied />} path="/access-denied" />
        {/* Page Not Found */}
        <Route element={<Navigate to="/error/404" />} path="*" />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--kt-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });

  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
