import { FC } from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';

type Props = {
  description: string;
  image: string;
  progress: number;
  progressType: string;
  status: 'up' | 'down';
  statusDesc: string;
  statusValue: number;
  title: string;
};

const Card5: FC<Props> = ({
  image,
  title,
  description,
  status,
  statusValue,
  statusDesc,
  progress,
  progressType,
}) => {
  return (
    <div className="card h-100">
      <div className="card-header flex-nowrap border-0 pt-9">
        <div className="card-title m-0">
          <div className="symbol symbol-45px w-45px bg-light me-5">
            <img alt="Metronic" className="p-3" src={toAbsoluteUrl(image)} />
          </div>

          <a className="fs-4 fw-bold text-hover-primary text-gray-600 m-0" href="#">
            {title}
          </a>
        </div>

        <div className="card-toolbar m-0">
          <button
            className="btn btn-clean btn-sm btn-icon btn-icon-primary btn-active-light-primary me-n3"
            data-kt-menu-flip="top-end"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-trigger="click"
            type="button"
          >
            <KTSVG
              className="svg-icon-3 svg-icon-primary"
              path="/media/icons/duotune/general/gen024.svg"
            />
          </button>

          <Dropdown1 />
        </div>
      </div>

      <div className="card-body d-flex flex-column px-9 pt-6 pb-8">
        <div className="fs-2tx fw-bolder mb-3">{description}</div>

        <div className="d-flex align-items-center flex-wrap mb-5 mt-auto fs-6">
          {status === 'up' && (
            <KTSVG
              className="svg-icon-3 me-1 svg-icon-success"
              path="/media/icons/duotune/arrows/arr007.svg"
            />
          )}

          {status === 'down' && (
            <KTSVG
              className="svg-icon-3 me-1 svg-icon-danger"
              path="/media/icons/duotune/arrows/arr006.svg"
            />
          )}

          <div className={`fw-bolder me-2 ` + (status === 'up' ? 'text-success' : 'text-danger')}>
            {status === 'up' ? '+' : '-'}
            {statusValue}%
          </div>

          <div className="fw-bold text-gray-400">{statusDesc}</div>
        </div>

        <div className="d-flex align-items-center fw-bold">
          <span className="badge bg-light text-gray-700 px-3 py-2 me-2">{progress}%</span>
          <span className="text-gray-400 fs-7">{progressType}</span>
        </div>
      </div>
    </div>
  );
};

export { Card5 };
