import React from 'react';

import { toAbsoluteUrl } from '@/_metronic/helpers';

type Props = {
  className: string;
  description: string;
  image: string;
  time: string;
  title: string;
};

const StatisticsWidget1: React.FC<Props> = ({ className, image, title, time, description }) => {
  return (
    <div
      className={`card bgi-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/svg/shapes/' + image)})`,
        backgroundPosition: 'right top',
        backgroundSize: '30% auto',
      }}
    >
      {/* begin::Body */}
      <div className="card-body">
        <a className="card-title fw-bold text-muted text-hover-primary fs-4" href="#">
          {title}
        </a>

        <div className="fw-bold text-primary my-6">{time}</div>

        <p
          dangerouslySetInnerHTML={{ __html: description }}
          className="text-dark-75 fw-semobold fs-5 m-0"
        />
      </div>
      {/* end::Body */}
    </div>
  );
};

export { StatisticsWidget1 };
