import clsx from 'clsx';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useLayout } from '@/_metronic/layout/core/LayoutProvider';
import { usePageData } from '@/_metronic/layout/core/PageData';

const DefaultTitle: FC = () => {
  const { pageTitle, pageBreadcrumbs } = usePageData();
  const { config, classes } = useLayout();

  return (
    <div
      className={clsx('page-title d-flex', classes.pageTitle.join(' '))}
      data-kt-swapper="true"
      data-kt-swapper-mode="prepend"
      data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
      id="kt_page_title"
    >
      {pageBreadcrumbs &&
        pageBreadcrumbs.length > 0 &&
        config.pageTitle &&
        config.pageTitle.breadCrumbs && (
          <>
            <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
              {Array.from(pageBreadcrumbs).map((item, index) => (
                <li
                  key={`${item.path}${index}`}
                  className={clsx('breadcrumb-item', {
                    'text-dark': !item.isSeparator && item.isActive,
                    'text-muted': !item.isSeparator && !item.isActive,
                  })}
                >
                  {!item.isSeparator ? (
                    <Link className="text-muted text-hover-primary fs-3" to={item.path}>
                      {item.title}
                    </Link>
                  ) : (
                    <span className="bullet bg-gray-200 w-5px h-2px" />
                  )}
                </li>
              ))}
              <li className="breadcrumb-item text-dark">{pageTitle}</li>
            </ul>
          </>
        )}
    </div>
  );
};

export { DefaultTitle };
