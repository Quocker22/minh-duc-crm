import React, { createContext, useContext, useEffect, useState } from 'react';

import { ThemeModeComponent } from '@/_metronic/assets/ts/layout';
import { toAbsoluteUrl } from '@/_metronic/helpers';

export type ThemeModeType = 'dark' | 'light' | 'system';
const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark';

type ThemeModeContextType = {
  menuMode: ThemeModeType;
  mode: ThemeModeType;
  updateMenuMode: (_mode: ThemeModeType) => void;
  updateMode: (_mode: ThemeModeType) => void;
};

const themeModeSwitchHelper = (_mode: ThemeModeType) => {
  // change background image url
  const mode = _mode !== 'system' ? _mode : systemMode;
  const imageUrl = '/media/patterns/header-bg' + (mode === 'light' ? '.jpg' : '-dark.png');
  document.body.style.backgroundImage = `url("${toAbsoluteUrl(imageUrl)}")`;
};

const themeModeLSKey = 'kt_theme_mode_value';
const themeMenuModeLSKey = 'kt_theme_mode_menu';

const getThemeModeFromLocalStorage = (lsKey: string): ThemeModeType => {
  if (!localStorage) {
    return 'light';
  }

  const data = localStorage.getItem(lsKey);
  if (!data) {
    return 'light';
  }

  if (data === 'light') {
    return 'light';
  }

  if (data === 'dark') {
    return 'dark';
  }

  return 'system';
};

const defaultThemeMode: ThemeModeContextType = {
  menuMode: getThemeModeFromLocalStorage(themeMenuModeLSKey),
  mode: getThemeModeFromLocalStorage(themeModeLSKey),
  updateMenuMode: (_menuMode: ThemeModeType) => {
    /*empty*/
  },
  updateMode: (_mode: ThemeModeType) => {
    /*empty*/
  },
};

const ThemeModeContext = createContext<ThemeModeContextType>({
  menuMode: defaultThemeMode.menuMode,
  mode: defaultThemeMode.mode,
  updateMenuMode: (_menuMode: ThemeModeType) => {
    /*empty*/
  },
  updateMode: (_mode: ThemeModeType) => {
    /*empty*/
  },
});

const useThemeMode = () => useContext(ThemeModeContext);

const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeModeType>(defaultThemeMode.mode);
  const [menuMode, setMenuMode] = useState<ThemeModeType>(defaultThemeMode.menuMode);

  const updateMode = (_mode: ThemeModeType) => {
    const updatedMode = _mode === 'system' ? systemMode : _mode;
    setMode(updatedMode);

    // themeModeSwitchHelper(updatedMode)
    if (localStorage) {
      localStorage.setItem(themeModeLSKey, updatedMode);
    }

    document.documentElement.setAttribute('data-theme', updatedMode);
    ThemeModeComponent.init();
  };

  const updateMenuMode = (_menuMode: ThemeModeType) => {
    setMenuMode(_menuMode);
    if (localStorage) {
      localStorage.setItem(themeMenuModeLSKey, _menuMode);
    }
  };

  useEffect(() => {
    updateMode(mode);
    updateMenuMode(menuMode);
  }, []);

  return (
    <ThemeModeContext.Provider value={{ menuMode, mode, updateMenuMode, updateMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export { systemMode, ThemeModeProvider, themeModeSwitchHelper, useThemeMode };
