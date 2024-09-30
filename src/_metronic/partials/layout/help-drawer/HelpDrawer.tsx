import React from 'react';
import { Link } from 'react-router-dom';

import { KTSVG } from '@/_metronic/helpers';

const HelpDrawer = () => {
  return (
    <div
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-activate="true"
      data-kt-drawer-close="#kt_help_close"
      data-kt-drawer-direction="end"
      data-kt-drawer-name="help"
      data-kt-drawer-overlay="true"
      data-kt-drawer-toggle="#kt_help_toggle"
      data-kt-drawer-width="{default:'350px', 'md': '525px'}"
      id="kt_help"
    >
      {/* begin::Card */}
      <div className="card shadow-none rounded-0 w-100">
        {/* begin::Header */}
        <div className="card-header" id="kt_help_header">
          <h5 className="card-title fw-bold text-gray-600">Learn & Get Inspired</h5>

          <div className="card-toolbar">
            <button
              className="btn btn-sm btn-icon explore-btn-dismiss me-n5"
              id="kt_help_close"
              type="button"
            >
              <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr061.svg" />
            </button>
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body" id="kt_help_body">
          {/* begin::Content */}
          <div
            className="hover-scroll-overlay-y"
            data-kt-scroll="true"
            data-kt-scroll-dependencies="#kt_help_header"
            data-kt-scroll-height="auto"
            data-kt-scroll-offset="5px"
            data-kt-scroll-wrappers="#kt_help_body"
            id="kt_help_scroll"
          >
            {/* begin::Support */}
            <div className="rounded border border-dashed border-gray-300 p-6 p-lg-8 mb-10">
              {/* begin::Heading */}
              <h2 className="fw-bolder mb-5">
                Support at{' '}
                <a className="" href="https://devs.keenthemes.com">
                  devs.keenthemes.com
                </a>
              </h2>
              {/* end::Heading */}

              {/* begin::Description */}
              <div className="fs-5 fw-bold mb-5">
                <span className="text-gray-500">
                  Join our developers community to find answer to your question and help others.
                </span>
                <a className="explore-link d-none" href="https://keenthemes.com/licensing">
                  FAQs
                </a>
              </div>
              {/* end::Description */}

              {/* begin::Link */}
              <a
                className="btn btn-lg explore-btn-primary w-100"
                href="https://devs.keenthemes.com"
              >
                Get Support
              </a>
              {/* end::Link */}
            </div>
            {/* end::Support */}

            {/* begin::Link */}
            <div className="d-flex align-items-center mb-7">
              {/* begin::Icon */}
              <div className="d-flex flex-center w-50px h-50px w-lg-75px h-lg-75px flex-shrink-0 rounded bg-light-warning">
                <KTSVG
                  className="svg-icon-warning svg-icon-2x svg-icon-lg-3x"
                  path="/media/icons/duotune/abstract/abs027.svg"
                />
              </div>
              {/* end::Icon */}
              {/* begin::Info */}
              <div className="d-flex flex-stack flex-grow-1 ms-4 ms-lg-6">
                {/* begin::Wrapper */}
                <div className="d-flex flex-column me-2 me-lg-5">
                  {/* begin::Title */}
                  <a
                    className="text-dark text-hover-primary fw-bolder fs-6 fs-lg-4 mb-1"
                    href="https://preview.keenthemes.com/metronic8/react/docs/docs/quick-start"
                  >
                    Documentation &amp; Videos
                  </a>
                  {/* end::Title */}
                  {/* begin::Description */}
                  <div className="text-muted fw-bold fs-7 fs-lg-6">
                    From guides and video tutorials, to live demos and code examples to get started.
                  </div>
                  {/* end::Description */}
                </div>
                {/* end::Wrapper */}
                <KTSVG
                  className="svg-icon-gray-400 svg-icon-2"
                  path="/media/icons/duotune/arrows/arr064.svg"
                />
              </div>
              {/* end::Info */}
            </div>
            {/* end::Link */}
            {/* begin::Link */}
            <div className="d-flex align-items-center mb-7">
              {/* begin::Icon */}
              <div className="d-flex flex-center w-50px h-50px w-lg-75px h-lg-75px flex-shrink-0 rounded bg-light-primary">
                <KTSVG
                  className="svg-icon-primary svg-icon-2x svg-icon-lg-3x"
                  path="/media/icons/duotune/ecommerce/ecm007.svg"
                />
              </div>
              {/* end::Icon */}
              {/* begin::Info */}
              <div className="d-flex flex-stack flex-grow-1 ms-4 ms-lg-6">
                {/* begin::Wrapper */}
                <div className="d-flex flex-column me-2 me-lg-5">
                  {/* begin::Title */}
                  <a
                    className="text-dark text-hover-primary fw-bolder fs-6 fs-lg-4 mb-1"
                    href="https://preview.keenthemes.com/metronic8/react/docs/docs/utilities"
                  >
                    Plugins &amp; Components
                  </a>
                  {/* end::Title */}
                  {/* begin::Description */}
                  <div className="text-muted fw-bold fs-7 fs-lg-6">
                    Check out our 300+ in-house components and customized 3rd-party plugins.
                  </div>
                  {/* end::Description */}
                </div>
                {/* end::Wrapper */}
                <KTSVG
                  className="svg-icon-gray-400 svg-icon-2"
                  path="/media/icons/duotune/arrows/arr064.svg"
                />
              </div>
              {/* end::Info */}
            </div>
            {/* end::Link */}
            {/* begin::Link */}
            <div className="d-flex align-items-center mb-7">
              {/* begin::Icon */}
              <div className="d-flex flex-center w-50px h-50px w-lg-75px h-lg-75px flex-shrink-0 rounded bg-light-info">
                <KTSVG
                  className="svg-icon-info svg-icon-2x svg-icon-lg-3x"
                  path="/media/icons/duotune/art/art006.svg"
                />
              </div>
              {/* end::Icon */}
              {/* begin::Info */}
              <div className="d-flex flex-stack flex-grow-1 ms-4 ms-lg-6">
                {/* begin::Wrapper */}
                <div className="d-flex flex-column me-2 me-lg-5">
                  {/* begin::Title */}
                  <Link
                    className="text-dark text-hover-primary fw-bolder fs-6 fs-lg-4 mb-1"
                    to="/builder"
                  >
                    Layout Builder
                  </Link>
                  {/* end::Title */}
                  {/* begin::Description */}
                  <div className="text-muted fw-bold fs-7 fs-lg-6">
                    Dynamically modify and preview layout
                  </div>
                  {/* end::Description */}
                </div>
                {/* end::Wrapper */}
                <KTSVG
                  className="svg-icon-gray-400 svg-icon-2"
                  path="/media/icons/duotune/arrows/arr064.svg"
                />
              </div>
              {/* end::Info */}
            </div>
            {/* end::Link */}
            {/* begin::Link */}
            <div className="d-flex align-items-center mb-7">
              {/* begin::Icon */}
              <div className="d-flex flex-center w-50px h-50px w-lg-75px h-lg-75px flex-shrink-0 rounded bg-light-danger">
                <KTSVG
                  className="svg-icon-danger svg-icon-2x svg-icon-lg-3x"
                  path="/media/icons/duotune/electronics/elc009.svg"
                />
              </div>
              {/* end::Icon */}
              {/* begin::Info */}
              <div className="d-flex flex-stack flex-grow-1 ms-4 ms-lg-6">
                {/* begin::Wrapper */}
                <div className="d-flex flex-column me-2 me-lg-5">
                  {/* begin::Title */}
                  <a
                    className="text-dark text-hover-primary fw-bolder fs-6 fs-lg-4 mb-1"
                    href="https://preview.keenthemes.com/metronic8/react/docs/docs/changelog"
                  >
                    What's New
                  </a>
                  {/* end::Title */}
                  {/* begin::Description */}
                  <div className="text-muted fw-bold fs-7 fs-lg-6">
                    Latest features and improvements added with our users feedback in mind.
                  </div>
                  {/* end::Description */}
                </div>
                {/* end::Wrapper */}
                <KTSVG
                  className="svg-icon-gray-400 svg-icon-2"
                  path="/media/icons/duotune/arrows/arr064.svg"
                />
              </div>
              {/* end::Info */}
            </div>
            {/* end::Link */}
          </div>
          {/* end::Content */}
        </div>
        {/* end::Body */}
      </div>
      {/* end::Card */}
    </div>
  );
};

export { HelpDrawer };
