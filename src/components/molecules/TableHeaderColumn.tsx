import { ColumnResizeMode, flexRender, Header } from '@tanstack/react-table';
import clsx from 'clsx';

interface IProps<TData> {
  readonly header: Header<TData, unknown>;
  readonly className?: string;
  readonly columnResizeMode?: ColumnResizeMode;
}

const TableHeaderColumn = <TData,>({ className, header, columnResizeMode }: IProps<TData>) => {
  const isOriginal = header.column.columnDef.header?.toString().match(/accessorKey/);
  const transform =
    columnResizeMode === 'onEnd' && header.column.getIsResizing()
      ? `translateX(${header.getContext().table.getState().columnSizingInfo.deltaOffset}px)`
      : '';

  if (!isOriginal) {
    if (header.isPlaceholder) return null;

    return <>{flexRender(header.column.columnDef.header, header.getContext())}</>;
  }

  return (
    <th
      className={clsx(
        { 'cursor-pointer select-none': header.column.getCanSort() },
        `table-sort-${header.column.getIsSorted()}`,
        header.column.getCanResize() && 'position-relative',
        className
      )}
      colSpan={header.colSpan}
      onClick={header.column.getToggleSortingHandler()}
      style={{ width: header.getSize() }}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}

      {header.column.getCanResize() && (
        <div
          className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          style={{ transform }}
        />
      )}
    </th>
  );
};

export { TableHeaderColumn };
