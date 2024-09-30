// eslint-disable-next-line no-restricted-imports
import './WorkerManageTable.css';

import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Badge, Table, TableColumnsType } from 'antd';
import clsx from 'clsx';
import { cloneDeep } from 'lodash-es';
import moment from 'moment';
import React, { useState } from 'react';

import { Button } from '@/components/molecules/Button';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { TableAntd } from '@/components/organisms/TableAntd';
import { LimitOption, QueryState } from '@/models';
import {
  CheckInWorkerInfoModal,
  statusOperationalWorker,
} from '@/modules/operate-worker/components/CheckInWorkerInfoModal';
import { WorkerManageCheckInALLModal } from '@/modules/operate-worker/components/WorkerManageCheckInALLModal';
import { WorkerManageModal } from '@/modules/operate-worker/components/WorkerManageModal';
import { ColWorkerCheckInModel, OperationalStatusOption } from '@/modules/operate-worker/models';
import { getAllDaysInCurrentMonth, getDataCheckInWorker } from '@/modules/operate-worker/utils';
import { WorkerModel, WorkerModelFilterModel } from '@/modules/worker/models';

interface IProps {
  readonly workerList: WorkerModel[];
  readonly globalSearch?: string;
  handleUpdateGlobalSearch?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  readonly isHideEdit?: boolean;
  readonly isLoading?: boolean;
  readonly month?: string;
  readonly onSave?: () => void;
  queryState?: QueryState<WorkerModelFilterModel>;
  updateQueryState?: (updates: Partial<QueryState<WorkerModelFilterModel>>) => void;
}

function isDateDisabled(checkDataDisableKeys: string[], date?: string) {
  return !checkDataDisableKeys.includes(date || '');
}

