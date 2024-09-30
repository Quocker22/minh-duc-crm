import { ILayout } from '@/_metronic/layout/core/LayoutModels';

export const DefaultLayoutConfig: ILayout = {
  aside: {
    display: true,
    fixed: true,
    hoverable: true,
    menu: 'main',
    menuIcon: 'svg',
    minimize: true,
    minimized: false,
    theme: 'dark',
  },
  content: {
    // Set fixed|fluid to change width
    layout: 'default',
    width: 'fluid',
  },
  footer: {
    width: 'fluid', // Set fixed|fluid to change width type
  },
  header: {
    display: true,

    fixed: {
      desktop: true, // Set true|false to set fixed Header for desktop mode
      tabletAndMobile: true, // Set true|false to set fixed Header for tablet and mobile modes
    },

    // Set fixed|fluid to change width type
    left: 'menu',

    menuIcon: 'svg',

    // Set true|false to show or hide Header
    width: 'fluid',
  },
  loader: {
    display: true,
    type: 'default', // Set default|spinner-message|spinner-logo to hide or show page loader
  },
  main: {
    darkSkinEnabled: true,
    primaryColor: '#0A0434',
    type: 'default',
  },
  megaMenu: {
    display: true, // Set true|false to show or hide Mega Menu
  },
  pageTitle: {
    breadCrumbs: true,
    description: false,
    direction: 'row',
    display: true,
    layout: 'default',
    responsive: true,
    responsiveBreakpoint: 'lg',
    responsiveTarget: '#kt_toolbar_container',
  },
  scrolltop: {
    display: true,
  },
  toolbar: {
    display: true,

    // Set fixed|fluid to change width type,
    fixed: {
      desktop: true,
      tabletAndMobileMode: true,
    },

    layout: 'toolbar1',

    layouts: {
      toolbar1: {
        height: '55px',
        heightAndTabletMobileMode: '55px',
      },
      toolbar2: {
        height: '75px',
        heightAndTabletMobileMode: '65px',
      },
      toolbar3: {
        height: '55px',
        heightAndTabletMobileMode: '55px',
      },
      toolbar4: {
        height: '65px',
        heightAndTabletMobileMode: '65px',
      },
      toolbar5: {
        height: '75px',
        heightAndTabletMobileMode: '65px',
      },
    },

    // Display toolbar
    width: 'fluid',
  },
};
