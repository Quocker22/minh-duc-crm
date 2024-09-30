/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import CustomerModal from '@/modules/communication/components/freeSurvey/CustomerModal';
import { useGetAllStatsCustomerWorkerStatus } from '@/modules/communication/hooks/useGetAllStatsCustomerWorkerStatus';
import {
  FormSurveyModel,
  StatsCustomerWorkerStatus,
  StatsWorkerStatus,
} from '@/modules/communication/models';
import { STATUS_OPTION } from '@/modules/worker/models';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

const statusRecruitmentPlan = (status: string) => {
  return STATUS_OPTION.find((item) => item.value === status);
};

interface Props {
  formMethods: UseFormReturn<FormSurveyModel, object>;
}

function CustomerOperated({ formMethods }: Props) {
  const [visibleEmployeeList, setVisibleEmployeeList] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<StatsCustomerWorkerStatus | undefined>();

  const statusValue = formMethods.getValues('status');
  const disableForm = Boolean(statusValue === 'END' || statusValue === 'WORKING');

  const {
    isFetching: isFetchingAllStatsCustomerWorkerStatus,
    isSuccess: isSuccessAllStatsCustomerWorkerStatus,
    isLoading: isLoadingAllStatsCustomerWorkerStatus,
    data: dataAllStatsCustomerWorkerStatus,
  } = useGetAllStatsCustomerWorkerStatus('', {
    onSuccess(data) {
      const defaultWorkers = formMethods.getValues('workers') || [];
      const defaultCustomerId = defaultWorkers[0].customer_id;

      if (!defaultCustomerId) return;

      const customerFinded: StatsCustomerWorkerStatus | undefined = data?.find(
        (item) => item.customer_id === defaultCustomerId
      );

      setSelectedCustomer(customerFinded);
    },
  });

  const handleOpenEmployeeList = () => {
    setVisibleEmployeeList(true);
  };

  const sumWorker = useMemo(() => {
    if (selectedCustomer) {
      const sum = selectedCustomer.workers.reduce((result, current) => {
        return result + Number(current.worker_count);
      }, 0);

      return sum;
    }

    return 0;
  }, [selectedCustomer]);

  const countWorker = useMemo(() => {
    const count = (formMethods.getValues('workers') || []).reduce((result, current) => {
      return result + Number(current.worker_count);
    }, 0);

    return count;
  }, [formMethods.getValues('workers')]);

  const onCheckWorkerStatus = (
    e: CheckboxChangeEvent,
    workerStatus: StatsWorkerStatus | undefined
  ) => {
    if (!workerStatus) return;
    const checked = e.target.checked;
    const workers = formMethods.watch('workers');

    if (checked) {
      workers?.push({
        customer_id: selectedCustomer?.customer_id,
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

  const isChecked = (option: StatsWorkerStatus) => {
    const workers = formMethods.getValues('workers') || [];

    return workers.some((worker) => worker.recruitment_status_id === option.recruitment_status_id);
  };

  return (
    <div className="rounded-3 my-4" style={{ backgroundColor: '#F2F4F6' }}>
      <div className="row py-5 px-10 mx-1" style={{ borderBottom: '1px solid #DFE3E9' }}>
        <div className="col-4">
          <b>Chọn khách hàng</b>
        </div>

        <div className="col-8">
          {selectedCustomer ? (
            <div className="row">
              <div className="d-flex items-center gap-3 col-6">
                <Avatar
                  src={selectedCustomer.customer.avatar || defaultAvatar}
                  style={{ flexShrink: 0 }}
                />
                <div style={{ flexGrow: 1 }}>{selectedCustomer.customer.name}</div>
              </div>
              <div className="col-3">Tổng NLĐ: {sumWorker}</div>
              <div className="col-3">
                <CloseOutlined
                  rev={undefined}
                  className="cursor-poiter"
                  onClick={() => {
                    setSelectedCustomer(undefined);
                    formMethods.setValue('workers', []);
                  }}
                />
              </div>
            </div>
          ) : isSuccessAllStatsCustomerWorkerStatus ? (
            <Button
              shape="round"
              size="middle"
              icon={<PlusOutlined rev={undefined} />}
              type="default"
              hidden={disableForm}
              style={{
                color: '#1E70DD',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={handleOpenEmployeeList}
            >
              Chọn khách hàng
            </Button>
          ) : null}
        </div>
      </div>

      <div className="row py-5 px-10 mx-1">
        <div className="col-5">
          <b>
            Chọn lọc theo trạng thái NLD({countWorker}/{sumWorker})
          </b>
        </div>

        {selectedCustomer ? (
          <div
            style={{ maxWidth: '800px', gap: '2rem 5rem', margin: '1rem 0' }}
            className="row col-12"
          >
            {selectedCustomer.workers.map((option, index) => {
              return (
                <Checkbox
                  name="CheckboxField"
                  key={`${option.recruitment_status_id}_${index}`}
                  className="col-3"
                  style={{ marginLeft: '8px' }}
                  onChange={(e) => {
                    onCheckWorkerStatus(e, option);
                  }}
                  disabled={disableForm}
                  checked={isChecked(option)}
                >
                  <Badge
                    className="site-badge-count-109"
                    count={`${
                      statusRecruitmentPlan(option?.recruitment_status_id as string)?.label
                    } (${option.worker_count})`}
                    style={{
                      backgroundColor: statusRecruitmentPlan(
                        option?.recruitment_status_id as string
                      )?.bgColor,
                      color: statusRecruitmentPlan(option?.recruitment_status_id as string)
                        ?.textColor,
                      padding: '0 2rem',
                      textAlign: 'center',
                    }}
                  />
                </Checkbox>
              );
            })}
          </div>
        ) : (
          <div style={{ height: '100px' }}>&nbsp;</div>
        )}
      </div>

      {visibleEmployeeList ? (
        <CustomerModal
          show={visibleEmployeeList}
          onHide={() => setVisibleEmployeeList(false)}
          setSelectedCustomer={setSelectedCustomer}
          dataAllStatsCustomerWorkerStatus={dataAllStatsCustomerWorkerStatus}
        />
      ) : null}
    </div>
  );
}

export default CustomerOperated;
