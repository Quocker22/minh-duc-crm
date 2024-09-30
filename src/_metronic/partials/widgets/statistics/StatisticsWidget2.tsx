import React from 'react';

import { toAbsoluteUrl } from '@/_metronic/helpers';

type Props = {
  avatar: string;
  className: string;
  description: string;
  title: string;
};

const StatisticsWidget2: React.FC<Props> = ({ className, title, description, avatar }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body d-flex align-items-center pt-3 pb-0">
        <div className="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
          <a className="fw-bold text-dark fs-4 mb-2 text-hover-primary" href="#">
            {title}
          </a>

          <span
            dangerouslySetInnerHTML={{ __html: description }}
            className="fw-semobold text-muted fs-5"
          />
        </div>

        <img alt="" className="align-self-end h-100px" src={toAbsoluteUrl(avatar)} />
      </div>
      {/* end::Body */}
    </div>
  );
};

export { StatisticsWidget2 };
