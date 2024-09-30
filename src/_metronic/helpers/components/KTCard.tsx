import clsx from 'clsx';
import { FC } from 'react';

import { WithChildren } from '@/_metronic/helpers/react18MigrationHelpers';

// Wrapper on html card:
// https://preview.keenthemes.com/metronic8/demo1/documentation/base/cards.html

type Props = {
  border?: boolean; // https://preview.keenthemes.com/metronic8/demo1/documentation/base/cards.html#reset-side-paddings
  className?: string;

  // https://preview.keenthemes.com/metronic8/demo1/documentation/base/cards.html#bordered
  dashed?: boolean;
  flush?: boolean;

  // https://preview.keenthemes.com/metronic8/demo1/documentation/base/cards.html#flush
  resetSidePaddings?: boolean;

  // https://preview.keenthemes.com/metronic8/demo1/documentation/base/cards.html#stretch
  rounded?: 'rounded' | 'rounded-top' | 'rounded-bottom';
  shadow?: boolean;

  // https://preview.keenthemes.com/metronic8/demo1/documentation/base/cards.html#dashed
  stretch?: 'stretch' | 'stretch-75' | 'stretch-50' | 'stretch-33' | 'stretch-25';

  // https://preview.keenthemes.com/metronic8/demo1/documentation/base/cards.html#utilities
  utilityP?: number;
  utilityPX?: number;
  utilityPY?: number;
};

const KTCard: FC<Props & WithChildren> = (props) => {
  const {
    className,
    shadow,
    flush,
    resetSidePaddings,
    border,
    dashed,
    stretch,
    rounded,
    utilityP,
    utilityPY,
    utilityPX,
    children,
  } = props;

  return (
    <div
      className={clsx(
        'card',
        className && className,
        {
          'card-bordered': border,
          'card-dashed': dashed,
          'card-flush': flush,
          'card-px-0': resetSidePaddings,
          'shadow-sm': shadow,
        },
        stretch && `card-${stretch}`,
        utilityP && `p-${utilityP}`,
        utilityPX && `px-${utilityPX}`,
        utilityPY && `py-${utilityPY}`,
        rounded && `card-${rounded}`
      )}
    >
      {children}
    </div>
  );
};

export { KTCard };
