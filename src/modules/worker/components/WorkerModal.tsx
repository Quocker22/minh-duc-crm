/* eslint-disable lines-around-comment */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { Modal } from '@/components/organisms/Modal';
import { FormCreateWorker } from '@/modules/worker/components/form/FormCreateWorker';
import { useCreateWorker } from '@/modules/worker/hooks/useCreateWorker';
import { FormWorkerModel } from '@/modules/worker/models';
import { getWorkerFormSchema } from '@/modules/worker/services/validation';

interface IProps {
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const defaultValues: FormWorkerModel = {
  full_name: '',
  gender: 'MALE',
  password: '123456',
  phone: '',
  birthday: '',
};

const WorkerModal: FC<IProps> = ({ show, onHide, onSaved }) => {
  const { mutateAsync: createWorker } = useCreateWorker();

  const resolver = yupResolver(getWorkerFormSchema());
  const formMethods = useForm<FormWorkerModel>({ defaultValues, resolver });
  const { mutateAsync } = useMutation(createWorker);
  const onSubmit: SubmitHandler<FormWorkerModel> = async (formData) => {
    const res = await mutateAsync(formData);
    if (!res) return;
    onSaved?.();
    formMethods.reset();
  };

  function handleHide() {
    onHide?.();
    formMethods.reset();
  }

  return (
    <Modal
      backdrop="static"
      bodyClassName="scroll-y"
      dialogClassName="mw-700px"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="fw-bolder w-100 text-center">Tạo người lao động mới</h3>}
      centered
    >
      <FormField className="form w-100" methods={formMethods} onSubmit={onSubmit}>
        <h4 className="mb-4">Thông tin tổng quan</h4>
        <div className="ps-3">
          <FormCreateWorker formMethods={formMethods} />
        </div>

        <div className="text-center pt-10">
          <Button className="rounded-pill py-2 me-3" onClick={() => handleHide()} variant="outline">
            Hủy
          </Button>
          <Button className="rounded-pill py-2" type="submit" variant="primary">
            Tạo NLĐ
          </Button>
        </div>
      </FormField>
    </Modal>
  );
};

export { WorkerModal };
