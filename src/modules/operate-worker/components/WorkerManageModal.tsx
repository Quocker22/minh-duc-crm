import { useMutation } from '@tanstack/react-query';
import { ConfigProvider, Table, TableColumnsType } from 'antd';
import moment from 'moment';
import { FC, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { DropdownCheckIn } from '@/components/molecules/DropdownCheckIn';
import { FormField } from '@/components/molecules/FormField';
import { InputField } from '@/components/molecules/InputField';
import { InputNumberField } from '@/components/molecules/InputNumberField';
import { Modal } from '@/components/organisms/Modal';
import { useCreateCheckIn } from '@/modules/operate-worker/hooks/useCreateCheckIn';
import { useUpdateCheckIn } from '@/modules/operate-worker/hooks/useUpdateCheckIn';
import { FromCheckInWorkerModel } from '@/modules/operate-worker/models';
import { formatDateTimeCustom } from '@/modules/operate-worker/utils';
import { WorkerModel } from '@/modules/worker/models';

interface IProps {
  readonly workerCheckIn: {
    record?: WorkerModel;
    title?: string;
  };
  readonly isHideEdit?: boolean;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const WorkerManageModal: FC<IProps> = ({ show, onHide, workerCheckIn, onSaved, isHideEdit }) => {
  const workerUpdateCheckIn = useMemo(() => {
    const checkInRecord = workerCheckIn.record?.manager_checkins?.find(
      (i) => moment(i.checkin_date).format('DD/MM/YYYY') === workerCheckIn.title
    );

    return checkInRecord;
  }, [workerCheckIn.title]);

  const [isDL, setIsDL] = useState<{ LD: boolean; record?: WorkerModel }>({
    LD: false,
  });

  const formMethods = useForm<FromCheckInWorkerModel>({
    defaultValues: {
      note: '',
    },
  });

  const { mutateAsync: createCheckIn } = useCreateCheckIn();
  const { mutateAsync: updateCheckIn } = useUpdateCheckIn();

  const action = workerUpdateCheckIn?.id ? updateCheckIn : createCheckIn;

  const { mutateAsync } = useMutation(action);
  const onSubmit: SubmitHandler<FromCheckInWorkerModel> = async (formData) => {
    if (formData.checkin_type != 'CDL') {
      formData.checkin_shifts = [];
    }

    if (formData.checkin_shifts?.[0]) {
      formData.checkin_shifts[0].name = 'HC_NGAY';
      formData.checkin_shifts[1].name = 'TC_TRUA';
      formData.checkin_shifts[2].name = 'TC_NGAY';
      formData.checkin_shifts[3].name = 'HC_DEM';
      formData.checkin_shifts[4].name = 'TC_DEM';
    }

    const res = await mutateAsync({
      ...formData,
      checkin_date: formatDateTimeCustom(workerCheckIn.title, formData.checkin_date),
      worker_id: workerCheckIn.record?.id || '',
    });
    if (!res) return;

    onSaved?.();
    formMethods.reset();
  };

  useEffect(() => {
    const checkinDate = workerUpdateCheckIn?.checkin_date
      ? formatDateTimeCustom(
          workerCheckIn.title,
          moment(workerUpdateCheckIn?.checkin_date).format('HH:mm')
        )
      : formatDateTimeCustom(workerCheckIn.title, moment('08:00', 'HH:mm').format('HH:mm'));
    formMethods.reset({
      checkin_date: checkinDate,
      checkin_shifts: workerUpdateCheckIn?.checkin_shifts,
      checkin_type: workerUpdateCheckIn?.checkin_type,
      id: workerUpdateCheckIn?.id,
      note: workerUpdateCheckIn?.note,
      worker_id: workerUpdateCheckIn?.worker_id,
    });
  }, [workerUpdateCheckIn]);

  const columns: TableColumnsType<WorkerModel> = [
    {
      dataIndex: 'full_name',
      fixed: 'left',
      key: 'full_name',
      render: (text, record) => (
        <div className="text-start">
          <p className="text-primary"> {record.full_name}</p>
          <p className="m-0">{record.code}</p>
          <p className="m-0">{record.id_number}</p>
        </div>
      ),
      title: 'Họ và tên NLĐ',
      width: 150,
    },
    {
      dataIndex: 'check_in',
      fixed: 'left',
      key: 'check_in',
      render: (_, record: WorkerModel) => (
        <div className="text-end">
          <DropdownCheckIn
            current={workerCheckIn.title}
            formMethods={formMethods}
            isHideEdit={isHideEdit}
            onSelect={(value) => {
              setIsDL(
                value.key === 'CDL' ? { LD: true, record } : { LD: false, record: undefined }
              );
            }}
          />
        </div>
      ),
      title: 'Check in',
      width: 150,
    },
    {
      dataIndex: 'HC_NGAY',
      key: 'HC_NGAY',
      render: (_) =>
        isDL.LD && (
          <InputNumberField
            control={formMethods.control}
            disabled={isHideEdit}
            name={`checkin_shifts.${0}.value`}
            size="small"
            type="number"
            isHideRoundedPill
          />
        ),
      title: `HC ngày (h)`,
    },
    {
      dataIndex: 'TC_TRUA',
      key: 'TC_TRUA',
      render: (_) =>
        isDL.LD && (
          <InputNumberField
            control={formMethods.control}
            disabled={isHideEdit}
            name={`checkin_shifts.${1}.value`}
            size="small"
            type="number"
            isHideRoundedPill
          />
        ),
      title: `TC trưa (h)`,
    },
    {
      dataIndex: 'TC_NGAY',
      key: 'TC_NGAY',
      render: (_) =>
        isDL.LD && (
          <InputNumberField
            control={formMethods.control}
            disabled={isHideEdit}
            name={`checkin_shifts.${2}.value`}
            size="small"
            type="number"
            isHideRoundedPill
          />
        ),
      title: `TC ngày (h)`,
    },
    {
      dataIndex: 'HC_DEM',
      key: 'HC_DEM',
      render: (_) =>
        isDL.LD && (
          <InputNumberField
            control={formMethods.control}
            disabled={isHideEdit}
            name={`checkin_shifts.${3}.value`}
            size="small"
            type="number"
            isHideRoundedPill
          />
        ),
      title: `HC đêm (h)`,
    },
    {
      dataIndex: 'TC_DEM',
      key: 'TC_DEM',
      render: (_) =>
        isDL.LD && (
          <InputNumberField
            control={formMethods.control}
            disabled={isHideEdit}
            name={`checkin_shifts.${4}.value`}
            size="small"
            type="number"
            isHideRoundedPill
          />
        ),
      title: `TC đêm (h)`,
    },
    {
      dataIndex: 'note',
      key: 'note',
      render: (_) => (
        <InputField
          control={formMethods.control}
          disabled={isHideEdit}
          name="note"
          readOnly={isHideEdit}
          size="small"
          type="textarea"
          isHideRoundedPill
        />
      ),
      title: `Ghi chú`,
      width: 200,
    },
  ];

  function handleHide() {
    onHide?.();
  }

  const dataSource = [{ ...workerCheckIn.record, key: workerCheckIn.record?.id }] as WorkerModel[];

  return (
    <Modal
      bodyClassName="scroll-y"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      size="xl"
      title={<h3 className="text-center w-100">Cập nhật ngày công {workerCheckIn.title}</h3>}
      centered
    >
      <FormField
        className="form w-100"
        methods={formMethods}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            formMethods.handleSubmit(onSubmit)();
          }
        }}
        onSubmit={onSubmit}
      >
        <ConfigProvider componentSize="middle">
          <Table columns={columns} dataSource={dataSource} />
        </ConfigProvider>
        <div className="text-end pt-10">
          <Button className="rounded-pill py-2 me-3" onClick={() => handleHide()} variant="outline">
            Hủy
          </Button>
          {!isHideEdit && (
            <Button className="rounded-pill py-2" type="submit" variant="primary">
              {workerUpdateCheckIn?.id ? 'Cập nhật' : 'Thêm'}
            </Button>
          )}
        </div>
      </FormField>
    </Modal>
  );
};

export { WorkerManageModal };
