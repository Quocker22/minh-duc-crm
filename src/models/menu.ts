import { Color } from '@/models/common';

interface AsideItemModel {
  fontIcon?: string;
  hasBullet?: boolean;
  icon?: string;
  isContent?: boolean;
}

interface MenuItemModel {
  fontIcon?: string;
  hasArrow?: boolean;
  hasBullet?: boolean;
  icon?: string;
  isMega?: boolean;
  menuPlacement?: 'right-start' | 'bottom-start';
  menuTrigger?: 'click' | "{default:'click', lg: 'hover'}";
}

export type MenuModel = {
  to: string;
  badged?: { color: Color; text: string | number };
  children?: MenuModel[];
  fontIcon?: string;
  hasBullet?: boolean;
  icon?: string;
} & (
  | {
      title: string;
      aside?: AsideItemModel & { title?: string };
      menu?: MenuItemModel & { title?: string };
    }
  | {
      aside: AsideItemModel & { title: string };
      menu: MenuItemModel & { title: string };
      title?: string;
    }
);
