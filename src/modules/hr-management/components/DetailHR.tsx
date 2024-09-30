import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Spin, Tabs, TabsProps } from 'antd';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { useAuth } from '@/hooks/useAuth';
import { HRDetailStep1 } from '@/modules/hr-management/components/form/HRDetailStep1';
import { HRDetailStep2 } from '@/modules/hr-management/components/form/HRDetailStep2';
import { useGetHRDetail } from '@/modules/hr-management/hooks/useGetHRDetail';
import { useUpdateHR } from '@/modules/hr-management/hooks/useUpdateHR';
import { EmployeeRole, FormHRModel } from '@/modules/hr-management/models';
import { getHRForm1Schema } from '@/modules/hr-management/services/validation';
import { getRoleEmployee } from '@/roles';
import { checkRoleSystem, history, trans } from '@/utils';

interface Props {
  breadcrumbName: (value: string) => void;
}

const DetailHR: React.FC<Props> = ({ breadcrumbName }) => {
  const { id } = useParams();
  const resolver = yupResolver(getHRForm1Schema());
  const formMethods = useForm<FormHRModel>({ resolver });
  const { mutateAsync: updateHR, isLoading } = useUpdateHR();
  const { mutateAsync } = useMutation(updateHR);
  const onSubmit: SubmitHandler<FormHRModel> = async (formData) => {
    const res = await mutateAsync(formData);
    if (!res) return;

    history.push('list');
  };

  const { currentUser } = useAuth();
  const qltkmemCapNhat = getRoleEmployee(EmployeeRole.qltkmem_cap_nhat);

  const roleSystem = checkRoleSystem(
    currentUser?.account_type,
    formMethods.watch('account_type'),
    qltkmemCapNhat
  );

  useGetHRDetail(id || '', {
    enabled: !!id,
    onSuccess: (data) => {
      if (!data) return;

      breadcrumbName(data.name);

      formMethods.reset({
        account_type: data.account_type,
        avatar: data.avatar,
        birthday: data.birthday,
        email: data.email,
        gender: data.gender,
        id,
        name: data.name,
        phone: data.phone,
        role_ids: data.roles?.map((i) => i.id),
        status: data.status,
      });
    },
  });

  const items: TabsProps['items'] = [
    {
      children: <HRDetailStep1 formMethods={formMethods} />,
      key: '1',
      label: 'Thông tin cơ bản',
    },
    {
      children: <HRDetailStep2 formMethods={formMethods} />,
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
            onClick={() => history.push('list')}
            variant="light"
          >
            {trans('GENERAL.ACTION.CANCEL')}
          </Button>

          {roleSystem && (
            <Button className="rounded-pill py-1 px-6" type="submit" variant="primary">
              Cập nhật
            </Button>
          )}
        </div>
      </FormField>
    </Spin>
  );
};

export default DetailHR;
