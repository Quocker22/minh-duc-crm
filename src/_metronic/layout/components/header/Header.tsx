import React, { FC } from 'react';

import { MenuInner } from '@/_metronic/layout/components/header/MenuInner';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { useAuth } from '@/hooks/useAuth';
import { getHRRoleColor, trans } from '@/utils';

const Header: FC = () => {
  const { currentUser } = useAuth();
  const roleColor = getHRRoleColor(currentUser?.account_type);

  return (
    <div
      className="header-menu align-items-stretch"
      data-kt-drawer="true"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-direction="end"
      data-kt-drawer-name="header-menu"
      data-kt-drawer-overlay="true"
      data-kt-drawer-toggle="#kt_header_menu_mobile_toggle"
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-swapper="true"
      data-kt-swapper-mode="prepend"
      data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
    >
      <div
        className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-center"
        data-kt-menu="true"
        id="#kt_header_menu"
      >
        <MenuInner />
        <h1 className="d-flex flex-column text-dark fw-bold my-0 fs-1 align-items-center">
          <div className="d-flex flex-column">
            {trans('GENERAL.HELLO')} {currentUser?.name}
            <small className="text-muted fs-6 fw-semibold ms-1 pt-1">
              <TableTagCell className="py-1 px-5 rounded-pill fs-6" color={roleColor?.color}>
                {roleColor?.role}
              </TableTagCell>
            </small>
          </div>
        </h1>
      </div>
    </div>
  );
};

export { Header };
