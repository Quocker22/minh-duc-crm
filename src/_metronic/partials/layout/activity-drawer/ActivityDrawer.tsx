import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { KTSVG } from '@/_metronic/helpers';
import { Item1 } from '@/_metronic/partials/content/activity/Item1';
import { Item2 } from '@/_metronic/partials/content/activity/Item2';
import { Item3 } from '@/_metronic/partials/content/activity/Item3';
import { Item4 } from '@/_metronic/partials/content/activity/Item4';
import { Item5 } from '@/_metronic/partials/content/activity/Item5';
import { Item6 } from '@/_metronic/partials/content/activity/Item6';
import { Item7 } from '@/_metronic/partials/content/activity/Item7';
import { Item8 } from '@/_metronic/partials/content/activity/Item8';

const ActivityDrawer: FC = () => (
  <div
    className="bg-body"
    data-kt-drawer="true"
    data-kt-drawer-activate="true"
    data-kt-drawer-close="#kt_activities_close"
    data-kt-drawer-direction="end"
    data-kt-drawer-name="activities"
    data-kt-drawer-overlay="true"
    data-kt-drawer-toggle="#kt_activities_toggle"
    data-kt-drawer-width="{default:'300px', 'lg': '900px'}"
    id="kt_activities"
  >
    <div className="card shadow-none rounded-0">
      <div className="card-header" id="kt_activities_header">
        <h3 className="card-title fw-bolder text-dark">Activity Logs</h3>

        <div className="card-toolbar">
          <button
            className="btn btn-sm btn-icon btn-active-light-primary me-n5"
            id="kt_activities_close"
            type="button"
          >
            <KTSVG className="svg-icon-1" path="/media/icons/duotune/arrows/arr061.svg" />
          </button>
        </div>
      </div>
      <div className="card-body position-relative" id="kt_activities_body">
        <div
          className="position-relative scroll-y me-n5 pe-5"
          data-kt-scroll="true"
          data-kt-scroll-dependencies="#kt_activities_header, #kt_activities_footer"
          data-kt-scroll-height="auto"
          data-kt-scroll-offset="5px"
          data-kt-scroll-wrappers="#kt_activities_body"
          id="kt_activities_scroll"
        >
          <div className="timeline">
            <Item1 />
            <Item2 />
            <Item3 />
            <Item4 />
            <Item5 />
            <Item6 />
            <Item7 />
            <Item8 />
          </div>
        </div>
      </div>
      <div className="card-footer py-5 text-center" id="kt_activities_footer">
        <Link className="btn btn-bg-body text-primary" to="/crafted/pages/profile">
          View All Activities
          <KTSVG
            className="svg-icon-3 svg-icon-primary"
            path="/media/icons/duotune/arrows/arr064.svg"
          />
        </Link>
      </div>
    </div>
  </div>
);

export { ActivityDrawer };
