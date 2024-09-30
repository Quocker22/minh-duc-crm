import { KTSVG } from '@/_metronic/helpers';

const RoleListFilter = () => {
  return (
    <>
      {/* begin::Filter Button */}
      <button
        className="btn btn-light-primary me-3"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-trigger="click"
        type="button"
      >
        <KTSVG className="svg-icon-2" path="/media/icons/duotune/general/gen031.svg" />
        Filter
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className="menu menu-sub menu-sub-dropdown w-300px w-md-325px" data-kt-menu="true">
        {/* begin::Header */}
        <div className="px-7 py-5">
          <div className="fs-5 text-dark fw-bolder">Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className="separator border-gray-200" />
        {/* end::Separator */}

        {/* begin::Content */}
        <div className="px-7 py-5" data-kt-user-table-filter="form">
          {/* begin::Input group */}
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Role:</label>
            <select
              className="form-select form-select-solid fw-bolder"
              data-allow-clear="true"
              data-hide-search="true"
              data-kt-select2="true"
              data-kt-user-table-filter="role"
              data-placeholder="Select option"
            >
              <option value="" />
              <option value="Administrator">Administrator</option>
              <option value="Analyst">Analyst</option>
              <option value="Developer">Developer</option>
              <option value="Support">Support</option>
              <option value="Trial">Trial</option>
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Last login:</label>
            <select
              className="form-select form-select-solid fw-bolder"
              data-allow-clear="true"
              data-hide-search="true"
              data-kt-select2="true"
              data-kt-user-table-filter="two-step"
              data-placeholder="Select option"
            >
              <option value="" />
              <option value="Yesterday">Yesterday</option>
              <option value="20 mins ago">20 mins ago</option>
              <option value="5 hours ago">5 hours ago</option>
              <option value="2 days ago">2 days ago</option>
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Actions */}
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-light btn-active-light-primary fw-bold me-2 px-6"
              data-kt-menu-dismiss="true"
              data-kt-user-table-filter="reset"
              type="button"
            >
              Reset
            </button>
            <button
              className="btn btn-primary fw-bold px-6"
              data-kt-menu-dismiss="true"
              data-kt-user-table-filter="filter"
              type="button"
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  );
};

export { RoleListFilter };
