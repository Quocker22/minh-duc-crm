import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@/_metronic/layout/components/ProtectedRoute';
import { PageLink, PageTitle } from '@/_metronic/layout/core';
import CreateHR from '@/modules/hr-management/components/CreateHR';
import DetailHR from '@/modules/hr-management/components/DetailHR';
import { DetailRecruitmentTeams } from '@/modules/hr-management/components/DetailRecruitmentTeams';
import { RecruitmentTeamsListWrapper } from '@/modules/hr-management/components/recruitment-teams-table/RecruitmentTeamsList';
import { RoleListWrapper } from '@/modules/hr-management/components/role-table/RoleList';
import { HRListWrapper } from '@/modules/hr-management/components/table/HRList';
import { HRRole } from '@/modules/hr-management/models';
import { trans } from '@/utils';

const HRPage = () => {
  const [breadcrumbName, setBreadcrumbName] = useState<string>('');
  const Breadcrumbs: Array<PageLink> = [
    {
      isActive: false,
      isSeparator: false,
      path: '/hr-management/management/list',
      title: trans('MENU.HR_MANAGEMENT'),
    },
    {
      isActive: false,
      isSeparator: true,
      path: '',
      title: '',
    },
  ];

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          element={
            <ProtectedRoute roles={[HRRole.admin, HRRole.owner, HRRole.member]}>
              <>
                <PageTitle breadcrumbs={Breadcrumbs}>{trans('MENU.HR_MANAGEMENT.LIST')}</PageTitle>
                <HRListWrapper />
              </>
            </ProtectedRoute>
          }
          path="management/list"
        />
      </Route>
      <Route
        element={
          <ProtectedRoute roles={[HRRole.admin, HRRole.member, HRRole.owner]}>
            <>
              <PageTitle breadcrumbs={Breadcrumbs}>Nhóm chức năng</PageTitle>
            </>
          </ProtectedRoute>
        }
        path="role-group"
      />
      <Route
        element={
          <ProtectedRoute roles={[HRRole.admin, HRRole.owner]}>
            <>
              <CreateHR />
              <Outlet />
            </>
          </ProtectedRoute>
        }
      >
        <Route
          element={
            <PageTitle breadcrumbs={Breadcrumbs}>{trans('MENU.HR_MANAGEMENT.CREATE')}</PageTitle>
          }
          path="create"
        />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={[HRRole.admin, HRRole.owner, HRRole.member]}>
            <>
              <DetailHR breadcrumbName={(value: string) => setBreadcrumbName(value)} />
              <Outlet />
            </>
          </ProtectedRoute>
        }
      >
        <Route
          element={
            <PageTitle breadcrumbs={Breadcrumbs}>
              <h6 className="m-0">
                <span className="fs-5 text-muted">Chi tiết nhân sự</span> - {breadcrumbName}
              </h6>
            </PageTitle>
          }
          path="management/:id"
        />
      </Route>

      <Route element={<Outlet />}>
        <Route
          element={
            <ProtectedRoute roles={[HRRole.admin, HRRole.member, HRRole.owner]}>
              <>
                <PageTitle breadcrumbs={Breadcrumbs}>Danh sách quyền</PageTitle>
                <RoleListWrapper />
              </>
            </ProtectedRoute>
          }
          path="role-list"
        />
      </Route>

      <Route element={<Outlet />}>
        <Route
          element={
            <ProtectedRoute roles={[HRRole.admin, HRRole.member, HRRole.owner]}>
              <>
                <PageTitle breadcrumbs={Breadcrumbs}>Danh sách nhóm tuyển dụng</PageTitle>
                <RecruitmentTeamsListWrapper />
              </>
            </ProtectedRoute>
          }
          path="recruitment-teams"
        />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={[HRRole.admin, HRRole.member, HRRole.owner]}>
            <>
              <DetailRecruitmentTeams
                breadcrumbName={(value: string) => setBreadcrumbName(value)}
              />
              <Outlet />
            </>
          </ProtectedRoute>
        }
      >
        <Route
          element={
            <PageTitle breadcrumbs={Breadcrumbs}>
              <h6 className="m-0">
                <span className="fs-5 text-muted">Chi tiết nhóm tuyển dụng</span> - {breadcrumbName}
              </h6>
            </PageTitle>
          }
          path="recruitment-teams/detail/:id"
        />
      </Route>
    </Routes>
  );
};

export default HRPage;
