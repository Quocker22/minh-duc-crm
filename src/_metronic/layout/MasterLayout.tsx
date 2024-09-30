import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { MenuComponent } from '@/_metronic/assets/ts/components';
import { AsideDefault } from '@/_metronic/layout/components/aside/AsideDefault';
import { Content } from '@/_metronic/layout/components/Content';
import { Footer } from '@/_metronic/layout/components/Footer';
import { HeaderWrapper } from '@/_metronic/layout/components/header/HeaderWrapper';
import { ScrollTop } from '@/_metronic/layout/components/ScrollTop';
import { Toolbar } from '@/_metronic/layout/components/toolbar/Toolbar';
import { PageDataProvider } from '@/_metronic/layout/core';
import { ThemeModeProvider } from '@/_metronic/partials';

const MasterLayout = () => {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, [location.key]);

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className="page d-flex flex-row flex-column-fluid">
          <AsideDefault />
          <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
            <HeaderWrapper />

            <div className="d-flex flex-column flex-column-fluid" id="kt_content">
              <Toolbar />
              <div className="post d-flex flex-column-fluid" id="kt_post">
                <Content>
                  <Outlet />
                </Content>
              </div>
            </div>
            <Footer />
          </div>
        </div>

        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  );
};

export { MasterLayout };
