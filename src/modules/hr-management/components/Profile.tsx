import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Spin, Tabs, TabsProps } from 'antd';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { ProfileMemberRole } from '@/components/molecules/ProfileMemberRole';
import { ProfileRole } from '@/components/molecules/ProfileRole';
import { useAuth } from '@/hooks/useAuth';
import { HRDetailStep1 } from '@/modules/hr-management/components/form/HRDetailStep1';
import { useUpdateHR } from '@/modules/hr-management/hooks/useUpdateHR';
import { FormHRModel } from '@/modules/hr-management/models';
import { getHRForm1Schema } from '@/modules/hr-management/services/validation';
import { history } from '@/utils';

const Profile: React.FC = () => {
  const { currentUser: data } = useAuth();

  const resolver = yupResolver(getHRForm1Schema());
  const formMethods = useForm<FormHRModel>({ resolver });
  const { mutateAsync: updateHR, isLoading } = useUpdateHR();
  const { mutateAsync } = useMutation(updateHR);
  const onSubmit: SubmitHandler<FormHRModel> = async (formData) => {
    const res = await mutateAsync(formData);
    if (!res) return;
  };

  useEffect(() => {
    if (!data) return;

    formMethods.reset({
      account_type: data.account_type,
      avatar: data.avatar,
      birthday: data.birthday,
      email: data.email,
      gender: data.gender,
      id: data.id,
      name: data.name,
      phone: data.phone,
      role_ids: data.roles?.map((i: { id: string }) => i.id),
      status: data.status,
    });
  }, [data]);

  const items: TabsProps['items'] = [
    {
      children: <HRDetailStep1 formMethods={formMethods} />,
      key: '1',
      label: 'Thông tin cơ bản',
    },
    {
      children:
        data?.account_type === 'MEMBER' ? (
          <ProfileMemberRole data={data} />
        ) : (
          <ProfileRole formMethods={formMethods} />
        ),
      key: '2',
      label: 'Phân quyền hệ thống',
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <FormField className="form" methods={formMethods} onSubmit={onSubmit}>
        <div className="card card-body">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
        <div className="d-flex justify-content-end">
          <Button
            className="me-3 rounded-pill py-1 px-6"
            onClick={() => history.push('/')}
            variant="light"
          >
            Thoát
          </Button>
          <Button className="rounded-pill py-1 px-6" type="submit" variant="primary">
            Cập nhật
          </Button>
        </div>
      </FormField>
    </Spin>
  );
};

export { Profile };
