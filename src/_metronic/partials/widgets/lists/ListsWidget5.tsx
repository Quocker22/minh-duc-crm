import React from 'react';

import { KTSVG } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';

type Props = {
  className: string;
};

const ListsWidget5: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bold mb-2 text-dark">Activities</span>
          <span className="text-muted fw-semobold fs-7">890,344 Sales</span>
        </h3>
        <div className="card-toolbar">
          {/* begin::Menu */}
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
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body pt-5">
        {/* begin::Timeline */}
        <div className="timeline-label">
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">08:42</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-warning fs-1" />
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className="fw-mormal timeline-content text-muted ps-3">
              Outlines keep you honest. And keep structure
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">10:00</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-success fs-1" />
            </div>
            {/* end::Badge */}
            {/* begin::Content */}
            <div className="timeline-content d-flex">
              <span className="fw-bold text-gray-800 ps-3">AEOL meeting</span>
            </div>
            {/* end::Content */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">14:37</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-danger fs-1" />
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className="timeline-content fw-bold text-gray-800 ps-3">
              Make deposit
              <a className="text-primary" href="#">
                USD 700
              </a>
              . to ESL
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">16:50</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-primary fs-1" />
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className="timeline-content fw-mormal text-muted ps-3">
              Indulging in poorly driving and keep structure keep great
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">21:03</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-danger fs-1" />
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className="timeline-content fw-semobold text-gray-800 ps-3">
              New order placed
              <a className="text-primary" href="#">
                #XF-2356
              </a>
              .
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">16:50</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-primary fs-1" />
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className="timeline-content fw-mormal text-muted ps-3">
              Indulging in poorly driving and keep structure keep great
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">21:03</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-danger fs-1" />
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className="timeline-content fw-semobold text-gray-800 ps-3">
              New order placed
              <a className="text-primary" href="#">
                #XF-2356
              </a>
              .
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className="timeline-item">
            {/* begin::Label */}
            <div className="timeline-label fw-bold text-gray-800 fs-6">10:30</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-success fs-1" />
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className="timeline-content fw-mormal text-muted ps-3">
              Finance KPI Mobile app launch preparion meeting
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
        </div>
        {/* end::Timeline */}
      </div>
      {/* end: Card Body */}
    </div>
  );
};

export { ListsWidget5 };
