import React from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';

type Props = {
  className: string;
};

const TablesWidget10: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Members Statistics</span>
          <span className="text-muted mt-1 fw-semobold fs-7">Over 500 members</span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-placement="top"
          data-bs-toggle="tooltip"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <a
            className="btn btn-sm btn-light-primary"
            href="#"

            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <KTSVG className="svg-icon-3" path="media/icons/duotune/arrows/arr075.svg" />
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
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="w-25px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      data-kt-check="true"
                      data-kt-check-target=".widget-9-check"
                      type="checkbox"
                      value="1"
                    />
                  </div>
                </th>
                <th className="min-w-150px">Authors</th>
                <th className="min-w-140px">Company</th>
                <th className="min-w-120px">Progress</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <img alt="" src={toAbsoluteUrl('/media/avatars/300-14.jpg')} />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary fs-6" href="#">
                        Ana Simmons
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block fs-6" href="#">
                    Intertico
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">
                    Web, UI/UX Design
                  </span>
                </td>
                <td className="text-end">
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
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      href="#"
                    >
                      <KTSVG
                        className="svg-icon-3"
                        path="/media/icons/duotune/general/gen019.svg"
                      />
                    </a>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      href="#"
                    >
                      <KTSVG className="svg-icon-3" path="/media/icons/duotune/art/art005.svg" />
                    </a>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      href="#"
                    >
                      <KTSVG
                        className="svg-icon-3"
                        path="/media/icons/duotune/general/gen027.svg"
                      />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <img alt="" src={toAbsoluteUrl('/media/avatars/300-2.jpg')} />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary fs-6" href="#">
                        Jessie Clarcson
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        C#, ASP.NET, MS SQL
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block fs-6" href="#">
                    Agoda
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">
                    Houses &amp; Hotels
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="text-muted me-2 fs-7 fw-semobold">70%</span>
                    </div>
                    <div className="progress h-6px w-100">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      href="#"
                    >
                      <KTSVG
                        className="svg-icon-3"
                        path="/media/icons/duotune/general/gen019.svg"
                      />
                    </a>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      href="#"
                    >
                      <KTSVG className="svg-icon-3" path="/media/icons/duotune/art/art005.svg" />
                    </a>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      href="#"
                    >
                      <KTSVG
                        className="svg-icon-3"
                        path="/media/icons/duotune/general/gen027.svg"
                      />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <img alt="" src={toAbsoluteUrl('/media/avatars/300-5.jpg')} />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary fs-6" href="#">
                        Lebron Wayde
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        PHP, Laravel, VueJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block fs-6" href="#">
                    RoadGee
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">
                    Transportation
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="text-muted me-2 fs-7 fw-semobold">60%</span>
                    </div>
                    <div className="progress h-6px w-100">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: '60%' }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      href="#"
                    >
                      <KTSVG
                        className="svg-icon-3"
                        path="/media/icons/duotune/general/gen019.svg"
                      />
                    </a>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      href="#"
                    >
                      <KTSVG className="svg-icon-3" path="/media/icons/duotune/art/art005.svg" />
                    </a>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      href="#"
                    >
                      <KTSVG
                        className="svg-icon-3"
                        path="/media/icons/duotune/general/gen027.svg"
                      />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <img alt="" src={toAbsoluteUrl('/media/avatars/300-20.jpg')} />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary fs-6" href="#">
                        Natali Goodwin
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        Python, PostgreSQL, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block fs-6" href="#">
                    The Hill
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Insurance</span>
                </td>
                <td className="text-end">
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="text-muted me-2 fs-7 fw-semobold">50%</span>
                    </div>
                    <div className="progress h-6px w-100">
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: '50%' }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      href="#"
                    >
                      <KTSVG
                        className="svg-icon-3"
                        path="/media/icons/duotune/general/gen019.svg"
                      />
                    </a>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      href="#"
                    >
                      <KTSVG className="svg-icon-3" path="/media/icons/duotune/art/art005.svg" />
                    </a>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      href="#"
                    >
                      <KTSVG
                        className="svg-icon-3"
                        path="/media/icons/duotune/general/gen027.svg"
                      />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <img alt="" src={toAbsoluteUrl('/media/avatars/300-23.jpg')} />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary fs-6" href="#">
                        Kevin Leonard
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block fs-6" href="#">
                    RoadGee
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">
                    Art Director
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="text-muted me-2 fs-7 fw-semobold">90%</span>
                    </div>
                    <div className="progress h-6px w-100">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: '90%' }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      href="#"
                    >
                      <KTSVG
                        className="svg-icon-3"
                        path="/media/icons/duotune/general/gen019.svg"
                      />
                    </a>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      href="#"
                    >
                      <KTSVG className="svg-icon-3" path="/media/icons/duotune/art/art005.svg" />
                    </a>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      href="#"
                    >
                      <KTSVG
                        className="svg-icon-3"
                        path="/media/icons/duotune/general/gen027.svg"
                      />
                    </a>
                  </div>
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

export { TablesWidget10 };