const WorkerManageTable: React.FC<IProps> = (props: IProps) => {
  const [isVisibleWorkerInfo, setIsVisibleWorkerInfo] = useState(false);
  const [workerId, setWorkerId] = useState<string>('');
  const [visibleFormModal, setVisibleFormModal] = useState<{
    record?: WorkerModel;
    title?: string;
  }>({});
  const [visibleCheckInAllModal, setVisibleCheckInAllModal] = useState(false);

  const isFutureDate = (dateString?: string) => {
    return moment(dateString, 'DD/MM/YYYY').isAfter(moment(), 'day');
  };

  const isDisable = (dateString?: string, worker?: WorkerModel) => {
    return worker?.operational_status.id !== OperationalStatusOption.dangLamViec;
  };

  const expandedRowRender = (record: WorkerModel): JSX.Element => {
    const checkInData = getDataCheckInWorker(record).map((i) => ({ ...i, key: i.check_in }));
    const objCheckIn: { [key: string]: string } = checkInData[0];
    const checkDataDisable = Object.keys(objCheckIn).filter(
      (key) => objCheckIn[key] === 'Đang chờ việc' || objCheckIn[key] === 'Đã nghỉ'
    );

    const logKeysWithNV = (obj: { [key: string]: any }): string | undefined => {
      for (const [key, value] of Object.entries(obj)) {
        if (value === 'NV') {
          return key;
        }
      }
    };

    const checkinNV = logKeysWithNV(checkInData[0]);
    let isNV = false;

    const columns: TableColumnsType<ColWorkerCheckInModel> = [
      {
        align: 'center',
        dataIndex: 'check_in',
        fixed: 'left',
        key: 'check_in',
        title: 'check in',
        width: 140,
      },
      ...getAllDaysInCurrentMonth(props.month).map((i) => {
        const title: { dataIndex?: string } = cloneDeep(i) as { dataIndex?: string };

        if (checkinNV === title.dataIndex) {
          isNV = true;
        }

        const shouldHighlight =
          !isNV &&
          !isFutureDate(title.dataIndex) &&
          !isDisable(title.dataIndex, record) &&
          isDateDisabled(checkDataDisable, title.dataIndex);

        return {
          ...i,
          onHeaderCell: (columns: any) => ({
            onClick: shouldHighlight
              ? () => {
                  setVisibleFormModal({ record, title: columns.dataIndex });
                }
              : undefined,
          }),
          render: (text: string) => {
            const className = shouldHighlight ? 'cell-absent' : 'cell-present';

            return {
              children: text,
              props: {
                className,
              },
            };
          },
          title: (
            <div
              className={clsx('text-center', {
                'cursor-pointer': shouldHighlight,
              })}
            >
              <p className="mb-1">{title.dataIndex}</p>
              {!props.isHideEdit ? (
                shouldHighlight ? (
                  <EditOutlined rev={EditOutlined} />
                ) : null
              ) : (
                <EyeOutlined rev={EyeOutlined} />
              )}
            </div>
          ),
        };
      }),
    ];

    return (
      <Table columns={columns} dataSource={checkInData} pagination={false} scroll={{ x: 3000 }} />
    );
  };

  const columns: TableColumnsType<WorkerModel> = [
    {
      dataIndex: 'full_name',
      fixed: 'left',
      key: 'full_name',
      render: (_, record) => {
        const status = statusOperationalWorker(record.operational_status_id);
        let label = status?.label;
        if (
          status?.label === 'Tự nghỉ' ||
          status?.label === 'Cắt giảm' ||
          status?.label === 'Bị đuổi'
        )
          label = 'Đã nghỉ';

        return (
          <>
            <div
              className="text-start m-0 cursor-pointer"
              onClick={() => {
                setWorkerId(record.id);
                setIsVisibleWorkerInfo(true);
              }}
            >
              <span className="text-primary d-block">{record.full_name}</span>
              <Badge
                className="site-badge-count-109"
                count={label}
                style={{
                  backgroundColor: status?.bgColor,
                  color: status?.textColor,
                }}
              />
              <p className="m-0">{record.code}</p>
              <p className="m-0">{record.phone}</p>
            </div>
          </>
        );
      },
      title: 'Họ và tên NLĐ',
      width: 140,
    },
    {
      align: 'center',
      children: [
        {
          align: 'center',
          dataIndex: 'hcNgay',
          key: 'hcNgay',
          title: 'HC ngày',
          width: 100,
        },
        {
          align: 'center',
          dataIndex: 'hcDem',
          key: 'hcDem',
          title: 'HC đêm',
          width: 100,
        },
      ],
      title: 'Tổng hành chính (HC)',
    },
    {
      children: [
        {
          align: 'center',
          dataIndex: 'tcNgay',
          key: 'tcNgay',
          title: 'TC ngày',
          width: 90,
        },
        {
          align: 'center',
          dataIndex: 'tcTrua',
          key: 'tcTrua',
          title: 'TC trưa',
          width: 90,
        },
        {
          align: 'center',
          dataIndex: 'tcDem',
          key: 'tcDem',
          title: 'TC đêm',
          width: 90,
        },
      ],
      title: 'Tổng tăng ca (TC)',
    },
    {
      children: [
        {
          align: 'center',
          dataIndex: 'cnNgay',
          key: 'cnNgay',
          title: 'CN ngày',
          width: 90,
        },
        {
          align: 'center',
          dataIndex: 'cnDem',
          key: 'cnDem',
          title: 'CN đêm',
          width: 90,
        },
      ],
      title: 'Tổng chủ nhật',
    },
    {
      children: [
        {
          align: 'center',
          dataIndex: 'ngayDiLam',
          key: 'ngayDiLam',
          title: 'Ngày đi làm',
          width: 120,
        },
        {
          align: 'center',
          dataIndex: 'chuNhatLe',
          key: 'chuNhatLe',
          title: 'Chủ nhật, lễ',
          width: 120,
        },
      ],
      title: 'Tổng hợp ngày công',
    },
  ];

  function handleSaved() {
    setVisibleFormModal({});
    setVisibleCheckInAllModal(false);
    props.onSave?.();
  }

  return (
    <>
      <div className="card-header border-0">
        <div className="card-toolbar d-flex">
          <TableGlobalSearch
            onChange={props.handleUpdateGlobalSearch}
            placeholder=" Nhập mã / Tên NLĐ"
            value={props.globalSearch}
          />
        </div>
        <div className="card-toolbar">
          <Button
            className="rounded-pill"
            onClick={() => setVisibleCheckInAllModal(true)}
            title="button-add-customer"
            variant="primary"
          >
            {!props.isHideEdit ? 'Checkin tất cả' : 'Xem tất cả'}
          </Button>
        </div>
      </div>
      <TableAntd
        PaginationOnchange={(page: number, pageSize: number) => {
          props.updateQueryState &&
            props.updateQueryState({
              limit: pageSize as LimitOption,
              page,
            });
        }}
        columns={columns}
        currentPage={props.queryState && props.queryState.page}
        data={props.workerList}
        expandable={{
          expandedRowRender,
          fixed: 'right',
        }}
        isLoading={props.isLoading}
        limit={(props.queryState && props.queryState.limit) || 0}
        scroll={{ x: 0 }}
        sticky={{ offsetHeader: 120 }}
        showSizeChanger
      />

      {!!visibleFormModal.title && (
        <WorkerManageModal
          isHideEdit={props.isHideEdit}
          onHide={() => {
            setVisibleFormModal({});
          }}
          onSaved={handleSaved}
          show={!!visibleFormModal.title}
          workerCheckIn={visibleFormModal}
        />
      )}

      {visibleCheckInAllModal && (
        <WorkerManageCheckInALLModal
          globalSearch={props.globalSearch}
          handleUpdateGlobalSearch={props.handleUpdateGlobalSearch}
          isHideEdit={props.isHideEdit}
          onHide={() => {
            setVisibleCheckInAllModal(false);
          }}
          onSaved={handleSaved}
          queryState={props.queryState}
          show={visibleCheckInAllModal}
          updateQueryState={props.updateQueryState}
          workerList={props.workerList}
        />
      )}

      {isVisibleWorkerInfo && (
        <CheckInWorkerInfoModal
          onHide={() => {
            setIsVisibleWorkerInfo(false);
            setWorkerId('');
            props.onSave?.();
          }}
          onSaved={() => {
            setWorkerId('');
            setIsVisibleWorkerInfo(false);
          }}
          show={isVisibleWorkerInfo}
          workerId={workerId}
          isViewOnly
        />
      )}
    </>
  );
};

export { WorkerManageTable };
