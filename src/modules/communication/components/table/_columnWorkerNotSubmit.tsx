/* eslint-disable simple-import-sort/imports */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';

import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { WorkerModel } from '@/modules/worker/models';
import { Avatar } from 'antd';

function getColumnWorkerNotSubmitDef(
  columnResizeMode: ColumnResizeMode = 'onChange',
  queryState: any
): ColumnDef<WorkerModel, any>[] {
  const columnHelper = createColumnHelper<WorkerModel>();

  return [
    columnHelper.accessor('index', {
      cell: ({ row }) => {
        return (
          <p className="text-center">
            {queryState?.page * queryState?.limit - queryState?.limit + row.index + 1}
          </p>
        );
      },
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-50px text-center"
          columnResizeMode={columnResizeMode}
          header={header}
          title="STT"
        />
      ),
    }),
    columnHelper.accessor('code', {
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Mã NLĐ"
        />
      ),
    }),

    columnHelper.accessor('full_name', {
      cell: ({ row }) => {
        const avatar = defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px' }}>{row.original.full_name}</div>
          </div>
        );
      },
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-180px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Họ tên NLĐ"
        />
      ),
    }),
    columnHelper.accessor('phone', {
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Số điện thoại"
        />
      ),
    }),
  ];
}

export { getColumnWorkerNotSubmitDef };
