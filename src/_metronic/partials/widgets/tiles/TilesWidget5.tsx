import clsx from 'clsx';

import { KTSVG } from '@/_metronic/helpers';

type Props = {
  className?: string;
  description?: string;
  descriptionClass?: string;
  iconClass?: string;
  svgIcon?: string;
  title?: string;
  titleClass?: string;
};
const TilesWidget5 = (props: Props) => {
  const { className, svgIcon, titleClass, descriptionClass, iconClass, title, description } = props;

  return (
    <a className={clsx('card', className)} href="#">
      <div className="card-body d-flex flex-column justify-content-between">
        <KTSVG className={clsx(iconClass, 'svg-icon-2hx ms-n1 flex-grow-1')} path={svgIcon || ''} />
        <div className="d-flex flex-column">
          <div className={clsx(titleClass, 'fw-bold fs-1 mb-0 mt-5')}>{title}</div>
          <div className={clsx(descriptionClass, 'fw-semibold fs-6')}>{description}</div>
        </div>
      </div>
    </a>
  );
};

export { TilesWidget5 };
