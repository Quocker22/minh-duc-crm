import { FC } from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';

const Item5: FC = () => {
  return (
    <div className="timeline-item">
      <div className="timeline-line w-40px" />

      <div className="timeline-icon symbol symbol-circle symbol-40px">
        <div className="symbol-label bg-light">
          <KTSVG
            className="svg-icon-2 svg-icon-gray-500"
            path="/media/icons/duotune/art/art005.svg"
          />
        </div>
      </div>

      <div className="timeline-content mb-10 mt-n1">
        <div className="pe-3 mb-5">
          <div className="fs-5 fw-bold mb-2">3 new application design concepts added:</div>

          <div className="d-flex align-items-center mt-1 fs-6">
            <div className="text-muted me-2 fs-7">Created at 4:23 PM by</div>

            <div
              className="symbol symbol-circle symbol-25px"
              data-bs-boundary="window"
              data-bs-placement="top"
              data-bs-toggle="tooltip"
              title="Marcus Dotson"
            >
              <img alt="img" src={toAbsoluteUrl('/media/avatars/300-2.jpg')} />
            </div>
          </div>
        </div>

        <div className="overflow-auto pb-5">
          <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-7">
            <div className="overlay me-10">
              <div className="overlay-wrapper">
                <img
                  alt="img"
                  className="rounded w-200px"
                  src={toAbsoluteUrl('/media/demos/demo1.png')}
                />
              </div>

              <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                <a className="btn btn-sm btn-primary btn-shadow" href="#">
                  Explore
                </a>
              </div>
            </div>

            <div className="overlay me-10">
              <div className="overlay-wrapper">
                <img
                  alt="img"
                  className="rounded w-200px"
                  src={toAbsoluteUrl('/media/demos/demo2.png')}
                />
              </div>

              <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                <a className="btn btn-sm btn-primary btn-shadow" href="#">
                  Explore
                </a>
              </div>
            </div>

            <div className="overlay">
              <div className="overlay-wrapper">
                <img
                  alt="img"
                  className="rounded w-200px"
                  src={toAbsoluteUrl('/media/demos/demo3.png')}
                />
              </div>

              <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                <a className="btn btn-sm btn-primary btn-shadow" href="#">
                  Explore
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Item5 };
