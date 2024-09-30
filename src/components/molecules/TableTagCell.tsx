import clsx from 'clsx';
import * as React from 'react';

import { WithChildren } from '@/_metronic/helpers';

interface IProps extends WithChildren {
  readonly className?: string;
  readonly color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  readonly isLight?: boolean;
}

const TableTagCell: React.FC<IProps> = (props) => {
  if (!props.children) return null;

  return (
    <div
      className={clsx(
        'badge fw-normal w-85',
        props.className,
        !props.isLight && `badge-${props.color}`,
        props.isLight && `badge-light-${props.color}`
      )}
    >
      {props.children}
    </div>
  );
};

export { TableTagCell };
