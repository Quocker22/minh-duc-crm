import clsx from 'clsx';
import { FC, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { checkIsActive, KTSVG, WithChildren } from '@/_metronic/helpers';
import { Color } from '@/models';

type Props = {
  title: string;
  to: string;
  badged?: { color: Color; text: string | number };
  fontIcon?: string;
  hasArrow?: boolean;
  hasBullet?: boolean;
  icon?: string;
  isMega?: boolean;
  menuPlacement?: 'right-start' | 'bottom-start';
  menuTrigger?: 'click' | `{default:'click', lg: 'hover'}`;
};

const MenuInnerWithSub: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  menuTrigger,
  menuPlacement,
  hasArrow = false,
  hasBullet = false,
  isMega = false,
  badged,
}) => {
  const menuItemRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (menuItemRef.current && menuTrigger && menuPlacement) {
      menuItemRef.current.setAttribute('data-kt-menu-trigger', menuTrigger);
      menuItemRef.current.setAttribute('data-kt-menu-placement', menuPlacement);
    }
  }, [menuTrigger, menuPlacement]);

  return (
    <div ref={menuItemRef} className="menu-item menu-lg-down-accordion me-lg-1">
      <span
        className={clsx('menu-link py-3', {
          active: checkIsActive(pathname, to),
        })}
      >
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot" />
          </span>
        )}

        {icon && (
          <span className="menu-icon">
            <KTSVG className="svg-icon-2" path={icon} />
          </span>
        )}

        {fontIcon && (
          <span className="menu-icon">
            <i className={clsx('bi fs-3', fontIcon)} />
          </span>
        )}

        <span className="menu-title">{title}</span>

        {badged && (
          <small className={clsx('badge fw-light', `badge-${badged.color}`)}>{badged.text}</small>
        )}

        {hasArrow && <span className="menu-arrow" />}
      </span>
      <div
        className={clsx(
          'menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown',
          isMega ? 'w-100 w-lg-600px p-5 p-lg-5' : 'menu-rounded-0 py-lg-4 w-lg-225px'
        )}
        data-kt-menu-dismiss="true"
      >
        {children}
      </div>
    </div>
  );
};

export { MenuInnerWithSub };
