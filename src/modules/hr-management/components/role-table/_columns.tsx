import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';

import { Image } from '@/components/molecules/Image';
import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { DateTimeFormat } from '@/constants';
import { RoleModel } from '@/modules/hr-management/models';
import { getClientDate } from '@/utils';

function getColumnDef(
  columnResizeMode: ColumnResizeMode = 'onChange'
): ColumnDef<RoleModel, any>[] {
  const columnHelper = createColumnHelper<RoleModel>();

  return [
    columnHelper.accessor('id', {
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-30px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="STT"
        />
      ),
    }),
    columnHelper.accessor('name', {
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-290px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Tên vai trò"
        />
      ),
    }),
    columnHelper.accessor('creator.name', {
      cell: ({ row }) => (
        <div className="d-flex">
          <Image height={35} src={row.original.creator.avatar} width={35} isImageRoundedCircle />
          <h6 className="text-primary ps-2 pt-2">{row.original.creator.name}</h6>
        </div>
      ),
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
    columnHelper.accessor('created_at', {
      cell: ({ getValue }) => getClientDate(getValue(), DateTimeFormat.be_full_date_time),
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Ngày tạo"
        />
      ),
    }),
  ];
}

export { getColumnDef };
