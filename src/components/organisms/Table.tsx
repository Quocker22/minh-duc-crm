import { rankItem } from '@tanstack/match-sorter-utils';
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnResizeMode,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  Table as ReactTable,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { cloneDeep } from 'lodash-es';
import { useEffect } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

import { Pagination } from '@/components/molecules/Pagination';
import { TableBodyRows } from '@/components/molecules/TableBodyRows';
import { TableEntry } from '@/components/molecules/TableEntry';
import { TableFooterRows } from '@/components/molecules/TableFooterRows';
import { TableHeaderRows } from '@/components/molecules/TableHeaderRows';
import { TableLoading } from '@/components/molecules/TableLoading';
import { LimitOption } from '@/models';

interface IProps<TData extends object> {
  readonly data: TData[];
  readonly className?: string;
  readonly columnFilters?: ColumnFiltersState;
  readonly columnResizeMode?: ColumnResizeMode;
  readonly columns?: ColumnDef<TData, any>[];
  readonly currentPage?: number | string;
  readonly emptyDataText?: string;
  readonly globalFilter?: string;
  readonly isLoading?: boolean;
  readonly isVisibleEntry?: boolean;
  readonly isVisibleFooter?: boolean;
  readonly isVisiblePagination?: boolean;
  readonly limit?: number | string;
  readonly onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  readonly onLimitChange?: (limit: LimitOption) => void;
  readonly onPageChange?: (page?: number) => void;
  readonly onRowClick?: (data: TData) => void;
  readonly onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  readonly onSortingChange?: OnChangeFn<SortingState>;
  readonly onUpdateTable?: (table: ReactTable<TData>) => void;
  readonly rowSelection?: RowSelectionState;
  readonly sorting?: SortingState;
  readonly total?: number | string;
}

// TODO: Column filters
const Table = <TData extends object>(props: IProps<TData>) => {
  const isDevelopment = import.meta.env.NODE_ENV === 'development';

  const fuzzyFilter: FilterFn<TData> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({ itemRank });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const table = useReactTable({
    columnResizeMode: props.columnResizeMode,
    columns: props.columns || [],
    data: props.data,
    debugAll: isDevelopment,
    filterFns: { fuzzy: fuzzyFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: props.onColumnFiltersChange,
    onRowSelectionChange: props.onRowSelectionChange,
    onSortingChange: props.onSortingChange,
    state: {
      columnFilters: props.columnFilters,
      globalFilter: props.globalFilter,
      rowSelection: props.rowSelection,
      sorting: props.sorting,
    },
  });

  useEffect(() => {
    props.onUpdateTable?.(cloneDeep(table));
  }, [JSON.stringify(table)]);

  // on data change => remove rows selected
  useEffect(() => {
    table.toggleAllRowsSelected(false);
  }, [props.data]);

  return (
    <section className={clsx('react__table table-resizable', props.className)}>
      <BootstrapTable
        className="table table-nowrap-content align-middle table-row-dashed table-column-dashed fs-6 gy-4 no-footer"
        bordered
        hover
        responsive
      >
        <thead>
          <TableHeaderRows
            className="text-dark bg-light"
            columnResizeMode={props.columnResizeMode}
            headerGroups={table.getHeaderGroups()}
          />
        </thead>

        <tbody className="text-gray-900">
          <TableBodyRows
            columnsCount={table.getFlatHeaders().length}
            emptyDataText={props.emptyDataText}
            onClick={props.onRowClick}
            rows={table.getRowModel().rows}
          />
        </tbody>

        {props.isVisibleFooter && (
          <tfoot>
            <TableFooterRows footerGroups={table.getFooterGroups()} />
          </tfoot>
        )}
      </BootstrapTable>

      <div className="row mt-3">
        {props.isVisibleEntry && (
          <div className="col-12 col-md-6">
            <TableEntry
              currentPage={Number(props.currentPage)}
              limit={Number(props.limit)}
              onChange={props.onLimitChange}
              total={Number(props.total)}
            />
          </div>
        )}
        {props.isVisiblePagination && (
          <div className="col-12 col-md-6">
            <Pagination
              className="justify-content-end"
              currentPage={Number(props.currentPage)}
              limit={Number(props.limit)}
              onChange={props.onPageChange}
              total={Number(props.total)}
            />
          </div>
        )}
      </div>
      <TableLoading className={clsx(!props.isLoading && 'd-none')} />
    </section>
  );
};

Table.defaultProps = {
  columnFilters: [],
  columnResizeMode: 'onChange',
  columns: [],
  data: [],
  isVisibleEntry: true,
  isVisibleFooter: false,
  isVisiblePagination: true,
  sorting: [],
};

export { Table };
