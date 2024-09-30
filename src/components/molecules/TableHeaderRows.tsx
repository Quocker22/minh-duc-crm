import { ColumnResizeMode, HeaderGroup } from '@tanstack/react-table';
import clsx from 'clsx';

import { TableHeaderColumn } from '@/components/molecules/TableHeaderColumn';

interface IProps<TData extends object> {
  readonly headerGroups: HeaderGroup<TData>[];
  readonly className?: string;
  readonly columnResizeMode?: ColumnResizeMode;
}

const TableHeaderRows = <TData extends object>({
  headerGroups,
  className,
  columnResizeMode,
}: IProps<TData>) => (
  <>
    {headerGroups.map((headerGroup) => (
      <tr
        key={headerGroup.id}
        className={clsx('text-start fw-bolder fs-8 text-uppercase gs-0', className)}
      >
        {headerGroup.headers.map((header) => {
          return (
            <TableHeaderColumn
              key={header.id}
              columnResizeMode={columnResizeMode}
              header={header}
            />
          );
        })}
      </tr>
    ))}
  </>
);

export { TableHeaderRows };
