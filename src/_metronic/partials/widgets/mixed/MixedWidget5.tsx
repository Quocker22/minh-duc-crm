import React from 'react';

import { toAbsoluteUrl } from '@/_metronic/helpers';

type Props = {
  className: string;
  description: string;
  image: string;
  time: string;
  title: string;
};

const MixedWidget5: React.FC<Props> = ({ className, time, image, title, description }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body d-flex flex-column pb-10 pb-lg-15">
        <div className="flex-grow-1">
          {/* begin::Info */}
          <div className="d-flex align-items-center pe-2 mb-5">
            <span className="text-muted fw-bold fs-5 flex-grow-1">{time}</span>

            <div className="symbol symbol-50px">
              <span className="symbol-label bg-light">
                <img alt="" className="h-50 align-self-center" src={toAbsoluteUrl(image)} />
              </span>
            </div>
          </div>
          {/* end::Info */}

          {/* begin::Link */}
          <a className="text-dark fw-bold text-hover-primary fs-4" href="#">
            {title}
          </a>
          {/* end::Link */}

          {/* begin::Desc */}
          <p dangerouslySetInnerHTML={{ __html: description }} className="py-3" />
          {/* end::Desc */}
        </div>

        {/* begin::Team */}
        <div className="d-flex align-items-center">
          <a
            className="symbol symbol-35px me-2"
            data-bs-toggle="tooltip"
            href="#"
            title="Ana Stone"
          >
            <img alt="" src={toAbsoluteUrl('/media/avatars/300-6.jpg')} />
          </a>

          <a
            className="symbol symbol-35px me-2"
            data-bs-toggle="tooltip"
            href="#"
            title="Mark Larson"
          >
            <img alt="" src={toAbsoluteUrl('/media/avatars/300-5.jpg')} />
          </a>

          <a
            className="symbol symbol-35px me-2"
            data-bs-toggle="tooltip"
            href="#"
            title="Sam Harris"
          >
            <img alt="" src={toAbsoluteUrl('/media/avatars/300-9.jpg')} />
          </a>
        </div>
        {/* end::Team */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { MixedWidget5 };
