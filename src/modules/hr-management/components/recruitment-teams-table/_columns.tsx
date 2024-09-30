/* eslint-disable simple-import-sort/imports */
import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';

import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { DateTimeFormat } from '@/constants';
import { RecruitmentTeamsModel } from '@/modules/hr-management/models';
import { getClientDateTime } from '@/utils';
import { Avatar } from 'antd';
import defaultAvatar from '@/assets/images/defaultAvatar.png';

function getColumnDef(
  columnResizeMode: ColumnResizeMode = 'onChange'
): ColumnDef<RecruitmentTeamsModel, any>[] {
  const columnHelper = createColumnHelper<RecruitmentTeamsModel>();

  return [
    columnHelper.accessor('created_at', {
      cell: ({ getValue }) => getClientDateTime(getValue(), DateTimeFormat.be_full_date_time),
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-100px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Ngày tạo"
        />
      ),
    }),
    columnHelper.accessor('code', {
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-50px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Mã nhóm"
        />
      ),
    }),
    columnHelper.accessor('name', {
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-100px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Tên nhóm tuyển dụng"
        />
      ),
    }),
    columnHelper.accessor('leader', {
      cell: ({ row }) => {
        const avatar = row.original.leader?.avatar || defaultAvatar;

        return (
          <>
            {(row.original.member?.length || 0) > 0 && (
              <div className="d-flex items-center gap-3">
                <Avatar src={avatar} style={{ flexShrink: 0 }} />
                <div style={{ flexGrow: 1, width: '120px' }}>{row.original.leader?.name}</div>
              </div>
            )}
          </>
        );
      },
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-125px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Trưởng nhóm"
        />
      ),
    }),

    columnHelper.accessor('member', {
      cell: ({ row }) => row.original.member?.length,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-125px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Số lượng thành viên"
        />
      ),
    }),

    columnHelper.accessor('creator', {
      cell: ({ row }) => {
        const avatar = row.original.creator?.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            {row.original.creator?.name ? <Avatar src={avatar} style={{ flexShrink: 0 }} /> : null}
            <div style={{ flexGrow: 1, width: '120px' }}>{row.original.creator?.name}</div>
          </div>
        );
      },
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-125px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Người tạo"
        />
      ),
    }),
  ];
}

export { getColumnDef };
