import { flexRender, HeaderGroup } from '@tanstack/react-table';
import clsx from 'clsx';

interface IProps<TData extends object> {
  readonly footerGroups: HeaderGroup<TData>[];
  readonly className?: string;
}

const TableFooterRows = <TData extends object>({ footerGroups, className }: IProps<TData>) => (
  <>
    {footerGroups.map((footerGroup) => (
      <tr
        key={footerGroup.id}
        className={clsx('text-start text-muted fw-bolder fs-7 text-uppercase gs-0', className)}
      >
        {footerGroup.headers.map((footer) => (
          <td key={footer.id} style={{ width: footer.getSize() }}>
            {footer.isPlaceholder
              ? null
              : flexRender(footer.column.columnDef.footer, footer.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </>
);

export { TableFooterRows };
