/* eslint-disable simple-import-sort/imports */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';
import { Avatar, Badge } from 'antd';

import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { RecruitmentWorkerModel } from '@/models';
import { statusWorker } from '@/modules/recruitment-plan/components/table-list-data/_columns';

function getColumnDef(
  columnResizeMode: ColumnResizeMode = 'onChange'
): ColumnDef<RecruitmentWorkerModel, any>[] {
  const columnHelper = createColumnHelper<RecruitmentWorkerModel>();

  return [
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

    columnHelper.accessor('worker.full_name', {
      cell: ({ row }) => {
        const avatar = row.original.worker?.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div>{row.original.worker?.full_name}</div>

            {row.original.worker.doc_verification_status === 'NOT_VERIFY' ? null : (
              <span className="material-symbols-outlined fs-2 text-success">task_alt</span>
            )}
          </div>
        );
      },
      enableResizing: true,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-300px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Họ tên NLĐ"
        />
      ),
    }),
    columnHelper.accessor('worker.gender', {
      cell: ({ row }) => (row.original.worker.gender === 'MALE' ? 'Nam' : 'Nữ'),
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-80px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Giới tính"
        />
      ),
    }),
    columnHelper.accessor('worker.birthday', {
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-110px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Ngày sinh"
        />
      ),
    }),
    columnHelper.accessor('worker.phone', {
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
    columnHelper.accessor('worker.degree', {
      cell: ({ row }) => row.original.worker.degree?.value,
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-100px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Trình độ"
        />
      ),
    }),

    columnHelper.accessor('recruitment_team_link.team.name', {
      cell: ({ row }) => row.original.recruitment_team_link.team?.name || 'Hệ thống',
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-130px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Nhóm tuyển dụng"
        />
      ),
    }),

    columnHelper.accessor('created_by.name', {
      cell: ({ row }) => {
        const avatar = row.original.created_by.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-2">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div>{row.original.created_by?.name}</div>
          </div>
        );
      },
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Người Quản lý"
        />
      ),
    }),
    columnHelper.accessor('worker_status', {
      cell: ({ row }) => (
        <div className=" w-100 text-center">
          {row.original.worker_status === 'OLD' ? (
            <span>Cũ</span>
          ) : (
            <span className="text-primary">Mới</span>
          )}
        </div>
      ),
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Trạng thái Data"
        />
      ),
    }),
    columnHelper.accessor('worker.recruitment_status.id', {
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
        ) : (
          <Badge
            className="site-badge-count-109"
            count={'Chưa Phân loại'}
            style={{
              backgroundColor: '#B8B8B8',
              color: 'white',
            }}
          />
        ),
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Trạng Thái NLĐ"
        />
      ),
    }),
  ];
}

export { getColumnDef };
