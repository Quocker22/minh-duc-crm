import clsx from 'clsx';
import { FC } from 'react';

import { DefaultTitle } from '@/_metronic/layout/components/header/page-title/DefaultTitle';
import { useLayout } from '@/_metronic/layout/core';

const Toolbar1: FC = () => {
  const { classes } = useLayout();

  return (
    <div className="toolbar" id="kt_toolbar">
      {/* begin::Container */}
      <div
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
        id="kt_toolbar_container"
      >
        <DefaultTitle />
      </div>
      {/* end::Container */}
    </div>
  );
};

export { Toolbar1 };
