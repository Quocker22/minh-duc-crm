/* eslint-disable simple-import-sort/imports */
import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';

import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { RecruitmentWorkerModel } from '@/models';
import { getClientDateTime } from '@/utils';
import { Avatar, Badge } from 'antd';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { statusWorker } from '@/modules/recruitment-plan/components/table-list-data/_columns';

function getColumnDef(
  columnResizeMode: ColumnResizeMode = 'onChange'
): ColumnDef<RecruitmentWorkerModel, any>[] {
  const columnHelper = createColumnHelper<RecruitmentWorkerModel>();

  return [
    columnHelper.accessor('id', {
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-50px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="STT"
        />
      ),
    }),

    columnHelper.accessor('worker.code', {
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

    columnHelper.accessor('deleted_at', {
      cell: ({ row }) => getClientDateTime(row.original.deleted_at),
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Ngày gỡ"
        />
      ),
    }),

    columnHelper.accessor('worker.full_name', {
      cell: ({ row }) => {
        const avatar = row.original.worker?.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px' }}>{row.original.worker?.full_name}</div>
          </div>
        );
      },
      enableResizing: true,
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

    columnHelper.accessor('deleted_by.name', {
      cell: ({ row }) => {
        const avatar = row.original.deleted_by?.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px' }}>{row.original.deleted_by?.name}</div>
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
          title="Người gỡ"
        />
      ),
    }),

    columnHelper.accessor('worker.doc_verification_status', {
      cell: ({ row }) =>
        row.original.worker.recruitment_status.id ? (
          <Badge
            className="site-badge-count-109"
            count={statusWorker(row.original.worker.recruitment_status.id)?.label}
            style={{
              backgroundColor: statusWorker(row.original.worker.recruitment_status.id)?.bgColor,
              color: statusWorker(row.original.worker.recruitment_status.id)?.textColor,
            }}
          />
        ) : null,
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Trạng Thái người lao động"
        />
      ),
    }),
  ];
}

export { getColumnDef };
