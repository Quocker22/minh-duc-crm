import React from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';

type Props = {
  className: string;
};

const FeedsWidget4: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body pb-0">
        {/* begin::Header */}
        <div className="d-flex align-items-center mb-5">
          {/* begin::User */}
          <div className="d-flex align-items-center flex-grow-1">
            {/* begin::Avatar */}
            <div className="symbol symbol-45px me-5">
              <img alt="" src={toAbsoluteUrl('/media/avatars/300-7.jpg')} />
            </div>
            {/* end::Avatar */}

            {/* begin::Info */}
            <div className="d-flex flex-column">
              <a className="text-gray-800 text-hover-primary fs-6 fw-bold" href="#">
                Carles Nilson
              </a>
              <span className="text-gray-400 fw-semobold">Last week at 10:00 PM</span>
            </div>
            {/* end::Info */}
          </div>
          {/* end::User */}

          {/* begin::Menu */}
          <div className="my-0">
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
        {/* end::Header */}

        {/* begin::Post */}
        <div className="mb-7">
          {/* begin::Text */}
          <div className="text-gray-800 mb-5">
            Outlines keep you honest. They stop you from indulging in poorly thought-out metaphors
            about driving and keep you focused on the overall structure of your post
          </div>
          {/* end::Text */}

          {/* begin::Toolbar */}
          <div className="d-flex align-items-center mb-5">
            <a
              className="btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4"
              href="#"
            >
              <KTSVG className="svg-icon-3" path="/media/icons/duotune/communication/com012.svg" />
              22
            </a>

            <a
              className="btn btn-sm btn-light btn-color-muted btn-active-light-danger px-4 py-2"
              href="#"
            >
              <KTSVG className="svg-icon-2" path="/media/icons/duotune/general/gen030.svg" />
              59
            </a>
          </div>
          {/* end::Toolbar */}
        </div>
        {/* end::Post */}

        {/* begin::Separator */}
        <div className="separator mb-4" />
        {/* end::Separator */}

        {/* begin::Reply input */}
        <form className="position-relative mb-6">
          <textarea
            className="form-control border-0 p-0 pe-10 resize-none min-h-25px"
            placeholder="Reply.."
            rows={1}
          />

          <div className="position-absolute top-0 end-0 me-n5">
            <span className="btn btn-icon btn-sm btn-active-color-primary pe-0 me-2">
              <KTSVG
                className="svg-icon-3 mb-3"
                path="/media/icons/duotune/communication/com008.svg"
              />
            </span>

            <span className="btn btn-icon btn-sm btn-active-color-primary ps-0">
              <KTSVG className="svg-icon-2 mb-3" path="/media/icons/duotune/general/gen018.svg" />
            </span>
          </div>
        </form>
        {/* edit::Reply input */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { FeedsWidget4 };
