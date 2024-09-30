import clsx from 'clsx';

import { KTSVG } from '@/_metronic/helpers';
import {
  ThemeModeType,
  useThemeMode,
} from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';
import { trans } from '@/utils/translator/common';

type Props = {
  menuPlacement?: string;
  menuTrigger?: string;
  toggleBtnClass?: string;
  toggleBtnIconClass?: string;
};

const ThemeModeSwitcher = ({
  toggleBtnClass = '',
  toggleBtnIconClass = 'svg-icon-2',
  menuPlacement = 'bottom-end',
  menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {
  const { mode, menuMode, updateMode, updateMenuMode } = useThemeMode();
  const switchMode = (_mode: ThemeModeType) => {
    updateMenuMode(_mode);
    updateMode(_mode);
  };

  return (
    <>
      {/* begin::Menu toggle */}
      <a
        className={clsx('btn btn-icon ', toggleBtnClass)}
        data-kt-menu-attach="parent"
        data-kt-menu-placement={menuPlacement}
        data-kt-menu-trigger={menuTrigger}
        href="#"
      >
        {mode === 'dark' && (
          <KTSVG
            className={clsx('theme-light-hide', toggleBtnIconClass)}
            path="/media/icons/duotune/general/gen061.svg"
          />
        )}

        {mode === 'light' && (
          <KTSVG
            className={clsx('theme-dark-hide', toggleBtnIconClass)}
            path="/media/icons/duotune/general/gen060.svg"
          />
        )}
      </a>
      {/* begin::Menu toggle */}

      {/* begin::Menu */}
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px"
        data-kt-menu="true"
      >
        {/* begin::Menu item */}
        <div className="menu-item px-3 my-0">
          <button
            className={clsx('menu-link px-3 py-2 fake-link', {
              active: menuMode === 'light',
            })}
            onClick={() => switchMode('light')}
            type="button"
          >
            <span className="menu-icon" data-kt-element="icon">
              <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen060.svg" />
            </span>
            <span className="menu-title">{trans('THEME.LIGHT')}</span>
          </button>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className="menu-item px-3 my-0">
          <button
            className={clsx('menu-link px-3 py-2 fake-link', {
              active: menuMode === 'dark',
            })}
            onClick={() => switchMode('dark')}
            type="button"
          >
            <span className="menu-icon" data-kt-element="icon">
              <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen061.svg" />
            </span>
            <span className="menu-title">{trans('THEME.DARK')}</span>
          </button>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className="menu-item px-3 my-0">
          <button
            className={clsx('menu-link px-3 py-2 fake-link', {
              active: menuMode === 'system',
            })}
            onClick={() => switchMode('system')}
            type="button"
          >
            <span className="menu-icon" data-kt-element="icon">
              <KTSVG className="svg-icon-3" path="/media/icons/duotune/general/gen062.svg" />
            </span>
            <span className="menu-title">{trans('THEME.SYSTEM')}</span>
          </button>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  );
};

export { ThemeModeSwitcher };
