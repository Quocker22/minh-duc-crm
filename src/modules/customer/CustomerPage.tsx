import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { PageLink, PageTitle } from '@/_metronic/layout/core';
import DetailCustomer from '@/modules/customer/components/DetailCustomer';
import { CustomerListWrapper } from '@/modules/customer/components/table/CustomerList';
import { trans } from '@/utils';

const CustomerPage = () => {
  const [breadcrumbName, setBreadcrumbName] = useState<string>('');
  const Breadcrumbs: Array<PageLink> = [
    {
      isActive: false,
      isSeparator: false,
      path: '/customer/list',
      title: trans('MENU.CUSTOMER'),
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
              <PageTitle breadcrumbs={Breadcrumbs}>{trans('MENU.CUSTOMER.LIST')}</PageTitle>
              <CustomerListWrapper />
            </>
          }
          path="list"
        />
      </Route>

      <Route
        element={
          <>
            <DetailCustomer breadcrumbName={(value: string) => setBreadcrumbName(value)} />
            <Outlet />
          </>
        }
      >
        <Route
          element={
            <PageTitle breadcrumbs={Breadcrumbs}>
              <h6 className="m-0">
                <span className="fs-5 text-muted">Chi tiết khách hàng</span> - {breadcrumbName}
              </h6>
            </PageTitle>
          }
          path=":id"
        />
      </Route>
    </Routes>
  );
};

export default CustomerPage;
