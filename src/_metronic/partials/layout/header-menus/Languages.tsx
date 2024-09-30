import clsx from 'clsx';
import { FC } from 'react';

import { toAbsoluteUrl } from '@/_metronic/helpers';
import { setLanguage, useLang } from '@/_metronic/i18n/Metronici18n';
import { trans } from '@/utils';

const languages = [
  {
    flag: toAbsoluteUrl('/media/flags/united-states.svg'),
    lang: 'en',
    name: 'English',
  },
  {
    flag: toAbsoluteUrl('/media/flags/vietnam.svg'),
    lang: 'vi',
    name: 'Việt Nam',
  },
];

const Languages: FC = () => {
  const lang = useLang();
  const currentLanguage = languages.find((x) => x.lang === lang);

  return (
    <div
      className="menu-item px-5"
      data-kt-menu-flip="bottom"
      data-kt-menu-placement="left-start"
      data-kt-menu-trigger="hover"
    >
      <a className="menu-link px-5" href="#">
        <span className="menu-title position-relative">
          {trans('GENERAL.LANGUAGE')}
          <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">
            {currentLanguage?.name}{' '}
            <img
              alt="metronic"
              className="w-15px h-15px rounded-1 ms-2"
              src={currentLanguage?.flag}
            />
          </span>
        </span>
      </a>

      <div className="menu-sub menu-sub-dropdown w-175px py-4">
        {languages.map((l) => (
          <div
            key={l.lang}
            className="menu-item px-3"
            onClick={() => {
              setLanguage(l.lang);
            }}
          >
            <a
              className={clsx('menu-link d-flex px-5', {
                active: l.lang === currentLanguage?.lang,
              })}
              href="#"
            >
              <span className="symbol symbol-20px me-4">
                <img alt="metronic" className="rounded-1" src={l.flag} />
              </span>
              {l.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Languages };
