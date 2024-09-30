import React from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';

type Props = {
  className: string;
};

const TablesWidget1: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Tasks Overview</span>
          <span className="text-muted fw-semobold fs-7">Pending 10 tasks</span>
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
          {/* begin::Menu 1 */}
          <Dropdown1 />
          {/* end::Menu 1 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table align-middle gs-0 gy-5">
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className="p-0 w-50px" />
                <th className="p-0 min-w-200px" />
                <th className="p-0 min-w-100px" />
                <th className="p-0 min-w-40px" />
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <th>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label">
                      <img
                        alt=""
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl('/media/svg/brand-logos/plurk.svg')}
                      />
                    </span>
                  </div>
                </th>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Top Authors
                  </a>
                  <span className="text-muted fw-semobold d-block fs-7">Successful Fellas</span>
                </td>
                <td>
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="text-muted me-2 fs-7 fw-semobold">70%</span>
                    </div>
                    <div className="progress h-6px w-100">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <a className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" href="#">
                    <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr064.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <th>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label">
                      <img
                        alt=""
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl('/media/svg/brand-logos/telegram.svg')}
                      />
                    </span>
                  </div>
                </th>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Popular Authors
                  </a>
                  <span className="text-muted fw-semobold d-block fs-7">Most Successful</span>
                </td>
                <td>
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="text-muted me-2 fs-7 fw-semobold">50%</span>
                    </div>
                    <div className="progress h-6px w-100">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '50%' }}
                      />
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <a className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" href="#">
                    <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr064.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <th>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label">
                      <img
                        alt=""
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl('/media/svg/brand-logos/vimeo.svg')}
                      />
                    </span>
                  </div>
                </th>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    New Users
                  </a>
                  <span className="text-muted fw-semobold d-block fs-7">Awesome Users</span>
                </td>
                <td>
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="text-muted me-2 fs-7 fw-semobold">80%</span>
                    </div>
                    <div className="progress h-6px w-100">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '80%' }}
                      />
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <a className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" href="#">
                    <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr064.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <th>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label">
                      <img
                        alt=""
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl('/media/svg/brand-logos/bebo.svg')}
                      />
                    </span>
                  </div>
                </th>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Active Customers
                  </a>
                  <span className="text-muted fw-semobold d-block fs-7">Best Customers</span>
                </td>
                <td>
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="text-muted me-2 fs-7 fw-semobold">90%</span>
                    </div>
                    <div className="progress h-6px w-100">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '90%' }}
                      />
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <a className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" href="#">
                    <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr064.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <th>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label">
                      <img
                        alt=""
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl('/media/svg/brand-logos/kickstarter.svg')}
                      />
                    </span>
                  </div>
                </th>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Bestseller Theme
                  </a>
                  <span className="text-muted fw-semobold d-block fs-7">Amazing Templates</span>
                </td>
                <td>
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="text-muted me-2 fs-7 fw-semobold">70%</span>
                    </div>
                    <div className="progress h-6px w-100">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <a className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" href="#">
                    <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr064.svg" />
                  </a>
                </td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
    </div>
  );
};

export { TablesWidget1 };
