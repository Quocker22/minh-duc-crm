/* eslint-disable unused-imports/no-unused-vars */
import clsx from 'clsx';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { getCurrentUrl, KTSVG, WithChildren } from '@/_metronic/helpers';
import { useLayout } from '@/_metronic/layout/core';
import { Color } from '@/models';

type Props = {
  title: string;
  to: string;
  badged?: { color: Color; text: string | number };
  fontIcon?: string;
  hasBullet?: boolean;
  icon?: string;
};

function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  // if (current === url) {
  //   return true;
  // }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
}

const AsideMenuItemWithSub: React.FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
  badged,
}) => {
  const { pathname } = useLocation();
  const isActive = checkIsActive(pathname, to);
  const { config } = useLayout();
  const { aside } = config;

  return (
    <div
      className={clsx('menu-item py-1', { 'here show': isActive }, 'menu-accordion')}
      data-kt-menu-trigger="click"
    >
      <span className="menu-link">
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot" />
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className="menu-icon">
            <KTSVG className="svg-icon-2" path={icon} />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)} />}
        <span className="menu-title fs-5">{title}</span>
        {badged && (
          <small className={clsx('badge fw-light', `badge-${badged.color}`)}>{badged.text}</small>
        )}
        <span className="menu-arrow" />
      </span>
      <div
        className={clsx('menu-sub menu-sub-accordion', {
          'menu-active-bg': isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export { AsideMenuItemWithSub };
