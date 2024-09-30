import React from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';

type Props = {
  className: string;
};

const TablesWidget11: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">New Arrivals</span>
          <span className="text-muted mt-1 fw-semobold fs-7">Over 500 new products</span>
        </h3>
        <div className="card-toolbar">
          <a className="btn btn-sm btn-light-primary" href="#">
            <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr075.svg" />
            New Member
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="ps-4 min-w-325px rounded-start">Product</th>
                <th className="min-w-125px">Price</th>
                <th className="min-w-125px">Deposit</th>
                <th className="min-w-200px">Agent</th>
                <th className="min-w-150px">Status</th>
                <th className="min-w-200px text-end rounded-end" />
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <img
                        alt=""
                        className=""
                        src={toAbsoluteUrl('/media/stock/600x400/img-26.jpg')}
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                        Sant Extreanet Solution
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $2,790
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $520
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Rejected</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    Bradly Beal
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Insurance</span>
                </td>
                <td>
                  <span className="badge badge-light-primary fs-7 fw-semobold">Approved</span>
                </td>
                <td className="text-end">
                  <a
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    href="#"
                  >
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen019.svg" />
                  </a>
                  <a
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    href="#"
                  >
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/art/art005.svg" />
                  </a>
                  <a className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" href="#">
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen027.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <img
                        alt=""
                        className=""
                        src={toAbsoluteUrl('/media/stock/600x400/img-3.jpg')}
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                        Telegram Development
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        C#, ASP.NET, MS SQL
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $4,790
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $240
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Rejected</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    Chris Thompson
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">NBA Player</span>
                </td>
                <td>
                  <span className="badge badge-light-danger fs-7 fw-semobold">In Progress</span>
                </td>
                <td className="text-end">
                  <a
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    href="#"
                  >
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen019.svg" />
                  </a>
                  <a
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    href="#"
                  >
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/art/art005.svg" />
                  </a>
                  <a className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" href="#">
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen027.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <img
                        alt=""
                        className=""
                        src={toAbsoluteUrl('/media/stock/600x400/img-9.jpg')}
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                        Payroll Application
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        PHP, Laravel, VueJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $4,390
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $593
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Rejected</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    Zoey McGee
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">
                    Ruby Developer
                  </span>
                </td>
                <td>
                  <span className="badge badge-light-success fs-7 fw-semobold">Success</span>
                </td>
                <td className="text-end">
                  <a
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    href="#"
                  >
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen019.svg" />
                  </a>
                  <a
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    href="#"
                  >
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/art/art005.svg" />
                  </a>
                  <a className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" href="#">
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen027.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <img
                        alt=""
                        className=""
                        src={toAbsoluteUrl('/media/stock/600x400/img-18.jpg')}
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                        HR Management System
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        Python, PostgreSQL, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $7,990
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $980
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Rejected</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    Brandon Ingram
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Insurance</span>
                </td>
                <td>
                  <span className="badge badge-light-info fs-7 fw-semobold">Rejected</span>
                </td>
                <td className="text-end">
                  <a
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    href="#"
                  >
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen019.svg" />
                  </a>
                  <a
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    href="#"
                  >
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/art/art005.svg" />
                  </a>
                  <a className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" href="#">
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen027.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <img
                        alt=""
                        className=""
                        src={toAbsoluteUrl('/media/stock/600x400/img-8.jpg')}
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                        Telegram Mobile
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $5,790
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $750
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Rejected</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    Natali Trump
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Insurance</span>
                </td>
                <td>
                  <span className="badge badge-light-warning fs-7 fw-semobold">Approved</span>
                </td>
                <td className="text-end">
                  <a
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    href="#"
                  >
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen019.svg" />
                  </a>
                  <a
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    href="#"
                  >
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/art/art005.svg" />
                  </a>
                  <a className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" href="#">
                    <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen027.svg" />
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
      {/* begin::Body */}
    </div>
  );
};

export { TablesWidget11 };
