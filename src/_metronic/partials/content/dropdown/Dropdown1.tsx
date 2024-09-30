import React from 'react';

export function Dropdown1() {
  return (
    <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true">
      <div className="px-7 py-5">
        <div className="fs-5 text-dark fw-bolder">Filter Options</div>
      </div>

      <div className="separator border-gray-200" />

      <div className="px-7 py-5">
        <div className="mb-10">
          <label className="form-label fw-bold">Status:</label>

          <div>
            <select
              className="form-select form-select-solid"
              data-allow-clear="true"
              data-kt-select2="true"
              data-placeholder="Select option"
              defaultValue={'1'}
            >
              <option />
              <option value="1">Approved</option>
              <option value="2">Pending</option>
              <option value="3">In Process</option>
              <option value="4">Rejected</option>
            </select>
          </div>
        </div>

        <div className="mb-10">
          <label className="form-label fw-bold">Member Type:</label>

          <div className="d-flex">
            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
              <input className="form-check-input" type="checkbox" value="1" />
              <span className="form-check-label">Author</span>
            </label>

            <label className="form-check form-check-sm form-check-custom form-check-solid">
              <input className="form-check-input" type="checkbox" value="2" defaultChecked />
              <span className="form-check-label">Customer</span>
            </label>
          </div>
        </div>

        <div className="mb-10">
          <label className="form-label fw-bold">Notifications:</label>

          <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
            <input
              className="form-check-input"
              name="notifications"
              type="checkbox"
              value=""
              defaultChecked
            />
            <label className="form-check-label">Enabled</label>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button
            className="btn btn-sm btn-white btn-active-light-primary me-2"
            data-kt-menu-dismiss="true"
            type="reset"
          >
            Reset
          </button>

          <button className="btn btn-sm btn-primary" data-kt-menu-dismiss="true" type="submit">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
