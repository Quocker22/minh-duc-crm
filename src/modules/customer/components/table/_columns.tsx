/* eslint-disable simple-import-sort/imports */
import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';

import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { DateTimeFormat } from '@/constants';
import { CustomerModel, CustomerStatus } from '@/modules/customer/models';
import { getClientDate, trans } from '@/utils';
import { Avatar } from 'antd';

function getColumnDef(
  columnResizeMode: ColumnResizeMode = 'onChange'
): ColumnDef<CustomerModel, any>[] {
  const columnHelper = createColumnHelper<CustomerModel>();

  return [
    columnHelper.accessor('code', {
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Mã khách hàng"
        />
      ),
    }),
    columnHelper.accessor('name', {
      cell: ({ row }) => {
        const avatar = row.original.avatar || defaultAvatar;

        return row.original.name ? (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px' }}>{row.original.name}</div>
          </div>
        ) : null;
      },
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-250px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Tên khách hàng"
        />
      ),
    }),
    columnHelper.accessor('phone', {
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
    columnHelper.accessor('address', {
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-300px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Địa chỉ"
        />
      ),
    }),
    columnHelper.accessor('num_of_target', {
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Số chỉ tiêu đang tuyển"
        />
      ),
    }),
    columnHelper.accessor('num_of_worker', {
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Số NLĐ đang làm"
        />
      ),
    }),
    columnHelper.accessor('created_at', {
      cell: ({ getValue }) => getClientDate(getValue(), DateTimeFormat.fe_date),
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Ngày tạo"
        />
      ),
    }),
    columnHelper.accessor('status', {
      cell: ({ row }) => (
        <TableTagCell
          className="py-1 px-5 rounded-pill fs-6"
          color={row.original.status === CustomerStatus.active ? 'success' : 'secondary'}
        >
          {row.original.status === CustomerStatus.active ? 'Đang hoạt động' : 'Dừng hoạt động'}
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
