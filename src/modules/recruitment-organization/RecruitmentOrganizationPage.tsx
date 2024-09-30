import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { PageLink, PageTitle } from '@/_metronic/layout/core';
import DetailRecruitment from '@/modules/recruitment-organization/components/DetailRecruitment';
import { RecruitmentListWrapper } from '@/modules/recruitment-organization/components/table/RecruitmentList';

const RecruitmentOrganizationPage = () => {
  const [breadcrumbName, setBreadcrumbName] = useState<string>('');
  const Breadcrumbs: Array<PageLink> = [
    {
      isActive: false,
      isSeparator: false,
      path: '/recruitment-organization/list',
      title: 'Danh sách chiến dịch tuyển dụng',
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
            <>
              <PageTitle breadcrumbs={Breadcrumbs} />
              <RecruitmentListWrapper />
            </>
          }
          path="list"
        />
      </Route>

      <Route
        element={
          <>
            <DetailRecruitment breadcrumbName={(value: string) => setBreadcrumbName(value)} />
            <Outlet />
          </>
        }
      >
        <Route
          element={
            <PageTitle breadcrumbs={Breadcrumbs}>
              <h6 className="m-0">
                <span className="fs-5 text-muted">Chi tiết chiến dịch tuyển dụng</span> -{' '}
                {breadcrumbName}
              </h6>
            </PageTitle>
          }
          path=":id"
        />
      </Route>
    </Routes>
  );
};

export default RecruitmentOrganizationPage;
