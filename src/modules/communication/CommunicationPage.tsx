/* eslint-disable react/jsx-boolean-value */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable simple-import-sort/imports */
import { PageLink, PageTitle } from '@/_metronic/layout/core';
import CreateFreeSurvey from '@/modules/communication/components/freeSurvey/CreateFreeSurvey';
import DetailFreeSurvey from '@/modules/communication/components/freeSurvey/detail/DetailFreeSurvey';
import CreateSalarySurvey from '@/modules/communication/components/salarySurvey/CreateSalarySurvey';
import DetailSalarySurvey from '@/modules/communication/components/salarySurvey/detail/DetailSalarySurvey';
import SupportWorker from '@/modules/communication/components/supportWorker/SupportWorker';
import { SurveyListWrapper } from '@/modules/communication/components/table/SurveyList';
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

export const ALLOWED_EXTENSIONS = /(\.xls|\.xlsx)$/i;

function CommunicationPage() {
  const [breadcrumbName, setBreadcrumbName] = useState<string>('');
  const BreadcrumbsFreeSurvey: Array<PageLink> = [
    {
      isActive: false,
      isSeparator: false,
      path: '/communication/free-survey/list',
      title: 'Tổ chức khảo sát tự do',
    },
    {
      isActive: false,
      isSeparator: true,
      path: '',
      title: '',
    },
  ];

  const BreadcrumbsSalarySurvey: Array<PageLink> = [
    {
      isActive: false,
      isSeparator: false,
      path: '/communication/salary-survey/list',
      title: 'Tổ chức khảo sát trả lương',
    },
    {
      isActive: false,
      isSeparator: true,
      path: '',
      title: '',
    },
  ];

  const BreadcrumbsWorkerSupport: Array<PageLink> = [
    {
      isActive: false,
      isSeparator: false,
      path: '/communication/worker-support',
      title: 'Hỗ trợ HLĐ',
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
              <PageTitle breadcrumbs={BreadcrumbsFreeSurvey}>
                Danh sách đợt khảo sát tự do
              </PageTitle>
              <SurveyListWrapper isFreeSurvey={true} />
            </>
          }
          path="/free-survey/list"
        />
      </Route>

      <Route
        element={
          <>
            <CreateFreeSurvey />
            <Outlet />
          </>
        }
      >
        <Route
          element={
            <PageTitle breadcrumbs={BreadcrumbsFreeSurvey}>Tạo đợt khảo sát tự do</PageTitle>
          }
          path="/free-survey/create"
        />
      </Route>

      <Route
        element={
          <>
            <CreateSalarySurvey />
            <Outlet />
          </>
        }
      >
        <Route
          element={
            <PageTitle breadcrumbs={BreadcrumbsFreeSurvey}>Tạo đợt khảo sát trả lương</PageTitle>
          }
          path="/salary-survey/create"
        />
      </Route>

      <Route
        element={
          <>
            <DetailFreeSurvey breadcrumbName={(value: string) => setBreadcrumbName(value)} />
            <Outlet />
          </>
        }
      >
        <Route
          element={
            <PageTitle breadcrumbs={BreadcrumbsFreeSurvey}>
              <h6 className="m-0">
                <span className="fs-5 text-muted">Chi tiết đợt khảo sát tự do</span> -{' '}
                {breadcrumbName}
              </h6>
            </PageTitle>
          }
          path="/free-survey/:id"
        />
      </Route>

      <Route element={<Outlet />}>
        <Route
          element={
            <>
              <PageTitle breadcrumbs={BreadcrumbsSalarySurvey}>
                Danh sách đợt khảo sát trả lương
              </PageTitle>
              <SurveyListWrapper isFreeSurvey={false} />
            </>
          }
          path="/salary-survey/list"
        />
      </Route>

      <Route
        element={
          <>
            <DetailSalarySurvey breadcrumbName={(value: string) => setBreadcrumbName(value)} />
            <Outlet />
          </>
        }
      >
        <Route
          element={
            <PageTitle breadcrumbs={BreadcrumbsSalarySurvey}>
              <h6 className="m-0">
                <span className="fs-5 text-muted">Chi tiết đợt khảo sát trả lương</span> -{' '}
                {breadcrumbName}
              </h6>
            </PageTitle>
          }
          path="/salary-survey/:id"
        />
      </Route>

      <Route element={<Outlet />}>
        <Route
          element={
            <>
              <PageTitle breadcrumbs={BreadcrumbsWorkerSupport}>Hỗ trợ NLĐ</PageTitle>
              <SupportWorker />
            </>
          }
          path="/worker-support"
        />
      </Route>
    </Routes>
  );
}

export default CommunicationPage;
