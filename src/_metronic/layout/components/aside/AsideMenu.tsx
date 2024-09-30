import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import {
  DrawerComponent,
  ScrollComponent,
  ToggleComponent,
} from '@/_metronic/assets/ts/components';
import { AsideMenuMain } from '@/_metronic/layout/components/aside/AsideMenuMain';

type Props = {
  asideMenuCSSClasses: string[];
};

const AsideMenu: React.FC<Props> = ({ asideMenuCSSClasses }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      DrawerComponent.reinitialization();
      ToggleComponent.reinitialization();
      ScrollComponent.reinitialization();
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    }, 50);
  }, [pathname]);

  return (
    <div
      ref={scrollRef}
      className="hover-scroll-overlay-y my-5 my-lg-5"
      data-kt-scroll="true"
      data-kt-scroll-activate="{default: false, lg: true}"
      data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
      data-kt-scroll-height="auto"
      data-kt-scroll-offset="0"
      data-kt-scroll-wrappers="#kt_aside_menu"
      id="kt_aside_menu_wrapper"
    >
      <div
        className={clsx(
          'menu menu-column menu-title-white menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500',
          asideMenuCSSClasses.join(' ')
        )}
        data-kt-menu="true"
        id="#kt_aside_menu"
      >
        <AsideMenuMain />
      </div>
    </div>
  );
};

export { AsideMenu };
