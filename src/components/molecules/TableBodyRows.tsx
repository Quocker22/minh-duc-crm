import { flexRender, Row } from '@tanstack/react-table';
import clsx from 'clsx';

import { trans } from '@/utils';

interface IProps<TData> {
  readonly rows: Row<TData>[];
  readonly className?: string;
  readonly columnsCount?: number;
  readonly emptyDataText?: string;
  readonly onClick?: (data: TData) => void;
}

const TableBodyRows = <TData,>({
  emptyDataText,
  rows,
  className,
  columnsCount,
  onClick,
}: IProps<TData>) => {
  return (
    <>
      {rows.length ? (
        rows.map((row) => (
          <tr key={row.id} onClick={() => onClick?.(row.original)}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={clsx(className, {
                  'text-end': cell.column.id === 'actions',
                })}
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columnsCount}>
            <div className="d-flex text-center align-content-center justify-content-center">
              {emptyDataText || trans('TABLE.NO_MATCH_RECORDS')}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export { TableBodyRows };
