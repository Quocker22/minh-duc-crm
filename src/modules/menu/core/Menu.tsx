import { FC, useEffect } from 'react';

import { WithChildren } from '@/_metronic/helpers';
import { useMenu } from '@/hooks/useMenu';

const MenuInit: FC<WithChildren> = ({ children }) => {
  const { setDefaultMenuList } = useMenu();

  useEffect(() => {
    setDefaultMenuList();
  }, []);

  return <>{children}</>;
};

export { MenuInit };
