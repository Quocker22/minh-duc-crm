import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox } from 'antd';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { InputField } from '@/components/molecules/InputField';
import { useAuth } from '@/hooks/useAuth';
import { FormLoginModel } from '@/models';
import { LoginModal } from '@/modules/auth/components/LoginModal';
import { getLoginFormSchema } from '@/modules/auth/services/validation';
import { trans } from '@/utils';

const defaultValues: FormLoginModel = {
  password: import.meta.env.VITE_ACCOUNT_PASSWORD_TEST,
  phone: import.meta.env.VITE_ACCOUNT_USER_NAME_TEST,
};

export function Login() {
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const { login, isLoading } = useAuth();
  const resolver = yupResolver(getLoginFormSchema());
  const formMethods = useForm<FormLoginModel>({ defaultValues, resolver });

  const onSubmit: SubmitHandler<FormLoginModel> = (formData) => {
    login(formData);
  };

  return (
    <>
      <div data-testid="login-form-element">
        <FormField className="form w-100" methods={formMethods} onSubmit={onSubmit}>
          <div className="text-center mb-10">
            <h1 className="mb-3 text-primary">{trans('AUTH.LOGIN.BUTTON')}</h1>
          </div>

          <InputField
            allowClear={false}
            autoComplete={false}
            control={formMethods.control}
            groupClass="mb-5"
            name="phone"
            placeholder={trans('AUTH.INPUT.USERNAME')}
            prefix={<i className="bi bi-person fs-1 text-primary" />}
            size="large"
            required
          />

          <InputField
            allowClear={false}
            autoComplete={false}
            control={formMethods.control}
            groupClass="mb-5"
            name="password"
            placeholder={trans('AUTH.INPUT.PASSWORD')}
            prefix={<i className="bi bi-lock fs-1 text-primary" />}
            type="password"
            required
          />

          <div className="d-flex alight-items-center justify-content-between">
            <Checkbox name="CheckboxField">Nhớ mật khẩu</Checkbox>
            <span
              className="fst-italic pt-3 cursor-pointer"
              onClick={() => setIsVisibleFormModal(true)}
            >
              Quên mật khẩu?
            </span>
          </div>

          <div className="text-center">
            <Button
              className="my-5 w-75 rounded-pill"
              isLoading={isLoading}
              size="lg"
              type="submit"
              variant="primary"
            >
              {trans('AUTH.LOGIN.BUTTON')}
            </Button>
          </div>
        </FormField>
      </div>
      {isVisibleFormModal && (
        <LoginModal
          onHide={() => {
            setIsVisibleFormModal(false);
          }}
          show={isVisibleFormModal}
        />
      )}
    </>
  );
}
