import React from 'react';

import { Toolbar1 } from '@/_metronic/layout/components/toolbar/Toolbar1';
import { useLayout } from '@/_metronic/layout/core/LayoutProvider';

const Toolbar = () => {
  const { config } = useLayout();

  switch (config.toolbar.layout) {
    case 'toolbar1':
      return <Toolbar1 />;

    default:
      return <Toolbar1 />;
  }
};

export { Toolbar };
