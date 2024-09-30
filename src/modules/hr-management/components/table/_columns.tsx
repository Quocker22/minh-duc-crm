/* eslint-disable simple-import-sort/imports */
import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';
import { Avatar } from 'antd';

import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { DateTimeFormat } from '@/constants';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { HRModel, HRStatus } from '@/modules/hr-management/models';
import { getClientDateTime, getHRRoleColor, trans } from '@/utils';
import defaultAvatar from '@/assets/images/defaultAvatar.png';

function getColumnDef(columnResizeMode: ColumnResizeMode = 'onChange'): ColumnDef<HRModel, any>[] {
  const columnHelper = createColumnHelper<HRModel>();

  return [
    columnHelper.accessor('code', {
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-290px"
          columnResizeMode={columnResizeMode}
          header={header}
          title={trans('TABLE.HR_MANAGEMENT.COLUMN.CODE')}
        />
      ),
    }),
    columnHelper.accessor('name', {
      cell: ({ row }) => {
        const avatar = row.original.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px' }}>{row.original.name}</div>
          </div>
        );
      },
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-350px"
          header={header}
          title={trans('TABLE.HR_MANAGEMENT.COLUMN.FULL_NAME')}
        />
      ),
    }),
    columnHelper.accessor('phone', {
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-125px"
          columnResizeMode={columnResizeMode}
          header={header}
          title={trans('TABLE.HR_MANAGEMENT.COLUMN.PHONE_NUMBER')}
        />
      ),
    }),
    columnHelper.accessor('email', {
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title={trans('TABLE.HR_MANAGEMENT.COLUMN.EMAIL')}
        />
      ),
    }),
    columnHelper.accessor('account_type', {
      cell: ({ row }) => {
        const roleColor = getHRRoleColor(row.original.account_type);

        return (
          <div className="text-center">
            <TableTagCell className="py-1 px-5 rounded-pill fs-6" color={roleColor?.color}>
              {roleColor?.role}
            </TableTagCell>
          </div>
        );
      },
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-110px"
          columnResizeMode={columnResizeMode}
          header={header}
          title={trans('TABLE.HR_MANAGEMENT.COLUMN.ACC_TYPE')}
        />
      ),
    }),
    columnHelper.accessor('created_at', {
      cell: ({ getValue }) => getClientDateTime(getValue(), DateTimeFormat.be_full_date_time),
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title={trans('TABLE.HR_MANAGEMENT.COLUMN.CREATE_AT')}
        />
      ),
    }),
    columnHelper.accessor('status', {
      cell: ({ row }) => (
        <TableTagCell
          className="py-1 px-5 rounded-pill fs-6"
          color={row.original.status === HRStatus.active ? 'success' : 'secondary'}
        >
          {row.original.status === HRStatus.active ? 'Đang hoạt động' : 'Dừng hoạt động'}
        </TableTagCell>
      ),
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title={trans('TABLE.HR_MANAGEMENT.COLUMN.STATUS')}
        />
      ),
    }),
  ];
}

export { getColumnDef };
