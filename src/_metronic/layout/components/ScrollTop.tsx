import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import {
  DrawerComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
} from '@/_metronic/assets/ts/components';
import { KTSVG } from '@/_metronic/helpers';

export function ScrollTop() {
  const { pathname } = useLocation();
  const isFirstRun = useRef(true);

  const pluginsReinitialization = () => {
    setTimeout(() => {
      StickyComponent.reInitialization();
      setTimeout(() => {
        ToggleComponent.reinitialization();
        DrawerComponent.reinitialization();
      }, 70);
    }, 140);
  };

  const scrollTop = () => {
    ScrollTopComponent.goTop();
  };

  const updateHeaderSticky = () => {
    const stickyHeader = document.body.querySelectorAll(`[data-kt-sticky-name="header"]`);
    if (stickyHeader && stickyHeader.length > 0) {
      const sticky = StickyComponent.getInstance(stickyHeader[0] as HTMLElement);
      if (sticky) {
        sticky.update();
      }
    }
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      pluginsReinitialization();
    }

    updateHeaderSticky();
    setTimeout(() => {
      scrollTop();
    }, 0);
  }, [pathname]);

  return (
    <div className="scrolltop" data-kt-scrolltop="true" id="kt_scrolltop">
      <KTSVG path="/media/icons/duotune/arrows/arr066.svg" />
    </div>
  );
}
