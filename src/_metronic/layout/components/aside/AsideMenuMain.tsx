import { FC, memo } from 'react';

import { AsideMenuItem } from '@/_metronic/layout/components/aside/AsideMenuItem';
import { AsideMenuItemWithSub } from '@/_metronic/layout/components/aside/AsideMenuItemWithSub';
import { useMenu } from '@/hooks/useMenu';
import { MenuModel } from '@/models';

interface IProps {
  menuList: MenuModel[];
}

const AsideMenuMainItem: FC<IProps> = ({ menuList }) => {
  return (
    <>
      {menuList.map((menu) => {
        if (!menu.children) {
          return (
            <AsideMenuItem
              key={JSON.stringify(menu)}
              badged={menu.badged}
              fontIcon={menu.menu?.fontIcon || menu.fontIcon}
              hasBullet={menu.menu?.hasBullet || menu.hasBullet}
              icon={menu.menu?.icon || menu.icon}
              title={(menu.menu?.title || menu.title) as string}
              to={menu.to}
            />
          );
        }

        if (menu.aside?.isContent) {
          return (
            <div key={JSON.stringify(menu)}>
              <div className="menu-item">
                <div className="menu-content pt-8 pb-2">
                  <span className="text-white text-uppercase fs-8 ls-1">
                    {menu.menu?.title || menu.title}
                  </span>
                </div>
              </div>
              <AsideMenuMainItem menuList={menu.children} />
            </div>
          );
        }

        return (
          <AsideMenuItemWithSub
            key={JSON.stringify(menu)}
            badged={menu.badged}
            fontIcon={menu.menu?.fontIcon || menu.fontIcon}
            hasBullet={menu.menu?.hasBullet || menu.hasBullet}
            icon={menu.menu?.icon || menu.icon}
            title={(menu.menu?.title || menu.title) as string}
            to={menu.to}
          >
            <AsideMenuMainItem menuList={menu.children} />
          </AsideMenuItemWithSub>
        );
      })}
    </>
  );
};

const AsideMenuMain: FC = memo(() => {
  const { menuList } = useMenu();

  return <AsideMenuMainItem menuList={menuList} />;
});

export { AsideMenuMain };
