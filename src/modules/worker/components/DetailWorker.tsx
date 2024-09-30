/* eslint-disable simple-import-sort/imports */
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Spin, Tabs, TabsProps } from 'antd';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { FormField } from '@/components/molecules/FormField';
import { WorkerDetailStep1 } from '@/modules/worker/components/form/WorkerDetailStep1';
import { useGetWorkerDetail } from '@/modules/worker/hooks/useGetWorkerDetail';
import { useUpdateWorker } from '@/modules/worker/hooks/useUpdateWorker';
import { FormWorkerModel } from '@/modules/worker/models';
import { getWorkerUpdateFormSchema } from '@/modules/worker/services/validation';
import { history } from '@/utils';
import { WorkInfo } from '@/modules/worker/components/form/WorkInfo';
import { RecruitmentDataTab } from '@/modules/worker/components/form/RecruitmentDataTab';

interface Props {
  breadcrumbName: (value: string) => void;
}

const DetailWorker: React.FC<Props> = ({ breadcrumbName }) => {
  const { id } = useParams();

  const resolver = yupResolver(getWorkerUpdateFormSchema());
  const formMethods = useForm<FormWorkerModel>({ resolver });
  const { mutateAsync: updateWorker, isLoading } = useUpdateWorker();
  const { mutateAsync } = useMutation(updateWorker);
  const onSubmit: SubmitHandler<FormWorkerModel> = async (formData) => {
    const res = await mutateAsync({
      ...formData,
      district_code: String(formData.district_code),
      province_code: String(formData.province_code),
      ward_code: String(formData.ward_code),
    });
    if (!res) return;

    history.push('list');
  };

  const { data: workerDataDetail } = useGetWorkerDetail(id || '', {
    enabled: !!id,
    onSuccess: (data) => {
      if (!data) return;

      breadcrumbName(data.full_name || '');

      formMethods.reset({
        back_id_card_image_link: data.back_id_card_image_link,
        bank_name: data.bank_name,
        bank_owner_account_name: data.bank_owner_account_name,
        bank_owner_account_number: data.bank_owner_account_number,
        birthday: data.birthday,
        code: data.code,
        cv_link: { url: data.cv_link } as unknown as string,
        degree_id: data.degree_id,
        district_code: data.district_code,
        email: data.email,
        front_id_card_image_link: data.front_id_card_image_link,
        full_address: data.full_address,
        full_name: data.full_name,
        gender: data.gender,
        id_number: data.id_number,
        num_experience: data.num_experience || 0,
        password: '',
        phone: data.phone,
        province_code: data.province_code,
        status: data.status,
        ward_code: data.ward_code,
      });
    },
  });

  const items: TabsProps['items'] = [
    {
      children: <WorkerDetailStep1 formMethods={formMethods} workerDataDetail={workerDataDetail} />,
      key: '1',
      label: 'Thông tin tài khoản',
    },
    {
      children: <WorkInfo formMethods={formMethods} workerDataDetail={workerDataDetail} />,
      key: '2',
      label: 'Thông tin công tác',
    },
    {
      children: <RecruitmentDataTab formMethods={formMethods} />,
      key: '3',
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

export { DetailWorker };
