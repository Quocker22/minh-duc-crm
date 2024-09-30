import { ColumnResizeMode, Header } from '@tanstack/react-table';
import clsx from 'clsx';

import { WithChildren } from '@/_metronic/helpers';

interface IProps<TData, TValue> extends WithChildren {
  readonly header: Header<TData, TValue>;
  readonly className?: string;
  readonly columnResizeMode?: ColumnResizeMode;
  readonly title?: string;
}
const TableHeaderCell = <TData, TValue>({
  header,
  className,
  columnResizeMode,
  title,
  children,
}: IProps<TData, TValue>) => {
  const transform =
    columnResizeMode === 'onEnd' && header.column.getIsResizing()
      ? `translateX(${header.getContext().table.getState().columnSizingInfo.deltaOffset}px)`
      : '';

  return (
    <th
      key={header.id}
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
      {title}
      {children}
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

export { TableHeaderCell };
