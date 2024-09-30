import { Drawer as DrawerAntd } from 'antd';
import React, { CSSProperties, ReactNode } from 'react';

import { WithChildren } from '@/_metronic/helpers';
import { PlacementDrawerType, SizeDrawerType } from '@/models';

interface IProps extends WithChildren {
  className?: string;
  closeIcon?: ReactNode;
  contentWrapperStyle?: CSSProperties;
  destroyOnClose?: boolean;
  drawerStyle?: CSSProperties;
  extra?: ReactNode;
  footer?: ReactNode;
  footerStyle?: CSSProperties;
  forceRender?: boolean;
  headerStyle?: CSSProperties;
  height?: string | number;
  isAutoFocus?: boolean;
  isOpen?: boolean;
  keyboard?: boolean;
  onClose?: () => void;
  placement?: PlacementDrawerType;
  size?: SizeDrawerType;
  style?: CSSProperties;
  title?: string;
  width?: string | number;
  zIndex?: number;
}

const Drawer: React.FC<IProps> = (props) => {
  return (
    <DrawerAntd
      autoFocus={props.isAutoFocus}
      className={props.className}
      closeIcon={props.closeIcon}
      contentWrapperStyle={props.contentWrapperStyle}
      destroyOnClose={props.destroyOnClose}
      drawerStyle={props.drawerStyle}
      extra={props.extra}
      footer={props.footer}
      footerStyle={props.footerStyle}
      forceRender={props.forceRender}
      headerStyle={props.headerStyle}
      height={props.height}
      keyboard={props.keyboard}
      onClose={props.onClose}
      open={props.isOpen}
      placement={props.placement}
      size={props.size}
      style={props.style}
      title={props.title}
      width={props.width}
      zIndex={props.zIndex}
    >
      {props.children}
    </DrawerAntd>
  );
};

export { Drawer };
