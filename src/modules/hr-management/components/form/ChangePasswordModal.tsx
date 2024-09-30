import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Spin } from 'antd';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { InputField } from '@/components/molecules/InputField';
import { Modal } from '@/components/organisms/Modal';
import { ID } from '@/models';
import { useChangePassWord } from '@/modules/hr-management/hooks/useChangePassWord';
import { FormChangePasswordModel } from '@/modules/hr-management/models';
import { getAuthUpdatePasswordFormSchema } from '@/modules/hr-management/services/validation';
import { trans } from '@/utils';

interface IProps {
  readonly customerId?: ID;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const defaultValues: FormChangePasswordModel = {
  current_pwd: '',
  new_password_confirmation: '',
  new_pwd: '',
};

const ChangePasswordModal: FC<IProps> = ({ show, onHide, onSaved }) => {
  const resolver = yupResolver(getAuthUpdatePasswordFormSchema());
  const formMethods = useForm<FormChangePasswordModel>({ defaultValues, resolver });
  const { mutateAsync: changePassWord, isLoading } = useChangePassWord();
  const { mutateAsync } = useMutation(changePassWord);
  const onSubmit: SubmitHandler<FormChangePasswordModel> = async (formData, event) => {
    event?.preventDefault();
    const newFormPass: FormChangePasswordModel = {
      current_pwd: formData.current_pwd,
      new_pwd: formData.new_pwd,
    };
    const res = await mutateAsync(newFormPass);
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
      bodyClassName="scroll-y"
      dialogClassName="mw-600px"
      headerClassName="p-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="fw-bolder">Đổi mật khẩu</h3>}
      centered
    >
      <Spin spinning={isLoading}>
        <FormField className="form w-100" methods={formMethods} onSubmit={onSubmit}>
          <InputField
            classNameInputHint="col-8"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>Mật khẩu cũ</b>}
            labelClass="col-4 mt-3"
            name="current_pwd"
            placeholder="Nhập mật khẩu"
            type="password"
            required
          />

          <InputField
            classNameInputHint="col-8"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>Mật khẩu mới lần 1 </b>}
            labelClass="col-4 mt-3"
            name="new_pwd"
            placeholder="Nhập mật khẩu mới"
            type="password"
            required
          />

          <InputField
            classNameInputHint="col-8"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>Mật khẩu mới lần 2 </b>}
            labelClass="col-4 mt-3"
            name="new_password_confirmation"
            placeholder="Nhập lại mật khẩu"
            type="password"
            required
          />

          <div className="d-flex justify-content-end">
            <Button className="me-3 rounded-pill py-1 px-6" onClick={handleHide} variant="light">
              {trans('GENERAL.ACTION.CANCEL')}
            </Button>

            <Button
              className="rounded-pill py-1 px-6"
              onClick={formMethods.handleSubmit(onSubmit)}
              variant="primary"
            >
              Cập nhật
            </Button>
          </div>
        </FormField>
      </Spin>
    </Modal>
  );
};

export { ChangePasswordModal };
