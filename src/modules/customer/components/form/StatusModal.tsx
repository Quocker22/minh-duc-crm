/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
import { Button } from '@/components/molecules/Button';
import { RadioField } from '@/components/molecules/RadioField';
import { Modal } from '@/components/organisms/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { CUSTOMER_STATUS_OPTION, FormCustomerModel } from '@/modules/customer/models';
import { useUpdateCustomer } from '@/modules/customer/hooks/useUpdateCustomer';

type Props = {
  readonly customerId: string;
  formMethods: UseFormReturn<FormCustomerModel, object>;
  readonly onHide?: () => void;
  readonly show?: boolean;
};

function StatusModal({ formMethods, onHide, show, customerId }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateCustomer } = useUpdateCustomer({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['customer-detail', customerId] });
      queryClient.invalidateQueries({ queryKey: ['recruitment-worker'] });
    },
  });
  const { mutateAsync } = useMutation(updateCustomer);

  function handleHide() {
    onHide?.();
  }

  const handleSubmit: SubmitHandler<FormCustomerModel> = async (formData) => {
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
        options={CUSTOMER_STATUS_OPTION}
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
