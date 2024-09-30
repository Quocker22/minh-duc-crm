import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { PageLink, PageTitle } from '@/_metronic/layout/core';
import DetailOperateWorker from '@/modules/operate-worker/components/DetailOperateWorker';
import { OperateWorkerListListWrapper } from '@/modules/operate-worker/components/table/OperateWorkerList';

const OperateWorker = () => {
  const [breadcrumbName, setBreadcrumbName] = useState<string>('');
  const Breadcrumbs: Array<PageLink> = [
    {
      isActive: false,
      isSeparator: false,
      path: '/operate-worker/list',
      title: 'Danh sách quản lý vận hành NLĐ',
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
              <OperateWorkerListListWrapper
                breadcrumbName={(value: string) => setBreadcrumbName(value)}
              />
            </>
          }
          path="list"
        />
      </Route>

      <Route
        element={
          <>
            <DetailOperateWorker />
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

export default OperateWorker;
