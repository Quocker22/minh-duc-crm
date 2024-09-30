/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
import { Button } from '@/components/molecules/Button';
import { RadioField } from '@/components/molecules/RadioField';
import { Modal } from '@/components/organisms/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { FormHRModel, HR_STATUS_OPTION } from '@/modules/hr-management/models';
import { useUpdateHR } from '@/modules/hr-management/hooks/useUpdateHR';

type Props = {
  formMethods: UseFormReturn<FormHRModel, object>;
  readonly onHide?: () => void;
  readonly show?: boolean;
};

function HRStatusModal({ formMethods, onHide, show }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateHR } = useUpdateHR({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['HR-detail'] });
    },
  });
  const { mutateAsync } = useMutation(updateHR);

  function handleHide() {
    onHide?.();
  }

  const handleSubmit: SubmitHandler<FormHRModel> = async (formData) => {
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
      title={<h3 className="fw-bolder">Trạng thái nhân viên</h3>}
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
        options={HR_STATUS_OPTION}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem',
        }}
      />
    </Modal>
  );
}

export { HRStatusModal };
