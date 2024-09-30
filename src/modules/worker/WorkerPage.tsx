import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { PageLink, PageTitle } from '@/_metronic/layout/core';
import { DetailWorker } from '@/modules/worker/components/DetailWorker';
import { WorkerListWrapper } from '@/modules/worker/components/table/WorkerList';

const WorkerPage = () => {
  const [breadcrumbName, setBreadcrumbName] = useState<string>('');
  const Breadcrumbs: Array<PageLink> = [
    {
      isActive: false,
      isSeparator: false,
      path: '/worker/list',
      title: 'Danh sách NLĐ',
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
              <WorkerListWrapper />
            </>
          }
          path="list"
        />
      </Route>

      <Route
        element={
          <>
            <DetailWorker breadcrumbName={(value: string) => setBreadcrumbName(value)} />
            <Outlet />
          </>
        }
      >
        <Route
          element={
            <PageTitle breadcrumbs={Breadcrumbs}>
              <h6 className="m-0">
                <span className="fs-5 text-muted">Chi tiết NLĐ</span> - {breadcrumbName}
              </h6>
            </PageTitle>
          }
          path="/:id"
        />
      </Route>
    </Routes>
  );
};

export default WorkerPage;
