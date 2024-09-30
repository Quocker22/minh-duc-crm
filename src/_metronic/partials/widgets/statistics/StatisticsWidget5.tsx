import React from 'react';

import { KTSVG } from '@/_metronic/helpers';

type Props = {
  className: string;
  color: string;
  description: string;
  iconColor: string;
  svgIcon: string;
  title: string;
  descriptionColor?: string;
  titleColor?: string;
};

const StatisticsWidget5: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  titleColor,
  description,
  descriptionColor,
}) => {
  return (
    <a className={`card bg-${color} hoverable ${className}`} href="#">
      <div className="card-body">
        <KTSVG className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} path={svgIcon} />

        <div className={`text-${titleColor} fw-bold fs-2 mb-2 mt-5`}>{title}</div>

        <div className={`fw-semibold text-${descriptionColor}`}>{description}</div>
      </div>
    </a>
  );
};

export { StatisticsWidget5 };
