/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable simple-import-sort/imports */
import clsx from 'clsx';
import { FC } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

import { checkIsActive, KTSVG, WithChildren } from '@/_metronic/helpers';
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

const AsideMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  badged,
}) => {
  const { pathname } = useLocation();

  const isActive = checkIsActive(pathname, to);
  const { config } = useLayout();
  const { aside } = config;

  const isMatchRoute = pathname.startsWith(`${to.replace('/list', '')}`);

  return (
    <div className="menu-item">
      <NavLink className={clsx('menu-link without-sub', { active: isMatchRoute })} to={to}>
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
        <span className="menu-title fs-4">{title}</span>
        {badged && (
          <small className={clsx('badge fw-light', `badge-${badged.color}`)}>{badged.text}</small>
        )}
      </NavLink>
      {children}
    </div>
  );
};

export { AsideMenuItem };
