import clsx from 'clsx';
import React from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';

type Props = {
  className: string;
  color: string;
  date: string;
  image: string;
  progress: string;
  title: string;
};

const MixedWidget4: React.FC<Props> = ({ className, color, image, title, date, progress }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body">
        {/* begin::Heading */}
        <div className="d-flex flex-stack">
          {/* begin:Info */}
          <div className="d-flex align-items-center">
            {/* begin:Image */}
            <div className="symbol symbol-60px me-5">
              <span className={clsx(`symbol-label`, `bg-${color}-light`)}>
                <img alt="" className="h-50 align-self-center" src={toAbsoluteUrl(image)} />
              </span>
            </div>
            {/* end:Image */}

            {/* begin:Title */}
            <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pe-3">
              <a className="text-dark fw-bold text-hover-primary fs-5" href="#">
                {title}
              </a>

              <span className="text-muted fw-semobold">{date}</span>
            </div>
            {/* end:Title */}
          </div>
          {/* begin:Info */}

          {/* begin:Menu */}
          <div className="ms-1">
            <button
              className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
              data-kt-menu-flip="top-end"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-trigger="click"
              type="button"
            >
              <KTSVG className="svg-icon-2" path="/media/icons/duotune/general/gen024.svg" />
            </button>
            <Dropdown1 />
          </div>
          {/* end::Menu */}
        </div>
        {/* end::Heading */}

        {/* begin:Stats */}
        <div className="d-flex flex-column w-100 mt-12">
          <span className="text-dark me-2 fw-bold pb-3">Progress</span>

          <div className="progress h-5px w-100">
            <div
              className={`progress-bar bg-${color}`}
              role="progressbar"
              style={{ width: progress }}
            />
          </div>
        </div>
        {/* end:Stats */}

        {/* begin:Team */}
        <div className="d-flex flex-column mt-10">
          <div className="text-dark me-2 fw-bold pb-4">Team</div>

          <div className="d-flex">
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

            <a className="symbol symbol-35px" data-bs-toggle="tooltip" href="#" title="Alice Micto">
              <img alt="" src={toAbsoluteUrl('/media/avatars/300-10.jpg')} />
            </a>
          </div>
        </div>
        {/* end:Team */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { MixedWidget4 };
