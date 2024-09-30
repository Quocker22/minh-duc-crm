import React from 'react';

import { KTSVG } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';

type Props = {
  className: string;
};

const TablesWidget3: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Files</span>
          <span className="text-muted mt-1 fw-semobold fs-7">Over 100 pending files</span>
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
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table align-middle gs-0 gy-3">
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className="p-0 w-50px" />
                <th className="p-0 min-w-150px" />
                <th className="p-0 min-w-140px" />
                <th className="p-0 min-w-120px" />
                <th className="p-0 min-w-40px" />
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label bg-light-success">
                      <KTSVG
                        className="svg-icon-2x svg-icon-success"
                        path="/media/icons/duotune/ecommerce/ecm002.svg"
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Top Authors
                  </a>
                </td>
                <td className="text-end text-muted fw-semobold">ReactJs, HTML</td>
                <td className="text-end text-muted fw-semobold">4600 Users</td>
                <td className="text-end text-dark fw-bold fs-6 pe-0">5.4MB</td>
              </tr>
              <tr>
                <td>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label bg-light-danger">
                      <KTSVG
                        className="svg-icon-2x svg-icon-danger"
                        path="/media/icons/duotune/general/gen024.svg"
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Popular Authors
                  </a>
                </td>
                <td className="text-end text-muted fw-semobold">Python, MySQL</td>
                <td className="text-end text-muted fw-semobold">7200 Users</td>
                <td className="text-end text-dark fw-bold fs-6 pe-0">2.8MB</td>
              </tr>
              <tr>
                <td>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label bg-light-info">
                      <KTSVG
                        className="svg-icon-2x svg-icon-info"
                        path="/media/icons/duotune/finance/fin006.svg"
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    New Users
                  </a>
                </td>
                <td className="text-end text-muted fw-semobold">Laravel, Metronic</td>
                <td className="text-end text-muted fw-semobold">890 Users</td>
                <td className="text-end text-dark fw-bold fs-6 pe-0">1.5MB</td>
              </tr>
              <tr>
                <td>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label bg-light-warning">
                      <KTSVG
                        className="svg-icon-2x svg-icon-warning"
                        path="/media/icons/duotune/abstract/abs027.svg"
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Active Customers
                  </a>
                </td>
                <td className="text-end text-muted fw-semobold">AngularJS, C#</td>
                <td className="text-end text-muted fw-semobold">4600 Users</td>
                <td className="text-end text-dark fw-bold fs-6 pe-0">5.4MB</td>
              </tr>
              <tr>
                <td>
                  <div className="symbol symbol-50px me-2">
                    <span className="symbol-label bg-light-primary">
                      <KTSVG
                        className="svg-icon-2x svg-icon-primar"
                        path="/media/icons/duotune/abstract/abs042.svg"
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                    Active Customers
                  </a>
                </td>
                <td className="text-end text-muted fw-semobold">ReactJS, Ruby</td>
                <td className="text-end text-muted fw-semobold">354 Users</td>
                <td className="text-end text-dark fw-bold fs-6 pe-0">500KB</td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { TablesWidget3 };
