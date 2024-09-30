/* eslint-disable react/jsx-sort-props */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable simple-import-sort/imports */
import React from 'react';
import { WorkerModel, WorkerModelFilterModel } from '@/modules/worker/models';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { getClientDate } from '@/utils';
import { TableColumnsType } from 'antd';
import { TableAntd } from '@/components/organisms/TableAntd';
import { LimitOption, PaginationResponse, QueryState } from '@/models';

interface IProps {
  readonly data: PaginationResponse<WorkerModel[]> | undefined;
  readonly globalSearch?: string;
  handleUpdateGlobalSearch?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  readonly isHideEdit?: boolean;
  readonly isLoading?: boolean;
  readonly onSave?: () => void;
  queryState?: QueryState<WorkerModelFilterModel>;
  updateQueryState?: (updates: Partial<QueryState<WorkerModelFilterModel>>) => void;
}

const TookBreakWorker: React.FC<IProps> = (props: IProps) => {
  const columns: TableColumnsType<WorkerModel> = [
    {
      dataIndex: 'key',
      key: 'stt',
      render: (_: any, record: WorkerModel, index: number) => index + 1,
      title: 'STT',
      width: '50px',
    },
    {
      dataIndex: 'code',
      title: 'Mã NLĐ',
      width: '100px',
    },
    {
      dataIndex: 'full_name',
      title: 'Họ và tên NLĐ',
      width: '180px',
    },
    {
      dataIndex: 'id_number',
      title: 'CMND',
      width: '180px',
    },
    {
      dataIndex: 'gender',
      title: 'Giới tính',
      width: '80px',
    },
    {
      align: 'center',
      dataIndex: 'birthday',
      title: 'Ngày sinh',
      width: '120px',
    },
    {
      dataIndex: 'created_at',
      render: (_: any, record: WorkerModel, index: number) => getClientDate(record.created_at),
      title: 'Ngày vào làm',
      width: '120px',
    },
    {
      dataIndex: 'created_at',
      render: (_: any, record: WorkerModel, index: number) => getClientDate(record.created_at),
      title: 'Ngày nghỉ',
      width: '120px',
    },
  ];

  return (
    <>
      <div className="card-header border-0">
        <div className="card-toolbar d-flex">
          <TableGlobalSearch
            onChange={props.handleUpdateGlobalSearch}
            placeholder="Tên nhóm / Tên trưởng nhóm"
            value={props.globalSearch}
          />
        </div>
      </div>

      <TableAntd
        columns={columns}
        data={props.data?.rows || []}
        isLoading={props.isLoading}
        PaginationOnchange={(page: number, pageSize: number) => {
          props.updateQueryState?.({
            limit: pageSize as LimitOption,
            page,
          });
        }}
        limit={props.queryState?.limit}
        currentPage={props.queryState?.page}
        total={props.data?.total_rows}
        showSizeChanger
      />
    </>
  );
};

export { TookBreakWorker };
