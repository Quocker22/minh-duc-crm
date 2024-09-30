import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/de';
import '@formatjs/intl-relativetimeformat/locale-data/es';
import '@formatjs/intl-relativetimeformat/locale-data/fr';
import '@formatjs/intl-relativetimeformat/locale-data/ja';
import '@formatjs/intl-relativetimeformat/locale-data/zh';
import '@formatjs/intl-relativetimeformat/locale-data/vi';

import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import viVN from 'antd/es/locale/vi_VN';
import { FC } from 'react';
import { IntlProvider } from 'react-intl';

import { WithChildren } from '@/_metronic/helpers';
import enMessages from '@/_metronic/i18n/messages/en.json';
import viMessages from '@/_metronic/i18n/messages/vi.json';
import { useLang } from '@/_metronic/i18n/Metronici18n';

const allMessages = {
  en: { messages: enMessages, theme: enUS },
  vi: { messages: viMessages, theme: viVN },
};

const I18nProvider: FC<WithChildren> = ({ children }) => {
  const locale = useLang();
  const { messages, theme } = allMessages[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      <ConfigProvider locale={theme}>{children}</ConfigProvider>
    </IntlProvider>
  );
};

export { I18nProvider };
