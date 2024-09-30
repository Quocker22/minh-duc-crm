export interface ILoader {
  type: 'default' | 'spinner-message' | 'spinner-logo';
  display?: boolean;
}

export interface IScrollTop {
  display: boolean;
}

export interface IHeader {
  display: boolean;
  fixed: {
    desktop: boolean;
    tabletAndMobile: boolean;
  };
  left: 'menu' | 'page-title';
  menuIcon: 'svg' | 'font';
  width: 'fixed' | 'fluid';
}

export interface IMegaMenu {
  display: boolean;
}

export interface IAside {
  display: boolean;

  // Set aside menu(main|documentation)
  fixed: boolean;

  // Allow aside minimize toggle
  hoverable: boolean;

  // Set aside theme(dark|light)
  menu: 'main' | 'documentation';

  // Allow aside hovering when minimized
  menuIcon: 'svg' | 'font'; // Set aside minimized by default
  minimize: boolean;

  // Enable aside fixed mode
  minimized: boolean;

  // Display aside
  theme: 'dark' | 'light'; // Menu icon type(svg|font)
}

export interface IContent {
  layout: 'default' | 'docs';
  width: 'fixed' | 'fluid';
}

export interface IFooter {
  width: 'fixed' | 'fluid';
}

export interface ISidebar {
  bgColor: 'bg-body' | 'bg-info';
  content: 'general' | 'user' | 'shop';
  display: boolean;
  displayFooter: boolean;
  displayFooterButton: boolean;
  shown: boolean;
  toggle: boolean;
}

export interface IToolbar {
  display: boolean;
  fixed: {
    desktop: boolean; // Set fixed header for desktop
    tabletAndMobileMode: boolean; // Set fixed header for talet & mobile
  };
  layout: 'toolbar1' | 'toolbar2' | 'toolbar3' | 'toolbar4' | 'toolbar5';
  layouts: {
    toolbar1: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar2: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar3: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar4: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar5: {
      height: string;
      heightAndTabletMobileMode: string;
    };
  };
  width: 'fixed' | 'fluid';
}

export interface IPageTitle {
  breadCrumbs: boolean;
  description: boolean;
  direction: 'row' | 'column';
  display: boolean;
  layout: 'default' | 'select';
  responsive: boolean;
  responsiveBreakpoint: 'lg' | 'md' | 'lg' | '300px';
  responsiveTarget: string;
}

export interface IMain {
  darkSkinEnabled: boolean;
  primaryColor: string;
  type: 'blank' | 'default' | 'none';
  body?: {
    class: string;
    backgroundImage?: string;
  };
}

export interface ILayout {
  aside: IAside;
  content: IContent;
  footer: IFooter;
  header: IHeader;
  loader: ILoader;
  megaMenu: IMegaMenu;
  scrolltop: IScrollTop;
  toolbar: IToolbar;
  main?: IMain;
  pageTitle?: IPageTitle;
  sidebar?: ISidebar;
}

export interface ILayoutCSSClasses {
  aside: Array<string>;
  asideMenu: Array<string>;
  asideToggle: Array<string>;
  content: Array<string>;
  contentContainer: Array<string>;
  footerContainer: Array<string>;
  header: Array<string>;
  headerContainer: Array<string>;
  headerMenu: Array<string>;
  headerMobile: Array<string>;
  pageTitle: Array<string>;
  sidebar: Array<string>;
  toolbar: Array<string>;
  toolbarContainer: Array<string>;
}

export interface ILayoutHTMLAttributes {
  asideMenu: Map<string, string | number | boolean>;
  headerContainer: Map<string, string | number | boolean>;
  headerMenu: Map<string, string | number | boolean>;
  headerMobile: Map<string, string | number | boolean>;
  pageTitle: Map<string, string | number | boolean>;
}

export interface ILayoutCSSVariables {
  body: Map<string, string | number | boolean>;
}
