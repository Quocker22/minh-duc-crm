import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';

import { Image } from '@/components/molecules/Image';
import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { CustomerModel } from '@/modules/customer/models';

function getColumnDef(
  columnResizeMode: ColumnResizeMode = 'onChange'
): ColumnDef<CustomerModel, any>[] {
  const columnHelper = createColumnHelper<CustomerModel>();

  return [
    columnHelper.accessor('id', {
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-40px"
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
          title="Mã khách hàng"
        />
      ),
    }),

    columnHelper.accessor('name', {
      cell: ({ row }) => (
        <div className="d-flex">
          <Image height={35} src={row.original.avatar} width={35} isImageRoundedCircle />
          <h6 className="text-primary ps-2 pt-2">{row.original.name}</h6>
        </div>
      ),
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Tên khách hàng"
        />
      ),
    }),

    columnHelper.accessor('num_of_worker', {
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-130px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Số NLĐ đang làm"
        />
      ),
    }),
    columnHelper.accessor('address', {
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-150px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Khu vực"
        />
      ),
    }),

    columnHelper.accessor('province.name', {
      enableResizing: false,
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title="Quản lý nhà máy"
        />
      ),
    }),
  ];
}

export { getColumnDef };
