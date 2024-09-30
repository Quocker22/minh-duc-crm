import { TabPaneProps, Tabs as TabsAntd } from 'antd';
import React from 'react';

import { WithChildren } from '@/_metronic/helpers';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

interface Tab extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
}
interface IProps extends WithChildren {
  items: Tab[];
  activeKey?: string;
  children?: React.ReactNode;
  className?: string;
  defaultActiveKey?: string;
  destroyInactiveTabPane?: boolean;
  direction?: 'ltr' | 'rtl';
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  id?: string;
  key?: string;
  label?: React.ReactNode;
  moreIcon?: React.ReactNode;
  moreTransitionName?: string;
  onChange?: (activeKey: string) => void;
  onTabClick?: (activeKey: string, e: React.KeyboardEvent | React.MouseEvent) => void;
  popupClassName?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  tabBarGutter?: number;
  tabBarStyle?: React.CSSProperties;
  tabPosition?: TabPosition;
}

const Tabs: React.FC<IProps> = (props) => {
  return (
    <TabsAntd
      key={props.key}
      className={props.className}
      defaultActiveKey={props.defaultActiveKey}
      destroyInactiveTabPane={props.destroyInactiveTabPane}
      direction={props.direction}
      getPopupContainer={props.getPopupContainer}
      id={props.id}
      items={props.items.map((item, i) => {
        const id = String(i + 1);

        return {
          children: item.children,
          key: id,
          label: item.label,
        };
      })}
      moreIcon={props.moreIcon}
      moreTransitionName={props.moreTransitionName}
      onChange={props.onChange}
      onTabClick={props.onTabClick}
      popupClassName={props.popupClassName}
      prefixCls={props.prefixCls}
      style={props.style}
      tabBarGutter={props.tabBarGutter}
      tabBarStyle={props.tabBarStyle}
      tabPosition={props.tabPosition}
    />
  );
};

export { Tabs };
