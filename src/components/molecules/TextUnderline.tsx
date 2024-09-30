import clsx from 'clsx';
import { FC } from 'react';

import { WithChildren } from '@/_metronic/helpers';

interface IProps extends WithChildren {
  readonly className?: string;
  readonly onClick?: () => void;
}

const TextUnderline: FC<IProps> = ({ className, onClick, children }) => {
  return (
    <div
      className={clsx('text-underline-hover cursor-pointer', className)}
      onClick={onClick}
      style={{ whiteSpace: 'break-spaces' }}
    >
      {children}
    </div>
  );
};

export { TextUnderline };
