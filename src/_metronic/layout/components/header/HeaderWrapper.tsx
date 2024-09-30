import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';
import { Header } from '@/_metronic/layout/components/header/Header';
import { DefaultTitle } from '@/_metronic/layout/components/header/page-title/DefaultTitle';
import { Topbar } from '@/_metronic/layout/components/header/Topbar';
import { useLayout } from '@/_metronic/layout/core';

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout();
  const { header, aside } = config;

  return (
    <div
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      id="kt_header"
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className="d-flex align-items-center d-lg-none ms-n3 me-1" title="Show aside menu">
            <div
              className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
              id="kt_aside_mobile_toggle"
            >
              <KTSVG className="svg-icon-2x mt-1" path="/media/icons/duotune/abstract/abs015.svg" />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {!aside.display && (
          <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
            <Link className="d-lg-none" to="/dashboard">
              <img alt="Logo" className="h-30px" src={toAbsoluteUrl('/media/logos/logo.svg')} />
            </Link>
          </div>
        )}
        {/* end::Logo */}

        {aside.display && (
          <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
            <Link className="d-lg-none" to="/">
              <img alt="Logo" className="h-30px" src={toAbsoluteUrl('/media/logos/logo.svg')} />
            </Link>
          </div>
        )}

        {/* begin::Wrapper */}
        <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className="d-flex align-items-stretch" id="kt_header_nav">
              <Header />
            </div>
          )}

          {header.left === 'page-title' && (
            <div className="d-flex align-items-center" id="kt_header_nav">
              <DefaultTitle />
            </div>
          )}

          <div className="d-flex align-items-stretch flex-shrink-0">
            <Topbar />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  );
}
