import { FC } from 'react';

import { useCheckInStatusDetail } from '@/modules/operate-worker/hooks/useCheckInStatusDetail';

const StatusOperate: FC = () => {
  const { data } = useCheckInStatusDetail();

  return (
    <div className="card card-body">
      <div className="row">
        <div className="col-5">
          <div className="row mb-2">
            <div className="col-sm-6">
              <span className="mb-0">Tổng chỉ tiêu :</span>
            </div>
            <div className="col-sm-6">
              <span className="mb-0">{data?.total_worker_plan}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <span className="mb-0">Tổng đã nhận vào :</span>
            </div>
            <div className="col-sm-6">
              <span className="mb-0">{data?.total_worker}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <span className="mb-0">Tổng đang làm đến hiện tại:</span>
            </div>
            <div className="col-sm-6">
              <span className="mb-0">{data?.total_worker_working}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <span className="mb-0">Tổng đã nghỉ đến hiện tại:</span>
            </div>
            <div className="col-sm-6">
              <span className="mb-0">{data?.total_worker_absent}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StatusOperate };
