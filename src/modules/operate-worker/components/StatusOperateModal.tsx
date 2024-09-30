/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
import { Button } from '@/components/molecules/Button';
import { RadioField } from '@/components/molecules/RadioField';
import { Modal } from '@/components/organisms/Modal';
import { useUpdateWorker } from '@/modules/worker/hooks/useUpdateWorker';
import { FormWorkerModel } from '@/modules/worker/models';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGetStatusRecruitmentList } from '@/modules/recruitment-plan/hooks/useGetStatusRecruitmentList';
import { OPERATIONAL_STATUS_OPTION } from '@/modules/operate-worker/models';

type Props = {
  readonly workerDetail: FormWorkerModel;
  readonly workerId: string;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
};

function StatusOperateModal({ onHide, onSaved, show, workerId, workerDetail }: Props) {
  const formMethodsWorker = useForm<FormWorkerModel>();

  useEffect(() => {
    formMethodsWorker.reset({
      plan_id: workerDetail.plan_id,
      full_name: workerDetail.full_name,
      gender: workerDetail.gender,
      operational_status_id: workerDetail.operational_status_id,
      recruitment_status_id: workerDetail.recruitment_status_id,
      phone: workerDetail.phone,
    });
  }, [workerDetail]);

  const { mutateAsync: updateWorker } = useUpdateWorker();

  const { mutateAsync: updateWorkerMutateAsync } = useMutation(updateWorker);

  useGetStatusRecruitmentList(workerDetail.id);

  function handleHide() {
    onHide?.();
  }

  const handleSubmit = async () => {
    const operId = formMethodsWorker.watch().operational_status_id;
    if (!operId) return;

    const submitData = {
      id: workerId,
      ...formMethodsWorker.watch(),
    };
    const res = await updateWorkerMutateAsync(submitData);
    if (!res) return;

    handleHide();
    onSaved?.();
  };

  return (
    <Modal
      bodyClassName="scroll-y"
      centered
      dialogClassName={'mw-8000px'}
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="fw-bolder">Trạng thái vận hành NLĐ</h3>}
      footer={
        <div className="text-end flex-grow-1">
          <Button
            className="rounded-pill py-2"
            onClick={() => handleHide()}
            style={{ marginRight: '1rem' }}
            type="button"
            variant="secondary"
          >
            Hủy
          </Button>
          <Button
            className="rounded-pill py-2"
            onClick={() => handleSubmit()}
            type="submit"
            variant="primary"
          >
            Cập nhật
          </Button>
        </div>
      }
    >
      <RadioField
        control={formMethodsWorker.control}
        name="operational_status_id"
        options={OPERATIONAL_STATUS_OPTION}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem',
        }}
      />
    </Modal>
  );
}

export { StatusOperateModal };
