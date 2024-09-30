import clsx from 'clsx';
import { FC } from 'react';

import { WithChildren } from '@/_metronic/helpers/react18MigrationHelpers';

type Props = {
  className?: string;
  height?: number;
  scroll?: boolean;
};

const KTCardBody: FC<Props & WithChildren> = (props) => {
  const { className, scroll, height, children } = props;

  return (
    <div
      className={clsx(
        'card-body',
        className && className,
        {
          'card-scroll': scroll,
        },
        height && `h-${height}px`
      )}
    >
      {children}
    </div>
  );
};

export { KTCardBody };
