/* eslint-disable lines-around-comment */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';

import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { STATUS_OPTION, StatusOption, WorkerModel } from '@/modules/worker/models';
import { Avatar, Badge } from 'antd';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import moment from 'moment';

const statusWorker = (status?: StatusOption) => {
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

function getColumnDef(
  columnResizeMode: ColumnResizeMode = 'onChange'
): ColumnDef<WorkerModel, any>[] {
  const columnHelper = createColumnHelper<WorkerModel>();

  return [
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

    columnHelper.accessor('created_at', {
      cell: ({ row }) =>
        row.original.created_at ? moment(row.original.created_at).format('DD/MM/YYYY') : null,
      enableSorting: false,
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-110px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Ngày tạo"
        />
      ),
    }),

    columnHelper.accessor('full_name', {
      cell: ({ row }) => {
        const avatar = row.original.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px', whiteSpace: 'normal' }}>
              {row.original.full_name}
            </div>
          </div>
        );
      },
      enableResizing: true,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Họ tên NLĐ"
        />
      ),
    }),
    columnHelper.accessor('gender', {
      cell: ({ row }) => (row.original.gender === 'MALE' ? 'Nam' : 'Nữ'),
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
    columnHelper.accessor('birthday', {
      cell: ({ row }) =>
        row.original.birthday ? moment(row.original.birthday).format('DD/MM/YYYY') : null,
      enableSorting: false,
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-110px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Ngày sinh"
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
    columnHelper.accessor('degree', {
      cell: ({ row }) => row.original.degree?.value,
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
    columnHelper.accessor('doc_verification_status', {
      cell: ({ row }) =>
        row.original.doc_verification_status === 'NOT_VERIFY' ? (
          'Chưa xác thực'
        ) : (
          <span className="text-primary">Đã xác thực</span>
        ),
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-130px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Xác thực hồ sơ"
        />
      ),
    }),

    columnHelper.accessor('recruitment_status', {
      cell: ({ row }) => {
        return (
          <Badge
            className="site-badge-count-109"
            count={statusWorker(row.original.recruitment_status?.id)?.label}
            style={{
              backgroundColor: statusWorker(row.original.recruitment_status?.id)?.bgColor,
              color: statusWorker(row.original.recruitment_status?.id)?.textColor,
            }}
          />
        );
      },
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-120px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Trạng thái chung"
        />
      ),
    }),
    columnHelper.accessor('status', {
      cell: ({ row }) => (
        <TableTagCell
          className="py-1 px-5 rounded-pill fs-6"
          color={row.original.status === 'ACTIVE' ? 'success' : 'secondary'}
        >
          {row.original.status === 'ACTIVE' ? 'Đang hoạt động' : 'Đã dừng'}
        </TableTagCell>
      ),
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Trạng thái tài khoản"
        />
      ),
    }),

    columnHelper.accessor('manager.name', {
      cell: ({ row }) => {
        const avatar = row.original.manager?.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px', whiteSpace: 'normal' }}>
              {row.original.manager?.name}
            </div>
          </div>
        );
      },
      enableResizing: true,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Người quản lý"
        />
      ),
    }),

    columnHelper.accessor('creator.name', {
      cell: ({ row }) => {
        const avatar = row.original.creator.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px', whiteSpace: 'normal' }}>
              {row.original.creator.name}
            </div>
          </div>
        );
      },
      enableResizing: true,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Người tạo"
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
  ];
}

export { getColumnDef };
