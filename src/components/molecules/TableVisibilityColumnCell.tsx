import { Table } from '@tanstack/react-table';
import clsx from 'clsx';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';

import { getUniqueIdWithPrefix } from '@/_metronic/assets/ts/_utils';
import { MenuComponent } from '@/_metronic/assets/ts/components';
import { KTSVG, WithChildren } from '@/_metronic/helpers';

interface IProps<TData> extends WithChildren {
  readonly table: Table<TData>;
  readonly className?: string;
  readonly menuClassName?: string;
  readonly title?: ReactNode;
}

const TableVisibilityColumnCell = <TData,>({
  table,
  className,
  title,
  menuClassName,
}: IProps<TData>) => {
  const uniqueId = useRef(getUniqueIdWithPrefix());
  const columnsCanHide = useMemo(
    () => table.getAllLeafColumns().filter((column) => column.getCanHide()),
    [table]
  );

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  return (
    <div className={clsx('d-flex align-items-center', className)}>
      {title}
      <Button
        className="p-0"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-trigger="click"
        variant="link"
      >
        <KTSVG className="svg-icon-5 m-0 d-flex" path="/media/icons/duotune/general/gen053.svg" />
      </Button>

      <div
        className={clsx(
          'menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-fit-content py-4',
          menuClassName
        )}
        data-kt-menu="true"
      >
        <div className="menu-item px-3">
          <Form.Check
            checked={table.getIsAllColumnsVisible()}
            id={`${uniqueId}ToggleAll`}
            label="Toggle all"
            onChange={table.getToggleAllColumnsVisibilityHandler()}
            type="switch"
          />
        </div>

        {columnsCanHide.map((column) => {
          return (
            <div key={column.id} className="menu-item px-3">
              <Form.Check
                checked={column.getIsVisible()}
                id={`${uniqueId}${column.id}`}
                label={column.id}
                onChange={column.getToggleVisibilityHandler()}
                type="switch"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { TableVisibilityColumnCell };
