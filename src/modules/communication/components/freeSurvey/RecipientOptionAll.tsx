/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable typescript-sort-keys/interface */
import { STATUS_OPTION } from '@/modules/worker/models';
import { Badge, Checkbox } from 'antd';
import { useGetAllStatusWorker } from '@/modules/communication/hooks/useGetAllStatusWorker';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSurveyModel, StatsWorkerStatus } from '@/modules/communication/models';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const statusRecruitmentPlan = (status: string) => {
  return STATUS_OPTION.find((item) => item.value === status);
};

interface Props {
  formMethods: UseFormReturn<FormSurveyModel, object>;
}

function RecipientOptionAll({ formMethods }: Props) {
  const statusValue = formMethods.getValues('status');
  const disableForm = Boolean(statusValue === 'END' || statusValue === 'WORKING');

  const {
    isFetching: isFetchingAllStatusWorker,
    isLoading: isLoadingAllStatusWorker,
    data: dataAllStatusWorker,
  } = useGetAllStatusWorker();

  const sumWorker = useMemo(() => {
    if (dataAllStatusWorker) {
      const sum = dataAllStatusWorker.reduce((result, current) => {
        return result + Number(current.worker_count);
      }, 0);

      return sum;
    }

    return 0;
  }, [dataAllStatusWorker]);

  const countWorker = useMemo(() => {
    const count = (formMethods.getValues('workers') || []).reduce((result, current) => {
      return result + Number(current.worker_count);
    }, 0);

    return count;
  }, [formMethods.getValues('workers')]);

  const statusWorkerFinded = (recruitmentStatusId: string) => {
    return dataAllStatusWorker?.find((item) => item.recruitment_status_id === recruitmentStatusId);
  };

  const onCheckWorkerStatus = (
    e: CheckboxChangeEvent,
    workerStatus: StatsWorkerStatus | undefined
  ) => {
    if (!workerStatus) return;
    const checked = e.target.checked;
    const workers = formMethods.watch('workers');

    if (checked) {
      workers?.push({
        customer_id: '',
        manager_id: '',
        recruitment_status_id: workerStatus.recruitment_status_id,
        status_name: workerStatus.status_name,
        worker_count: Number(workerStatus.worker_count),
      });

      formMethods.setValue('workers', workers);
    } else {
      const newWorkers = workers?.filter(
        (worker) => worker.recruitment_status_id !== workerStatus.recruitment_status_id
      );

      formMethods.setValue('workers', newWorkers);
    }
  };

  const isChecked = (option: {
    bgColor?: string;
    label?: string;
    textColor?: string;
    value: string;
  }) => {
    const workers = formMethods.getValues('workers') || [];

    return workers.some((worker) => worker.recruitment_status_id === option.value);
  };

  return (
    <div className="py-5 px-10 rounded-3 my-4" style={{ backgroundColor: '#F2F4F6' }}>
      <div>
        <b>
          Chọn lọc theo trạng thái NLD({countWorker}/{sumWorker})
        </b>
      </div>

      <div style={{ maxWidth: '800px', gap: '2rem 5rem', margin: '1rem 0' }} className="row">
        {STATUS_OPTION.map(
          (option: { bgColor?: string; label?: string; textColor?: string; value: string }) => {
            return (
              <Checkbox
                name="CheckboxField"
                key={option.value}
                className="col-3"
                style={{ marginLeft: '8px' }}
                onChange={(e) => {
                  onCheckWorkerStatus(e, statusWorkerFinded(option.value));
                }}
                disabled={disableForm}
                checked={isChecked(option)}
              >
                <Badge
                  className="site-badge-count-109"
                  count={`${option?.label} (${
                    statusWorkerFinded(option.value)?.worker_count || 0
                  })`}
                  style={{
                    backgroundColor: option?.bgColor,
                    color: option?.textColor,
                    padding: '0 2rem',
                    textAlign: 'center',
                  }}
                />
              </Checkbox>
            );
          }
        )}
      </div>
    </div>
  );
}

export default RecipientOptionAll;
