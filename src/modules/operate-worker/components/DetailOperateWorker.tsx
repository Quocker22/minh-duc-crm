import { Tabs, TabsProps } from 'antd';
import moment, { Moment } from 'moment';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { InputDateField } from '@/components/molecules/InputDateField';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { DatePickerType } from '@/models';
import { StatusOperate } from '@/modules/operate-worker/components/StatusOperate';
import { WorkerManageTable } from '@/modules/operate-worker/components/table/WorkerManageTable';
import { TookBreakWorker } from '@/modules/operate-worker/components/TookBreakWorker';
import { getFirstAndLastDayOfMonthFromDate, sumValueWorker } from '@/modules/operate-worker/utils';
import { useGetWorkerList } from '@/modules/worker/hooks/useGetWorkerList';
import { WorkerModelFilterModel } from '@/modules/worker/models';

interface Props {
  breadcrumbName?: (value: string) => void;
}

const DetailOperateWorker: React.FC<Props> = () => {
  const { id } = useParams();
  const currentDate = getFirstAndLastDayOfMonthFromDate(String(moment().format('YYYY-MM-DD')));

  const [monthFilter, setMonthFilter] = useState<string>(String(moment().format('YYYY-MM-DD')));

  const {
    globalSearch,
    queryString,
    handleUpdateGlobalSearch,
    queryState,
    updateQueryState,
    updateFiltersState,
  } = useQueryRequest<WorkerModelFilterModel>({
    filters: {
      checkin_from: currentDate.firstDay,
      checkin_to: currentDate.lastDay,
      customer_id: id,
      with_manager_checkin: true,
    },
  });

  const { isLoading, data, refetch } = useGetWorkerList(queryString);
  const workerList = useMemo(() => sumValueWorker(data?.rows), [data?.rows]);

  const formMethods = useForm<{ month: string }>({
    defaultValues: { month: String(moment().format('YYYY-MM-DD')) },
  });

  const onSave = () => {
    refetch();
  };

  const items: TabsProps['items'] = [
    {
      children: (
        <WorkerManageTable
          globalSearch={globalSearch}
          handleUpdateGlobalSearch={handleUpdateGlobalSearch}
          isLoading={isLoading}
          month={monthFilter}
          onSave={onSave}
          queryState={queryState}
          updateQueryState={updateQueryState}
          workerList={workerList || []}
        />
      ),
      key: '1',
      label: 'Quản lý nhà máy chấm công',
    },
    {
      children: (
        <WorkerManageTable
          globalSearch={globalSearch}
          handleUpdateGlobalSearch={handleUpdateGlobalSearch}
          isLoading={isLoading}
          month={monthFilter}
          workerList={workerList || []}
          isHideEdit
        />
      ),
      key: '2',
      label: 'Người lao động chấm công',
    },
    {
      children: (
        <TookBreakWorker
          data={data}
          globalSearch={globalSearch}
          handleUpdateGlobalSearch={handleUpdateGlobalSearch}
          isLoading={isLoading}
          onSave={onSave}
          queryState={queryState}
          updateQueryState={updateQueryState}
        />
      ),
      key: '3',
      label: 'Danh sách NLĐ đã nghỉ',
    },
    {
      children: <StatusOperate />,
      key: '4',
      label: 'Tổng quan',
    },
  ];

  const disabledFutureMonths = (current: Moment | null) => {
    if (!current || !moment.isMoment(current)) return false;

    return current.isAfter(moment(), 'month');
  };

  return (
    <div className="card card-body">
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(activeKey: string) => {
          switch (activeKey) {
            case '1':
              updateQueryState({
                filters: {
                  checkin_from: currentDate.firstDay,
                  checkin_to: currentDate.lastDay,
                  customer_id: id,
                  with_manager_checkin: true,
                },
              });
              break;
            case '2':
              updateQueryState({
                filters: {
                  checkin_from: currentDate.firstDay,
                  checkin_to: currentDate.lastDay,
                  customer_id: id,
                  with_checkin: true,
                },
              });
              break;
            case '3':
              updateQueryState({
                filters: {
                  checkin_from: currentDate.firstDay,
                  checkin_status: 'inactive',
                  checkin_to: currentDate.lastDay,
                  customer_id: id,
                },
              });
              break;
          }
        }}
        tabBarExtraContent={
          <InputDateField
            allowClear={false}
            control={formMethods.control}
            disabledDate={disabledFutureMonths}
            name="month"
            onChange={(value) => {
              const date = getFirstAndLastDayOfMonthFromDate(value || '');
              setMonthFilter(value || '');
              updateFiltersState({
                checkin_from: date.firstDay,
                checkin_to: date.lastDay,
              });
            }}
            picker={DatePickerType.month}
            placeholder="Chọn Tháng"
            size="middle"
            isHideRoundedPill
          />
        }
      />
    </div>
  );
};

export default DetailOperateWorker;
