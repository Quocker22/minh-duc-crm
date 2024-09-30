import React, { FC } from 'react';

import { KTSVG } from '@/_metronic/helpers';
import { ChatInner } from '@/_metronic/partials/chat/ChatInner';

const DrawerMessenger: FC = () => (
  <div
    className="bg-body"
    data-kt-drawer="true"
    data-kt-drawer-activate="true"
    data-kt-drawer-close="#kt_drawer_chat_close"
    data-kt-drawer-direction="end"
    data-kt-drawer-name="chat"
    data-kt-drawer-overlay="true"
    data-kt-drawer-toggle="#kt_drawer_chat_toggle"
    data-kt-drawer-width="{default:'300px', 'md': '500px'}"
    id="kt_drawer_chat"
  >
    <div className="card w-100 rounded-0" id="kt_drawer_chat_messenger">
      <div className="card-header pe-5" id="kt_drawer_chat_messenger_header">
        <div className="card-title">
          <div className="d-flex justify-content-center flex-column me-3">
            <a className="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1" href="#">
              Brian Cox
            </a>

            <div className="mb-0 lh-1">
              <span className="badge badge-success badge-circle w-10px h-10px me-1" />
              <span className="fs-7 fw-bold text-gray-400">Active</span>
            </div>
          </div>
        </div>

        <div className="card-toolbar">
          <div className="me-2">
            <button
              className="btn btn-sm btn-icon btn-active-light-primary"
              data-kt-menu-flip="top-end"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-trigger="click"
            >
              <i className="bi bi-three-dots fs-3" />
            </button>
          </div>

          <div className="btn btn-sm btn-icon btn-active-light-primary" id="kt_drawer_chat_close">
            <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr061.svg" />
          </div>
        </div>
      </div>

      <ChatInner isDrawer />
    </div>
  </div>
);

export { DrawerMessenger };
