import React from 'react';

import { KTSVG } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';

type Props = {
  className: string;
};

const ListsWidget3: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0">
        <h3 className="card-title fw-bold text-dark">Todo</h3>
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
      <div className="card-body pt-2">
        {/* begin::Item */}
        <div className="d-flex align-items-center mb-8">
          {/* begin::Bullet */}
          <span className="bullet bullet-vertical h-40px bg-success" />
          {/* end::Bullet */}
          {/* begin::Checkbox */}
          <div className="form-check form-check-custom form-check-solid mx-5">
            <input className="form-check-input" type="checkbox" value="" />
          </div>
          {/* end::Checkbox */}
          {/* begin::Description */}
          <div className="flex-grow-1">
            <a className="text-gray-800 text-hover-primary fw-bold fs-6" href="#">
              Create FireStone Logo
            </a>
            <span className="text-muted fw-semobold d-block">Due in 2 Days</span>
          </div>
          {/* end::Description */}
          <span className="badge badge-light-success fs-8 fw-bold">New</span>
        </div>
        {/* end:Item */}
        {/* begin::Item */}
        <div className="d-flex align-items-center mb-8">
          {/* begin::Bullet */}
          <span className="bullet bullet-vertical h-40px bg-primary" />
          {/* end::Bullet */}
          {/* begin::Checkbox */}
          <div className="form-check form-check-custom form-check-solid mx-5">
            <input className="form-check-input" type="checkbox" value="" />
          </div>
          {/* end::Checkbox */}
          {/* begin::Description */}
          <div className="flex-grow-1">
            <a className="text-gray-800 text-hover-primary fw-bold fs-6" href="#">
              Stakeholder Meeting
            </a>
            <span className="text-muted fw-semobold d-block">Due in 3 Days</span>
          </div>
          {/* end::Description */}
          <span className="badge badge-light-primary fs-8 fw-bold">New</span>
        </div>
        {/* end:Item */}
        {/* begin::Item */}
        <div className="d-flex align-items-center mb-8">
          {/* begin::Bullet */}
          <span className="bullet bullet-vertical h-40px bg-warning" />
          {/* end::Bullet */}
          {/* begin::Checkbox */}
          <div className="form-check form-check-custom form-check-solid mx-5">
            <input className="form-check-input" type="checkbox" value="" />
          </div>
          {/* end::Checkbox */}
          {/* begin::Description */}
          <div className="flex-grow-1">
            <a className="text-gray-800 text-hover-primary fw-bold fs-6" href="#">
              Scoping &amp; Estimations
            </a>
            <span className="text-muted fw-semobold d-block">Due in 5 Days</span>
          </div>
          {/* end::Description */}
          <span className="badge badge-light-warning fs-8 fw-bold">New</span>
        </div>
        {/* end:Item */}
        {/* begin::Item */}
        <div className="d-flex align-items-center mb-8">
          {/* begin::Bullet */}
          <span className="bullet bullet-vertical h-40px bg-primary" />
          {/* end::Bullet */}
          {/* begin::Checkbox */}
          <div className="form-check form-check-custom form-check-solid mx-5">
            <input className="form-check-input" type="checkbox" value="" />
          </div>
          {/* end::Checkbox */}
          {/* begin::Description */}
          <div className="flex-grow-1">
            <a className="text-gray-800 text-hover-primary fw-bold fs-6" href="#">
              KPI App Showcase
            </a>
            <span className="text-muted fw-semobold d-block">Due in 2 Days</span>
          </div>
          {/* end::Description */}
          <span className="badge badge-light-primary fs-8 fw-bold">New</span>
        </div>
        {/* end:Item */}
        {/* begin::Item */}
        <div className="d-flex align-items-center mb-8">
          {/* begin::Bullet */}
          <span className="bullet bullet-vertical h-40px bg-danger" />
          {/* end::Bullet */}
          {/* begin::Checkbox */}
          <div className="form-check form-check-custom form-check-solid mx-5">
            <input className="form-check-input" type="checkbox" value="" />
          </div>
          {/* end::Checkbox */}
          {/* begin::Description */}
          <div className="flex-grow-1">
            <a className="text-gray-800 text-hover-primary fw-bold fs-6" href="#">
              Project Meeting
            </a>
            <span className="text-muted fw-semobold d-block">Due in 12 Days</span>
          </div>
          {/* end::Description */}
          <span className="badge badge-light-danger fs-8 fw-bold">New</span>
        </div>
        {/* end:Item */}
        {/* begin::Item */}
        <div className="d-flex align-items-center">
          {/* begin::Bullet */}
          <span className="bullet bullet-vertical h-40px bg-success" />
          {/* end::Bullet */}
          {/* begin::Checkbox */}
          <div className="form-check form-check-custom form-check-solid mx-5">
            <input className="form-check-input" type="checkbox" value="" />
          </div>
          {/* end::Checkbox */}
          {/* begin::Description */}
          <div className="flex-grow-1">
            <a className="text-gray-800 text-hover-primary fw-bold fs-6" href="#">
              Customers Update
            </a>
            <span className="text-muted fw-semobold d-block">Due in 1 week</span>
          </div>
          {/* end::Description */}
          <span className="badge badge-light-success fs-8 fw-bold">New</span>
        </div>
        {/* end:Item */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { ListsWidget3 };
