import React, { FC } from 'react';

const ToggleHelpDrawer: FC = () => (
  <button
    className="engage-help-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm px-5 rounded-top-0"
    data-bs-dismiss="click"
    data-bs-placement="left"
    data-bs-toggle="tooltip"
    data-bs-trigger="hover"
    id="kt_help_toggle"
    title="Learn & Get Inspired"
  >
    Help
  </button>
);

export { ToggleHelpDrawer };
