/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
import { Button } from '@/components/molecules/Button';
import { RadioField } from '@/components/molecules/RadioField';
import { Modal } from '@/components/organisms/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { FormWorkerModel, WORKER_STATUS_OPTION } from '@/modules/worker/models';
import { useUpdateWorker } from '@/modules/worker/hooks/useUpdateWorker';

type Props = {
  formMethods: UseFormReturn<FormWorkerModel, object>;
  readonly customerId?: string;
  readonly onHide?: () => void;
  readonly show?: boolean;
};

function AccountStatusModal({ formMethods, onHide, show, customerId }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateWorker, isLoading } = useUpdateWorker({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['worker-detail', customerId] });
      queryClient.invalidateQueries({ queryKey: ['recruitment-worker'] });
    },
  });
  const { mutateAsync } = useMutation(updateWorker);
  function handleHide() {
    onHide?.();
  }

  const handleSubmit: SubmitHandler<FormWorkerModel> = async (formData) => {
    const res = await mutateAsync(formData);
    if (!res) return;

    handleHide();
  };

  return (
    <Modal
      bodyClassName="scroll-y"
      centered
      dialogClassName={'mw-8000px'}
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="fw-bolder">Trạng thái tài khoản</h3>}
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
            onClick={formMethods.handleSubmit(handleSubmit)}
            type="submit"
            variant="primary"
          >
            Cập nhật
          </Button>
        </div>
      }
    >
      <RadioField
        control={formMethods.control}
        name="status"
        options={WORKER_STATUS_OPTION}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem',
        }}
      />
    </Modal>
  );
}

export { AccountStatusModal };
