import React from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';

type Props = {
  className: string;
};

const TablesWidget2: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Latest Arrivals</span>
          <span className="text-muted mt-1 fw-semobold fs-7">More than 100 new products</span>
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
            <KTSVG className="svg-icon-2" path="media/icons/duotune/general/gen024.svg" />
          </button>
          <Dropdown1 />
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
                <th className="p-0 min-w-150px" />
                <th className="p-0 min-w-150px" />
                <th className="p-0 min-w-125px" />
                <th className="p-0 min-w-40px" />
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label">
                      <img
                        alt=""
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl('/media/svg/brand-logos/plurk.svg')}
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Top Authors
                  </a>
                  <span className="text-muted fw-semobold d-block fs-7">Successful Fellas</span>
                </td>
                <td className="text-end">
                  <span className="badge badge-light-danger fw-semobold me-1">Angular</span>
                  <span className="badge badge-light-info fw-semobold me-1">PHP</span>
                </td>
                <td className="text-end">
                  <span className="text-muted fw-semobold">4600 Users</span>
                </td>
                <td className="text-end">
                  <a className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" href="#">
                    <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr064.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label">
                      <img
                        alt=""
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl('/media/svg/brand-logos/telegram.svg')}
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Popular Authors
                  </a>
                  <span className="text-muted fw-semobold d-block fs-7">Most Successful</span>
                </td>
                <td className="text-end">
                  <span className="badge badge-light-danger fw-semobold me-1">HTML</span>
                  <span className="badge badge-light-info fw-semobold me-1">CSS</span>
                </td>
                <td className="text-end">
                  <span className="text-muted fw-semobold">7200 Users</span>
                </td>
                <td className="text-end">
                  <a className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" href="#">
                    <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr064.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label">
                      <img
                        alt=""
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl('/media/svg/brand-logos/vimeo.svg')}
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    New Users
                  </a>
                  <span className="text-muted fw-semobold d-block fs-7">Awesome Users</span>
                </td>
                <td className="text-end">
                  <span className="badge badge-light-danger fw-semobold me-1">React</span>
                  <span className="badge badge-light-info fw-semobold me-1">SASS</span>
                </td>
                <td className="text-end">
                  <span className="text-muted fw-semobold">890 Users</span>
                </td>
                <td className="text-end">
                  <a className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" href="#">
                    <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr064.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label">
                      <img
                        alt=""
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl('/media/svg/brand-logos/bebo.svg')}
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Active Customers
                  </a>
                  <span className="text-muted fw-semobold d-block fs-7">Best Customers</span>
                </td>
                <td className="text-end">
                  <span className="badge badge-light-danger fw-semobold me-1">Java</span>
                  <span className="badge badge-light-info fw-semobold me-1">PHP</span>
                </td>
                <td className="text-end">
                  <span className="text-muted fw-semobold">6370 Users</span>
                </td>
                <td className="text-end">
                  <a className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" href="#">
                    <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr064.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label">
                      <img
                        alt=""
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl('/media/svg/brand-logos/kickstarter.svg')}
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Bestseller Theme
                  </a>
                  <span className="text-muted fw-semobold d-block fs-7">Amazing Templates</span>
                </td>
                <td className="text-end">
                  <span className="badge badge-light-danger fw-semobold me-1">Python</span>
                  <span className="badge badge-light-info fw-semobold me-1">MySQL</span>
                </td>
                <td className="text-end">
                  <span className="text-muted fw-semobold">354 Users</span>
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
      {/* end::Body */}
    </div>
  );
};

export { TablesWidget2 };
