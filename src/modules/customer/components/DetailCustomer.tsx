import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Spin, Tabs, TabsProps } from 'antd';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { FormField } from '@/components/molecules/FormField';
import { CustomerDetailStep1 } from '@/modules/customer/components/form/CustomerDetailStep1';
import { CustomerDetailStep2 } from '@/modules/customer/components/form/CustomerDetailStep2';
import { useGetCustomerDetail } from '@/modules/customer/hooks/useGetCustomerDetail';
import { useUpdateCustomer } from '@/modules/customer/hooks/useUpdateCustomer';
import { FormCustomerModel } from '@/modules/customer/models';
import { getCustomerFormSchema } from '@/modules/customer/services/validation';
import { history } from '@/utils';

interface Props {
  breadcrumbName: (value: string) => void;
}

const DetailCustomer: React.FC<Props> = ({ breadcrumbName }) => {
  const { id } = useParams();
  const resolver = yupResolver(getCustomerFormSchema());
  const formMethods = useForm<FormCustomerModel>({ resolver });
  const { mutateAsync: updateCustomer, isLoading } = useUpdateCustomer();
  const { mutateAsync } = useMutation(updateCustomer);
  const onSubmit: SubmitHandler<FormCustomerModel> = async (formData) => {
    const res = await mutateAsync(formData);
    if (!res) return;

    history.push('list');
  };

  const { data: customerDetail } = useGetCustomerDetail(id || '', {
    enabled: !!id,
    onSuccess: (data) => {
      if (!data) return;
      breadcrumbName(data.name);

      const defaultShiftWork: any = data.shift_work
        ? data.shift_work[0]?.end_time == '' && data.shift_work[0]?.start_time == ''
          ? [{ end_time: '17:30', start_time: '08:00' }]
          : data.shift_work
        : [{ end_time: '17:30', start_time: '08:00' }];

      formMethods.reset({
        address: data.address,
        avatar: data.avatar,
        description: data.description,
        district_id: String(data.district?.code),
        email: data.email,
        id: data.id,
        name: data.name,
        phone: data.phone,
        province_id: String(data.province?.code),
        shift_work: defaultShiftWork,
        status: data.status,
        tax_code: data.tax_code,
        ward_id: String(data.ward?.code),
      });
    },
  });

  const items: TabsProps['items'] = [
    {
      children: <CustomerDetailStep1 customerDetail={customerDetail} formMethods={formMethods} />,
      key: '1',
      label: 'Thông tin cơ bản',
    },
    {
      children: <CustomerDetailStep2 id={id} />,
      key: '2',
      label: 'Dữ liệu tuyển dụng',
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <FormField className="form" methods={formMethods} onSubmit={onSubmit}>
        <div className="card card-body">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </FormField>
    </Spin>
  );
};

export default DetailCustomer;
