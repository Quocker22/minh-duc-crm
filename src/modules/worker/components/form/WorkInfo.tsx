/* eslint-disable newline-before-return */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
import { FC, Fragment, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  FormWorkerModel,
  HistoryWorker,
  STATUS_OPTION,
  StatusOption,
  WorkerModel,
} from '@/modules/worker/models';
import { Avatar, Badge, Timeline } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetWorkInfoHistory } from '@/modules/worker/hooks/useGetWorkInfoHistory';
import moment from 'moment';
import { getClientDateTime } from '@/utils';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { statusOperationalWorker } from '@/modules/operate-worker/components/CheckInWorkerInfoModal';
import { WorkerNotedList } from '@/modules/recruitment-plan/components/table-list-data/WorkerNotedList';

interface IProps {
  formMethods: UseFormReturn<FormWorkerModel, object>;
  readonly workerDataDetail?: WorkerModel;
}

const statusWorker = (status: any) => {
  if (!status) {
    return {
      bgColor: '#B8B8B8',
      label: 'Chưa phân loại',
      textColor: 'white',
      value: StatusOption.trangThai01,
    };
  }

  return STATUS_OPTION.find((item) => item.label === status);
};

function Dot() {
  return (
    <span
      style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: 'linear-gradient(192.55deg, #0734C5 -83.03%, #2788E6 102.65%)',
        display: 'inline-block',
        padding: '0',
        margin: '0',
      }}
    />
  );
}

const WorkInfo: FC<IProps> = ({ workerDataDetail }) => {
  const { id } = useParams();

  const { isFetchedAfterMount, data: workerHistoryInfo } = useGetWorkInfoHistory(id);

  const [data, setData] = useState<HistoryWorker[] | undefined>();

  useEffect(() => {
    if (workerHistoryInfo) {
      setData(
        Object.keys(workerHistoryInfo).map((key) => ({
          ...workerHistoryInfo[key],
        }))
      );
    }
  }, [workerHistoryInfo]);

  console.log('data', data);

  return isFetchedAfterMount && data && data.length ? (
    <>
      <div className="row card-body">
        <div className="col-6">
          <div className="mb-3">
            <div className="text-primary" style={{ height: '20px' }}>
              Thông tin đang công tác
            </div>
          </div>
          <div className="p-5 rounded-3" style={{ backgroundColor: '#F2F4F6', height: '180px' }}>
            <div className="row mb-2">
              <div className="col-sm-4">
                <span className="mb-0">Tên công ty</span>
              </div>
              <div className="col-sm-8">
                <span
                  className="mb-0"
                  style={{
                    color: '#1A65D9',
                  }}
                >
                  {data[0]?.company_name}
                </span>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4">
                <span className="mb-0">Trạng thái vận hành</span>
              </div>
              <div className="col-sm-8">
                <Badge
                  className="site-badge-count-109"
                  count={statusOperationalWorker(workerDataDetail?.operational_status_id)?.label}
                  style={{
                    backgroundColor: statusOperationalWorker(
                      workerDataDetail?.operational_status_id
                    )?.bgColor,
                    color: statusOperationalWorker(workerDataDetail?.operational_status_id)
                      ?.textColor,
                  }}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4">
                <span className="mb-0">Ngày vào làm</span>
              </div>
              <div className="col-sm-8">
                <span className="mb-0">{moment(data[0]?.start_date).format('DD/MM/YYYY')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="p-5 rounded-3">
            <span className="mb-0">Ghi chú vận hành</span>
            <WorkerNotedList workerId={workerDataDetail?.id || ''} />
          </div>
        </div>
        <div className="col-12 mt-4">
          <div className="mb-3">
            <span className="text-primary">Lịch sử công tác</span>
          </div>
          <div
            className="p-5"
            style={{
              maxHeight: '500px',
              overflow: 'auto',
              border: '1px solid #DFE3E9',
              padding: '.5rem',
              borderRadius: data.filter((_, index) => index !== 0).length ? '.5rem' : '9999px',
            }}
          >
            <Timeline>
              {data.filter((_, index) => index !== 0).length ? (
                data
                  .filter((_, index) => index !== 0)
                  .map((history, index) => {
                    const startDate = history.start_date
                      ? moment(history.start_date).format('DD/MM/YYYY')
                      : 'Không xác định';
                    const endDate = history.end_date
                      ? moment(history.end_date).format('DD/MM/YYYY')
                      : 'Không xác định';
                    return (
                      <Timeline.Item key={`${history.start_date}_${index}`} dot={<Dot />}>
                        <div>
                          {startDate} - {endDate}
                        </div>
                        <div className="p-5 rounded-3" style={{ backgroundColor: '#F2F4F6' }}>
                          <div className="row mb-2">
                            <div className="col-sm-2">
                              <span className="mb-0">Tên công ty</span>
                            </div>
                            <div className="col-sm-10">
                              <span className="mb-0">{history.company_name}</span>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-sm-2">
                              <span className="mb-0">Trạng thái vận hành</span>
                            </div>
                            <div className="col-sm-10">
                              <Badge
                                className="site-badge-count-109"
                                count={statusWorker(history.status)?.label}
                                style={{
                                  backgroundColor: statusWorker(history.status)?.bgColor,
                                  color: statusWorker(history.status)?.textColor,
                                }}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-sm-2">
                              <span className="mb-0">Ghi chú</span>
                            </div>
                            <div
                              className="col-sm-10"
                              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                            >
                              {history.history_notes.map((item, index) => {
                                return (
                                  <div key={`${item.created_at}_${index}`} className="row">
                                    <div className="col-sm-3 d-flex items-center gap-2">
                                      <Avatar
                                        src={item.update_avt || defaultAvatar}
                                        style={{ flexShrink: 0 }}
                                      />
                                      <span>{item.updater_name}</span>
                                    </div>
                                    <div className="col-sm-7">{item.note}</div>
                                    <div className="col-sm-2">
                                      {getClientDateTime(item.created_at)}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </Timeline.Item>
                    );
                  })
              ) : (
                <span>Hiện chưa có lịch sử công tác</span>
              )}
            </Timeline>
          </div>
        </div>
      </div>
    </>
  ) : isFetchedAfterMount && (!data || !data.length) ? (
    <div>Hiện chưa có thông tin đang công tác</div>
  ) : null;
};

export { WorkInfo };
