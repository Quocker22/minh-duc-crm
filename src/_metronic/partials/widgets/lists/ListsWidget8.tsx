import React from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';

type Props = {
  className: string;
};

const ListsWidget8: React.FC<Props> = ({ className: _ }) => {
  return (
    <div className="card card-xl-stretch mb-5 mb-xl-8">
      {/* begin::Header */}
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bold text-dark">Latest Products</span>
          <span className="text-muted mt-1 fw-semobold fs-7">Gifts and more</span>
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
      <div className="card-body pt-3">
        {/* begin::Item */}
        <div className="d-flex align-items-sm-center mb-7">
          {/* begin::Symbol */}
          <div className="symbol symbol-60px symbol-2by3 me-4">
            <div
              className="symbol-label"
              style={{
                backgroundImage: `url(${toAbsoluteUrl('/media/stock/600x400/img-17.jpg')})`,
              }}
            />
          </div>
          {/* end::Symbol */}
          {/* begin::Content */}
          <div className="d-flex flex-row-fluid align-items-center flex-wrap my-lg-0 me-2">
            {/* begin::Title */}
            <div className="flex-grow-1 my-lg-0 my-2 me-2">
              <a className="text-gray-800 fw-bold text-hover-primary fs-6" href="#">
                Cup &amp; Green
              </a>
              <span className="text-muted fw-semobold d-block pt-1">Visually stunning</span>
            </div>
            {/* end::Title */}
            {/* begin::Section */}
            <div className="d-flex align-items-center">
              <div className="me-6">
                <i className="fa fa-star-half-alt me-1 text-warning fs-5" />
                <span className="text-gray-800 fw-bold">4.2</span>
              </div>
              <a className="btn btn-icon btn-light btn-sm border-0" href="#">
                <KTSVG
                  className="svg-icon-2 svg-icon-primary"
                  path="/media/icons/duotune/arrows/arr064.svg"
                />
              </a>
            </div>
            {/* end::Section */}
          </div>
          {/* end::Content */}
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className="d-flex align-items-sm-center mb-7">
          {/* begin::Symbol */}
          <div className="symbol symbol-60px symbol-2by3 me-4">
            <div
              className="symbol-label"
              style={{
                backgroundImage: `url(${toAbsoluteUrl('/media/stock/600x400/img-10.jpg')})`,
              }}
            />
          </div>
          {/* end::Symbol */}
          {/* begin::Content */}
          <div className="d-flex flex-row-fluid align-items-center flex-wrap my-lg-0 me-2">
            {/* begin::Title */}
            <div className="flex-grow-1 my-lg-0 my-2 me-2">
              <a className="text-gray-800 fw-bold text-hover-primary fs-6" href="#">
                Pink Patterns
              </a>
              <span className="text-muted fw-semobold d-block pt-1">Feminine all around</span>
            </div>
            {/* end::Title */}
            {/* begin::Section */}
            <div className="d-flex align-items-center">
              <div className="me-6">
                <i className="fa fa-star-half-alt me-1 text-warning fs-5" />
                <span className="text-gray-800 fw-bold">5.0</span>
              </div>
              <a className="btn btn-icon btn-light btn-sm border-0" href="#">
                <KTSVG
                  className="svg-icon-2 svg-icon-primary"
                  path="/media/icons/duotune/arrows/arr064.svg"
                />
              </a>
            </div>
            {/* end::Section */}
          </div>
          {/* end::Content */}
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className="d-flex align-items-sm-center mb-7">
          {/* begin::Symbol */}
          <div className="symbol symbol-60px symbol-2by3 me-4">
            <div
              className="symbol-label"
              style={{ backgroundImage: `url(${toAbsoluteUrl('/media/stock/600x400/img-1.jpg')})` }}
            />
          </div>
          {/* end::Symbol */}
          {/* begin::Content */}
          <div className="d-flex flex-row-fluid align-items-center flex-wrap my-lg-0 me-2">
            {/* begin::Title */}
            <div className="flex-grow-1 my-lg-0 my-2 me-2">
              <a className="text-gray-800 fw-bold text-hover-primary fs-6" href="#">
                Abstract Art
              </a>
              <span className="text-muted fw-semobold d-block pt-1">
                The will to capture readers
              </span>
            </div>
            {/* end::Title */}
            {/* begin::Section */}
            <div className="d-flex align-items-center">
              <div className="me-6">
                <i className="fa fa-star-half-alt me-1 text-warning fs-5" />
                <span className="text-gray-800 fw-bold">5.7</span>
              </div>
              <a className="btn btn-icon btn-light btn-sm border-0" href="#">
                <KTSVG
                  className="svg-icon-2 svg-icon-primary"
                  path="/media/icons/duotune/arrows/arr064.svg"
                />
              </a>
            </div>
            {/* end::Section */}
          </div>
          {/* end::Content */}
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className="d-flex align-items-sm-center">
          {/* begin::Symbol */}
          <div className="symbol symbol-60px symbol-2by3 me-4">
            <div
              className="symbol-label"
              style={{ backgroundImage: `url(${toAbsoluteUrl('/media/stock/600x400/img-9.jpg')})` }}
            />
          </div>
          {/* end::Symbol */}
          {/* begin::Content */}
          <div className="d-flex flex-row-fluid align-items-center flex-wrap my-lg-0 me-2">
            {/* begin::Title */}
            <div className="flex-grow-1 my-lg-0 my-2 me-2">
              <a className="text-gray-800 fw-bold text-hover-primary fs-6" href="#">
                Desserts platter
              </a>
              <span className="text-muted fw-semobold d-block pt-1">
                Food trends &amp; inspirations
              </span>
            </div>
            {/* end::Title */}
            {/* begin::Section */}
            <div className="d-flex align-items-center">
              <div className="me-6">
                <i className="fa fa-star-half-alt me-1 text-warning fs-5" />
                <span className="text-gray-800 fw-bold">3.7</span>
              </div>
              <a className="btn btn-icon btn-light btn-sm border-0" href="#">
                <KTSVG
                  className="svg-icon-2 svg-icon-primary"
                  path="/media/icons/duotune/arrows/arr064.svg"
                />
              </a>
            </div>
            {/* end::Section */}
          </div>
          {/* end::Content */}
        </div>
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { ListsWidget8 };
