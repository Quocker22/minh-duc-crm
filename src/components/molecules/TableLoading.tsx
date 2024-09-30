import clsx from 'clsx';
import { FC } from 'react';

import { trans } from '@/utils';

interface IProps {
  readonly className?: string;
}

const TableLoading: FC<IProps> = ({ className }) => {
  return (
    <div className={clsx('loading__container select-none', className)}>
      <div className="loading__section">{trans('TABLE.PROCESSING')}</div>
    </div>
  );
};

export { TableLoading };
