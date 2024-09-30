/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { Button } from '@/components/molecules/Button';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useGetUnSubmitWorkers } from '@/modules/communication/hooks/useGetUnSubmitWorkers';
import { FormSurveyModel } from '@/modules/communication/models';
import { DataListFilterModel } from '@/modules/recruitment-plan/models';
import { WorkerModel } from '@/modules/worker/models';
import { history } from '@/utils';
import { Avatar, Spin, Table, TableColumnsType, TablePaginationConfig } from 'antd';
import { Fragment } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface Props {
  formMethods: UseFormReturn<FormSurveyModel, object>;
  totalWorkers: number;
}

function TabWorkerUnSubmited({ formMethods, totalWorkers }: Props) {
  const { id } = useParams();
  const statusValue = formMethods.getValues('status');
  const isEnableFetching = Boolean(statusValue === 'END' || statusValue === 'WORKING');
  const { queryState, updateQueryState, queryString } = useQueryRequest<DataListFilterModel>(
    {},
    () => undefined,
    false
  );

  const {
    isFetching,
    isLoading,
    data: workerList,
  } = useGetUnSubmitWorkers(id as string, queryString, {
    enabled: isEnableFetching,
  });

  const dataSource = workerList?.rows.map((worker) => ({ ...worker, key: worker.id }));

  const columns: TableColumnsType<WorkerModel> = [
    {
      align: 'center',
      dataIndex: 'index',
      title: 'STT',
      render(value, record, index) {
        return <span>{queryState.page * queryState.limit - queryState.limit + index + 1}</span>;
      },
    },
    {
      dataIndex: 'code',
      title: 'Mã NLĐ',
    },
    {
      dataIndex: 'full_name',
      render(_, record) {
        const avatar = record.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1 }}>{record.full_name}</div>
          </div>
        );
      },
      title: 'Tên NLĐ',
    },
    {
      dataIndex: 'phone',
      title: 'Số điện thoại',
    },
  ];

  const handleChangePagination = ({ current, pageSize }: TablePaginationConfig) => {
    updateQueryState({
      limit: pageSize as any,
      page: current,
    });
  };

  return (
    <Fragment>
      {isEnableFetching ? (
        <KTCard>
          <Spin spinning={isFetching || isLoading}>
            <KTCardBody className="py-4">
              <div className="my-4">
                <span style={{ fontWeight: 'bold' }}>
                  Chưa nộp / Tổng người nhận: {workerList?.total_rows || 0}/{totalWorkers}
                </span>
              </div>

              <Table
                columns={columns}
                dataSource={dataSource}
                onChange={handleChangePagination}
                pagination={{
                  current: queryState.page,
                  pageSize: queryState.limit,
                  total: workerList?.total_rows,
                }}
              />
            </KTCardBody>

            <div className="d-flex justify-content-end mt-4">
              <Button
                className="me-3 rounded-pill py-1 px-6"
                onClick={() => history.push(`list`)}
                variant="outline"
              >
                Đóng
              </Button>
              <Button className="rounded-pill py-1 px-6" variant="primary">
                Export EXCEL
              </Button>
            </div>
          </Spin>
        </KTCard>
      ) : null}
    </Fragment>
  );
}

export default TabWorkerUnSubmited;
