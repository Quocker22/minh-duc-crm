import { FC } from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';

const Item4: FC = () => {
  return (
    <div className="timeline-item">
      <div className="timeline-line w-40px" />

      <div className="timeline-icon symbol symbol-circle symbol-40px">
        <div className="symbol-label bg-light">
          <KTSVG
            className="svg-icon-2 svg-icon-gray-500"
            path="/media/icons/duotune/abstract/abs027.svg"
          />
        </div>
      </div>

      <div className="timeline-content mb-10 mt-n1">
        <div className="pe-3 mb-5">
          <div className="fs-5 fw-bold mb-2">
            Task{' '}
            <a className="text-primary fw-bolder me-1" href="#">
              #45890
            </a>
            merged with{' '}
            <a className="text-primary fw-bolder me-1" href="#">
              #45890
            </a>{' '}
            in “Ads Pro Admin Dashboard project:
          </div>

          <div className="d-flex align-items-center mt-1 fs-6">
            <div className="text-muted me-2 fs-7">Initiated at 4:23 PM by</div>

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
      </div>
    </div>
  );
};

export { Item4 };
