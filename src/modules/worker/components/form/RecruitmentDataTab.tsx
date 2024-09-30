/* eslint-disable prettier/prettier */
/* eslint-disable newline-before-return */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
import { FC, Fragment } from 'react';
import { UseFormReturn } from 'react-hook-form';

import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { useGetWorkerFilterHistoriesPlan } from '@/modules/worker/hooks/useGetWorkerFilterHistoriesPlan';
import {
  FormWorkerModel,
  STATUS_OPTION,
  StatusOption,
  WorkerFilterHistoriesPlanModel,
} from '@/modules/worker/models';
import { Avatar, Badge, TableColumnsType, Table, Button } from 'antd';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWorkerDetail } from '@/modules/worker/hooks/useGetWorkerDetail';

interface IProps {
  formMethods: UseFormReturn<FormWorkerModel, object>;
}

const statusWorker = (status: any) => {
  if (!status) {
    return {
      bgColor: '#B8B8B8',
      label: 'Chưa phân loại',
      textColor: 'white',
      value: StatusOption.trangThai01,
    };
  }

  return STATUS_OPTION.find((item) => item.value === status);
};

const RecruitmentDataTab: FC<IProps> = () => {
  const status = true;
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isFetchedAfterMount,
    data: historiesPlan,
    isLoading,
  } = useGetWorkerFilterHistoriesPlan(id);

  const { data: workerDetail } = useGetWorkerDetail(id as string);

  const columns: TableColumnsType<WorkerFilterHistoriesPlanModel> = [
    {
      align: 'center',
      dataIndex: 'stt',
      render(_, record, index) {
        return <span>{index + 1}</span>;
      },
      title: 'STT',
      width: 100,
    },
    {
      dataIndex: 'name',
      render(_, record) {
        return <span style={{ color: '#0734C5' }}>{record.name}</span>;
      },
      title: 'Tên chiến dịch tuyển dụng',
      width: 150,
    },
    {
      dataIndex: 'customer.name',
      render(_, record) {
        const avatar = record.customer?.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1 }}>{record.customer?.name}</div>
          </div>
        );
      },
      title: 'Tên công ty',
      width: 500,
    },
    {
      dataIndex: 'start_date',
      render(_, record) {
        return (
          <div>
            <span>{moment(record.start_date).format('DD/MM/YYYY')}</span>
          </div>
        );
      },
      title: 'Thời gian',
      width: 100,
    },
  ];

  return (
    <>
      {isFetchedAfterMount && historiesPlan && historiesPlan.length ? (
        <Fragment>
          <div className="row card-body">
            <div
              className="col-12 mx-2"
              style={{ backgroundColor: '#F2F4F6', borderRadius: '1.5rem' }}
            >
              {status ? (
                <div className="p-5">
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <span className="mb-0">Chiến dịch tuyển dụng đang tham gia</span>
                    </div>
                    <div className="col-sm-9">
                      <span
                        className="mb-0"
                        style={{
                          color: '#0734C5',
                          textDecoration: 'underline',
                        }}
                      >
                        {historiesPlan[0].name}
                      </span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <span className="mb-0">Tên công ty</span>
                    </div>

                    <div className="col-sm-9">
                      <span className="mb-0">{historiesPlan[0].customer.name}</span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <span className="mb-0">Trạng thái tuyển dụng</span>
                    </div>
                    <div className="col-sm-9">
                      <Badge
                        className="site-badge-count-109"
                        count={statusWorker(workerDetail?.recruitment_status_id)?.label}
                        style={{
                          backgroundColor: statusWorker(workerDetail?.recruitment_status_id)
                            ?.bgColor,
                          color: statusWorker(workerDetail?.recruitment_status_id)?.textColor,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5">Đang không thuộc chiến dịch tuyển dụng nào !</div>
              )}
            </div>

            <div className="my-4">
              <span style={{ color: '#354052' }}>
                Danh sách các chiến dịch đã từng tham gia (
                {historiesPlan.filter((_, index) => index !== 0).length})
              </span>
            </div>

            <div className="col-12">
              <Table
                columns={columns}
                dataSource={historiesPlan.filter((_, index) => index !== 0)}
                loading={isLoading}
                pagination={false}
                scroll={{ x: 100, y: 500 }}
              />
            </div>
          </div>
        </Fragment>
      ) : isFetchedAfterMount && (!historiesPlan || !historiesPlan.length) ? (
        <div>Đang không thuộc chiến dịch tuyển dụng nào</div>
      ) : null}

      {isFetchedAfterMount && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => navigate('/worker/list', { replace: true })}
            style={{
              borderRadius: '1.5rem',
            }}
            type="default"
          >
            Đóng
          </Button>
        </div>
      )}
    </>
  );
};

export { RecruitmentDataTab };
