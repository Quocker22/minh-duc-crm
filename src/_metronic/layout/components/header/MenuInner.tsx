import { FC, memo } from 'react';

import { MenuInnerWithSub } from '@/_metronic/layout/components/header/MenuInnerWithSub';
import { MenuItem } from '@/_metronic/layout/components/header/MenuItem';
import { useMenu } from '@/hooks/useMenu';
import { MenuModel } from '@/models';

interface IProps {
  menuList: MenuModel[];
}

const MenuInnerItem: FC<IProps> = ({ menuList }) => {
  return (
    <div className="d-none">
      {menuList.map((menu) => {
        if (!menu.children) {
          return (
            <MenuItem
              key={JSON.stringify(menu)}
              badged={menu.badged}
              fontIcon={menu.menu?.fontIcon || menu.fontIcon}
              hasArrow={menu.menu?.hasArrow}
              hasBullet={menu.menu?.hasBullet || menu.hasBullet}
              icon={menu.menu?.icon || menu.icon}
              title={(menu.menu?.title || menu.title) as string}
              to={menu.to}
            />
          );
        }

        return (
          <MenuInnerWithSub
            key={JSON.stringify(menu)}
            badged={menu.badged}
            fontIcon={menu.menu?.fontIcon || menu.fontIcon}
            hasArrow={menu.menu?.hasArrow}
            hasBullet={menu.menu?.hasBullet || menu.hasBullet}
            icon={menu.menu?.icon || menu.icon}
            isMega={menu.menu?.isMega}
            menuPlacement={menu.menu?.menuPlacement}
            menuTrigger={menu.menu?.menuTrigger}
            title={(menu.menu?.title || menu.title) as string}
            to={menu.to}
          >
            <MenuInnerItem menuList={menu.children} />
          </MenuInnerWithSub>
        );
      })}
    </div>
  );
};

const MenuInner: FC = memo(() => {
  const { menuList } = useMenu();

  return <MenuInnerItem menuList={menuList} />;
});

export { MenuInner };
