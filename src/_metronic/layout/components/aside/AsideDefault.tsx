/* eslint-disable react/jsx-no-target-blank */

import { Image } from 'antd';
import clsx from 'clsx';
import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';
import { AsideMenu } from '@/_metronic/layout/components/aside/AsideMenu';
import { useLayout } from '@/_metronic/layout/core';

const AsideDefault: FC = () => {
  const { config, classes } = useLayout();
  const asideRef = useRef<HTMLDivElement | null>(null);
  const { aside } = config;

  const minimize = () => {
    asideRef.current?.classList.add('animating');
    setTimeout(() => {
      asideRef.current?.classList.remove('animating');
    }, 300);
  };

  return (
    <div
      ref={asideRef}
      className={clsx('aside', classes.aside.join(' '))}
      data-kt-drawer="true"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-direction="start"
      data-kt-drawer-name="aside"
      data-kt-drawer-overlay="true"
      data-kt-drawer-toggle="#kt_aside_mobile_toggle"
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      id="kt_aside"
    >
      {/* begin::Brand */}
      <div
        className="aside-logo flex-column-auto"
        id="kt_aside_logo"
        style={{ background: '#106fcf' }}
      >
        <Link to="/dashboard">
          <Image
            alt="Logo"
            className="h-40px logo"
            preview={false}
            src={toAbsoluteUrl('/media/logos/logo.svg')}
          />
        </Link>

        {/* begin::Aside toggler */}
        {aside.minimize && (
          <div
            className="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"
            data-kt-toggle="true"
            data-kt-toggle-name="aside-minimize"
            data-kt-toggle-state="active"
            data-kt-toggle-target="body"
            id="kt_aside_toggle"
            onClick={minimize}
          >
            <KTSVG
              className={'svg-icon-1 rotate-180'}
              path={'/media/icons/duotune/arrows/arr079.svg'}
            />
          </div>
        )}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className="aside-menu flex-column-fluid" style={{ background: '#106fcf' }}>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
    </div>
  );
};

export { AsideDefault };
