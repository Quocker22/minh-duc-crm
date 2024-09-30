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
import { useParams } from 'react-router-dom';
import { useGetStatusRecruitmentList } from '@/modules/recruitment-plan/hooks/useGetStatusRecruitmentList';

type Props = {
  readonly workerDetail: FormWorkerModel;
  readonly workerId: string;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
};

function StatusModal({ onHide, onSaved, show, workerId, workerDetail }: Props) {
  const { id } = useParams();
  const formMethodsWorker = useForm<FormWorkerModel>();

  useEffect(() => {
    formMethodsWorker.reset({
      plan_id: id,
      full_name: workerDetail.full_name,
      gender: workerDetail.gender,
      recruitment_status_id: workerDetail.recruitment_status_id,
      phone: workerDetail.phone,
    });
  }, [workerDetail]);

  const { mutateAsync: updateWorker } = useUpdateWorker();

  const { mutateAsync } = useMutation(updateWorker);

  const { data: statusRecruitment } = useGetStatusRecruitmentList(workerDetail.id);

  function handleHide() {
    onHide?.();
  }

  const handleSubmit = async () => {
    if (!formMethodsWorker.watch().recruitment_status_id) return;

    const submitData = {
      id: workerId,
      ...formMethodsWorker.watch(),
    };
    const res = await mutateAsync(submitData);
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
      title={<h3 className="fw-bolder">Trạng thái NLĐ</h3>}
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
        name="recruitment_status_id"
        options={statusRecruitment || []}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem',
        }}
      />
    </Modal>
  );
}

export { StatusModal };
