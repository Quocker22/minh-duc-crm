import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { DrawerComponent } from '@/_metronic/assets/ts/components';
import { WithChildren } from '@/_metronic/helpers';
import { useLayout } from '@/_metronic/layout/core';

const Content: FC<WithChildren> = ({ children }) => {
  const { classes } = useLayout();
  const location = useLocation();
  useEffect(() => {
    DrawerComponent.hideAll();
  }, [location]);

  return (
    <div className={clsx(classes.contentContainer.join(' '))} id="kt_content_container">
      {children}
    </div>
  );
};

export { Content };
