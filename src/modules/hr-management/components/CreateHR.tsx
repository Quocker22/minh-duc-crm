import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Spin, Steps } from 'antd';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { FileUploadModel } from '@/models';
import { HRCreateStep1 } from '@/modules/hr-management/components/form/HRCreateStep1';
import { HRCreateStep2 } from '@/modules/hr-management/components/form/HRCreateStep2';
import { HRCreateStep3 } from '@/modules/hr-management/components/form/HRCreateStep3';
import { useCreateHR } from '@/modules/hr-management/hooks/useCreateHR';
import { FormHRModel, HRGender } from '@/modules/hr-management/models';
import { getHRForm1Schema } from '@/modules/hr-management/services/validation';
import { history } from '@/utils';

const defaultValues: FormHRModel = {
  avatar: '',
  birthday: '',
  email: '',
  gender: HRGender.male,
  name: '',
  phone: '',
};

const CreateHR: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const resolver = yupResolver(getHRForm1Schema());
  const formMethods = useForm<FormHRModel>({
    defaultValues,
    resolver: current === 0 ? resolver : undefined,
  });
  const { mutateAsync: createHR, isLoading } = useCreateHR();
  const { mutateAsync } = useMutation(createHR);
  const onSubmit: SubmitHandler<FormHRModel> = async (formData) => {
    if (current < 1) {
      next();

      return;
    }
    const avatar = formData.avatar as FileUploadModel;
    const response = await mutateAsync({ ...formData, avatar: avatar.url });
    if (response) next();
  };

  const steps = [
    {
      content: <HRCreateStep1 formMethods={formMethods} />,
      title: <h6>Thông tin cơ bản</h6>,
    },
    {
      content: <HRCreateStep2 formMethods={formMethods} />,
      title: <h6 className="text-nowrap">Phân quyền chức năng</h6>,
    },
    {
      content: <HRCreateStep3 formMethods={formMethods} />,
      title: <h6>Hoàn thành</h6>,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Spin spinning={isLoading}>
      <FormField className="form" methods={formMethods} onSubmit={onSubmit}>
        <div className="card">
          <div className="card-body">
            <div className="card-header">
              <Steps current={current} items={items} labelPlacement="vertical" />
            </div>
            <div>{steps[current].content}</div>
            <div className="w-100 d-flex justify-content-end" style={{ marginTop: 24 }}>
              {current > 0 && current < 2 && (
                <Button
                  className="rounded-pill px-10 py-1 me-5"
                  onClick={() => prev()}
                  variant="outline"
                >
                  Quay lại
                </Button>
              )}
              {current === 0 && (
                <Button
                  className="rounded-pill px-10 py-1 me-5"
                  onClick={() => history.push('management/list')}
                  variant="outline"
                >
                  Thoát
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  className="rounded-pill px-10 py-1 me-5"
                  onClick={() => history.push('/hr-management/management/list')}
                  variant="outline"
                >
                  Đóng
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button className="rounded-pill py-1 px-10" type="submit">
                  {current == 0 ? 'Tiếp tục' : 'Hoàn thành'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </FormField>
    </Spin>
  );
};

export default CreateHR;
