import { FC } from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';

const Item1: FC = () => {
  return (
    <div className="timeline-item">
      <div className="timeline-line w-40px" />

      <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
        <div className="symbol-label bg-light">
          <KTSVG
            className="svg-icon-2 svg-icon-gray-500"
            path="/media/icons/duotune/communication/com003.svg"
          />
        </div>
      </div>

      <div className="timeline-content mb-10 mt-n1">
        <div className="pe-3 mb-5">
          <div className="fs-5 fw-bold mb-2">
            There are 2 new tasks for you in “AirPlus Mobile APp” project:
          </div>

          <div className="d-flex align-items-center mt-1 fs-6">
            <div className="text-muted me-2 fs-7">Added at 4:23 PM by</div>

            <div
              className="symbol symbol-circle symbol-25px"
              data-bs-boundary="window"
              data-bs-placement="top"
              data-bs-toggle="tooltip"
              title="Nina Nilson"
            >
              <img alt="img" src={toAbsoluteUrl('/media/avatars/300-14.jpg')} />
            </div>
          </div>
        </div>

        <div className="overflow-auto pb-5">
          <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-5">
            <a className="fs-5 text-dark text-hover-primary fw-bold w-375px min-w-200px" href="#">
              Meeting with customer
            </a>

            <div className="min-w-175px pe-2">
              <span className="badge badge-light text-muted">Application Design</span>
            </div>

            <div className="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px pe-2">
              <div className="symbol symbol-circle symbol-25px">
                <img alt="img" src={toAbsoluteUrl('/media/avatars/300-2.jpg')} />
              </div>

              <div className="symbol symbol-circle symbol-25px">
                <img alt="img" src={toAbsoluteUrl('/media/avatars/300-14.jpg')} />
              </div>

              <div className="symbol symbol-circle symbol-25px">
                <div className="symbol-label fs-8 fw-bold bg-primary text-inverse-primary">A</div>
              </div>
            </div>

            <div className="min-w-125px pe-2">
              <span className="badge badge-light-primary">In Progress</span>
            </div>

            <a className="btn btn-sm btn-light btn-active-light-primary" href="#">
              View
            </a>
          </div>

          <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-0">
            <a className="fs-5 text-dark text-hover-primary fw-bold w-375px min-w-200px" href="#">
              Project Delivery Preparation
            </a>

            <div className="min-w-175px">
              <span className="badge badge-light text-muted">CRM System Development</span>
            </div>

            <div className="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px">
              <div className="symbol symbol-circle symbol-25px">
                <img alt="img" src={toAbsoluteUrl('/media/avatars/300-20.jpg')} />
              </div>

              <div className="symbol symbol-circle symbol-25px">
                <div className="symbol-label fs-8 fw-bold bg-success text-inverse-primary">B</div>
              </div>
            </div>

            <div className="min-w-125px">
              <span className="badge badge-light-success">Completed</span>
            </div>

            <a className="btn btn-sm btn-light btn-active-light-primary" href="#">
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Item1 };
