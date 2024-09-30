import React from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';

type Props = {
  className: string;
};

const TablesWidget12: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Member Statistics</span>
          <span className="text-muted mt-1 fw-semobold fs-7">Over 500 new members</span>
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
          {/* begin::Menu 2 */}
          <div
            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold w-200px"
            data-kt-menu="true"
          >
            {/* begin::Menu item */}
            <div className="menu-item px-3">
              <div className="menu-content fs-6 text-dark fw-bold px-3 py-4">Quick Actions</div>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className="separator mb-3 opacity-75" />
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            <div className="menu-item px-3">
              <a className="menu-link px-3" href="#">
                New Ticket
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className="menu-item px-3">
              <a className="menu-link px-3" href="#">
                New Customer
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div
              className="menu-item px-3"
              data-kt-menu-flip="left-start, top"
              data-kt-menu-placement="right-start"
              data-kt-menu-trigger="hover"
            >
              {/* begin::Menu item */}
              <a className="menu-link px-3" href="#">
                <span className="menu-title">New Group</span>
                <span className="menu-arrow" />
              </a>
              {/* end::Menu item */}
              {/* begin::Menu sub */}
              <div className="menu-sub menu-sub-dropdown w-175px py-4">
                {/* begin::Menu item */}
                <div className="menu-item px-3">
                  <a className="menu-link px-3" href="#">
                    Admin Group
                  </a>
                </div>
                {/* end::Menu item */}
                {/* begin::Menu item */}
                <div className="menu-item px-3">
                  <a className="menu-link px-3" href="#">
                    Staff Group
                  </a>
                </div>
                {/* end::Menu item */}
                {/* begin::Menu item */}
                <div className="menu-item px-3">
                  <a className="menu-link px-3" href="#">
                    Member Group
                  </a>
                </div>
                {/* end::Menu item */}
              </div>
              {/* end::Menu sub */}
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className="menu-item px-3">
              <a className="menu-link px-3" href="#">
                New Contact
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className="separator mt-3 opacity-75" />
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            <div className="menu-item px-3">
              <div className="menu-content px-3 py-3">
                <a className="btn btn-primary btn-sm px-4" href="#">
                  Generate Reports
                </a>
              </div>
            </div>
            {/* end::Menu item */}
          </div>
          {/* end::Menu 2 */}
          {/* end::Menu */}
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
                <th className="ps-4 min-w-300px rounded-start">Agent</th>
                <th className="min-w-125px">Earnings</th>
                <th className="min-w-125px">Comission</th>
                <th className="min-w-200px">Company</th>
                <th className="min-w-150px">Rating</th>
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
                      <span className="symbol-label bg-light">
                        <img
                          alt=""
                          className="h-75 align-self-end"
                          src={toAbsoluteUrl('/media/svg/avatars/001-boy.svg')}
                        />
                      </span>
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                        Brad Simmons
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $8,000,000
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Pending</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $5,400
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    Intertico
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">
                    Web, UI/UX Design
                  </span>
                </td>
                <td>
                  <div className="rating">
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                  </div>
                  <span className="text-muted fw-semobold text-muted d-block fs-7 mt-1">
                    Best Rated
                  </span>
                </td>
                <td className="text-end">
                  <a
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                    href="#"
                  >
                    View
                  </a>
                  <a
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                    href="#"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <span className="symbol-label bg-light">
                        <img
                          alt=""
                          className="h-75 align-self-end"
                          src={toAbsoluteUrl('/media/svg/avatars/047-girl-25.svg')}
                        />
                      </span>
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                        Lebron Wayde
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        PHP, Laravel, VueJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $8,750,000
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $7,400
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    Agoda
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">
                    Houses &amp; Hotels
                  </span>
                </td>
                <td>
                  <div className="rating">
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                  </div>
                  <span className="text-muted fw-semobold text-muted d-block fs-7 mt-1">
                    Above Avarage
                  </span>
                </td>
                <td className="text-end">
                  <a
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                    href="#"
                  >
                    View
                  </a>
                  <a
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                    href="#"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <span className="symbol-label bg-light">
                        <img
                          alt=""
                          className="h-75 align-self-end"
                          src={toAbsoluteUrl('/media/svg/avatars/006-girl-3.svg')}
                        />
                      </span>
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                        Brad Simmons
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $8,000,000
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">
                    In Proccess
                  </span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $2,500
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Rejected</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    RoadGee
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <div className="rating">
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                  </div>
                  <span className="text-muted fw-semobold text-muted d-block fs-7 mt-1">
                    Best Rated
                  </span>
                </td>
                <td className="text-end">
                  <a
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                    href="#"
                  >
                    View
                  </a>
                  <a
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                    href="#"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <span className="symbol-label bg-light">
                        <img
                          alt=""
                          className="h-75 align-self-end"
                          src={toAbsoluteUrl('/media/svg/avatars/014-girl-7.svg')}
                        />
                      </span>
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                        Natali Trump
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $700,000
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Pending</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $7,760
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    The Hill
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Insurance</span>
                </td>
                <td>
                  <div className="rating">
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                  </div>
                  <span className="text-muted fw-semobold text-muted d-block fs-7 mt-1">
                    Avarage
                  </span>
                </td>
                <td className="text-end">
                  <a
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                    href="#"
                  >
                    View
                  </a>
                  <a
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                    href="#"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <span className="symbol-label bg-light">
                        <img
                          alt=""
                          className="h-75 align-self-end"
                          src={toAbsoluteUrl('/media/svg/avatars/020-girl-11.svg')}
                        />
                      </span>
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-dark fw-bold text-hover-primary mb-1 fs-6" href="#">
                        Jessie Clarcson
                      </a>
                      <span className="text-muted fw-semobold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $1,320,000
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Pending</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    $6,250
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">Paid</span>
                </td>
                <td>
                  <a className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" href="#">
                    Intertico
                  </a>
                  <span className="text-muted fw-semobold text-muted d-block fs-7">
                    Web, UI/UX Design
                  </span>
                </td>
                <td>
                  <div className="rating">
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5" />
                    </div>
                  </div>
                  <span className="text-muted fw-semobold text-muted d-block fs-7 mt-1">
                    Best Rated
                  </span>
                </td>
                <td className="text-end">
                  <a
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                    href="#"
                  >
                    View
                  </a>
                  <a
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                    href="#"
                  >
                    Edit
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

export { TablesWidget12 };
