import { FC } from 'react';

const Dropdown3: FC = () => {
  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Payments</div>
      </div>

      <div className="menu-item px-3">
        <a className="menu-link px-3" href="#">
          Create Invoice
        </a>
      </div>

      <div className="menu-item px-3">
        <a className="menu-link flex-stack px-3" href="#">
          Create Payment
          <i
            className="fas fa-exclamation-circle ms-2 fs-7"
            data-bs-toggle="tooltip"
            title="Specify a target name for future usage and reference"
          />
        </a>
      </div>

      <div className="menu-item px-3">
        <a className="menu-link px-3" href="#">
          Generate Bill
        </a>
      </div>

      <div
        className="menu-item px-3"
        data-kt-menu-flip="center, top"
        data-kt-menu-placement="left-start"
        data-kt-menu-trigger="hover"
      >
        <a className="menu-link px-3" href="#">
          <span className="menu-title">Subscription</span>
          <span className="menu-arrow" />
        </a>

        <div className="menu-sub menu-sub-dropdown w-175px py-4">
          <div className="menu-item px-3">
            <a className="menu-link px-3" href="#">
              Plans
            </a>
          </div>

          <div className="menu-item px-3">
            <a className="menu-link px-3" href="#">
              Billing
            </a>
          </div>

          <div className="menu-item px-3">
            <a className="menu-link px-3" href="#">
              Statements
            </a>
          </div>

          <div className="separator my-2" />

          <div className="menu-item px-3">
            <div className="menu-content px-3">
              <label className="form-check form-switch form-check-custom form-check-solid">
                <input
                  className="form-check-input w-30px h-20px"
                  name="notifications"
                  type="checkbox"
                  value="1"
                  checked
                />

                <span className="form-check-label text-muted fs-6">Recuring</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-item px-3 my-1">
        <a className="menu-link px-3" href="#">
          Settings
        </a>
      </div>
    </div>
  );
};

export { Dropdown3 };
