/* eslint-disable simple-import-sort/imports */
import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';

import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { DateTimeFormat } from '@/constants';
import { RecruitmentPlanModel } from '@/modules/recruitment-plan/models';
import { getRecruitmentStatus } from '@/modules/recruitment-plan/utils';
import { getTimeFormat } from '@/utils';
import { Avatar } from 'antd';

function getColumnDef(
  columnResizeMode: ColumnResizeMode = 'onChange'
): ColumnDef<RecruitmentPlanModel, any>[] {
  const columnHelper = createColumnHelper<RecruitmentPlanModel>();

  return [
    columnHelper.accessor('code', {
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Mã chiến dịch"
        />
      ),
    }),

    columnHelper.accessor('name', {
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-300px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Tên chiến dịch "
        />
      ),
    }),
    columnHelper.accessor('customer.name', {
      cell: ({ row }) => {
        const avatar = row.original.customer?.avatar || defaultAvatar;

        return row.original.customer?.name ? (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px' }}>{row.original.customer?.name}</div>
          </div>
        ) : null;
      },

      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-300px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Tên khách hàng"
        />
      ),
    }),
    columnHelper.accessor('quantity', {
      cell: ({ row }) => (
        <div>
          {row.original.num_of_added_data} / {row.original.quantity} người
        </div>
      ),
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Kết quả"
        />
      ),
    }),
    columnHelper.accessor('start_date', {
      cell: ({ row }) => {
        return `${getTimeFormat(
          row.original.start_date,
          DateTimeFormat.fe_date_2
        )} - ${getTimeFormat(row.original.end_date, DateTimeFormat.fe_date_2)}`;
      },
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Bắt đầu - kết thúc"
        />
      ),
    }),
    columnHelper.accessor('end_date', {
      cell: ({ row }) =>
        `${moment(row.original.end_date).diff(moment(row.original.start_date), 'days')} ngày`,
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-90px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Số ngày"
        />
      ),
    }),
    columnHelper.accessor('status', {
      cell: ({ row }) => (
        <TableTagCell
          className="py-1 px-5 rounded-pill fs-6"
          color={getRecruitmentStatus(row.original.status)?.color}
        >
          {getRecruitmentStatus(row.original.status)?.status}
        </TableTagCell>
      ),
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Trạng Thái"
        />
      ),
    }),
  ];
}

export { getColumnDef };
