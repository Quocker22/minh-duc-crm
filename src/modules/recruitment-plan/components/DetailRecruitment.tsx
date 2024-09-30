import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Spin, Tabs, TabsProps } from 'antd';
import cloneDeep from 'lodash-es/cloneDeep';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { FormField } from '@/components/molecules/FormField';
import { OverviewResult } from '@/modules/recruitment-organization/components/form/OverviewResult';
import { InformationCampaign } from '@/modules/recruitment-plan/components/form/InformationCampaign';
import { DataDeletedList } from '@/modules/recruitment-plan/components/table-data-deleted/DataDeletedList';
import { DataListWrapper } from '@/modules/recruitment-plan/components/table-list-data/DataList';
import { TeamPlan } from '@/modules/recruitment-plan/components/table-team/TeamPlan';
import { useGetRecruitmentDetail } from '@/modules/recruitment-plan/hooks/useGetRecruitmentDetail';
import { useUpdateRecruitment } from '@/modules/recruitment-plan/hooks/useUpdateCustomer';
import { FormRecruitmentPlanModel, RePlanRole } from '@/modules/recruitment-plan/models';
import { getRecruitmentFormSchema } from '@/modules/recruitment-plan/services/validation';
import { getRoleEmployee } from '@/roles';
import { history } from '@/utils';

interface Props {
  breadcrumbName: (value: string) => void;
}

const DetailRecruitment: React.FC<Props> = ({ breadcrumbName }) => {
  const { id } = useParams();

  const resolver = yupResolver(getRecruitmentFormSchema());
  const formMethods = useForm<FormRecruitmentPlanModel>({ resolver });
  const { mutateAsync: updateRecruitment, isLoading } = useUpdateRecruitment();
  const { mutateAsync } = useMutation(updateRecruitment);
  const onSubmit: SubmitHandler<FormRecruitmentPlanModel> = async (formData) => {
    const ageRange = cloneDeep(formData);
    delete formData.age_range_max;
    delete formData.age_range_min;
    const res = await mutateAsync({
      ...formData,
      age_range: { max: ageRange.age_range_max, min: ageRange.age_range_min },
      id,
    });
    if (!res) return;

    history.push('list');
  };

  const { data: recruitmentDataDetail } = useGetRecruitmentDetail(id || '', {
    enabled: !!id,
    onSuccess: (data) => {
      if (!data) return;

      breadcrumbName(data?.name || '');

      formMethods.reset({
        academic_level_id: data.academic_level_id,
        age_range_max: data.age_range?.max,
        age_range_min: data.age_range?.min,
        career_id: data.career_id,
        customer_id: data.customer_id,
        degree_id: data.degree_id,
        end_date: data.end_date,
        experience: data.experience,
        gender_percentage: data.gender_percentage,
        name: data.name,
        other_requirement_id: data.other_requirement_id,
        position_id: data.position_id,
        quantity: data.quantity,
        salary: data.salary,
        start_date: data.start_date,
      });
    },
  });

  const khtdXemTongQuan = getRoleEmployee(RePlanRole.khtd_xem_tong_quan);
  const khtdCapNhatChienDich = getRoleEmployee(RePlanRole.khtd_cap_nhat_chien_dich);
  const khtdXemDataXoa = getRoleEmployee(RePlanRole.khtd_xem_data_xoa);

  const items: TabsProps['items'] = [
    {
      children: <DataListWrapper />,
      key: '1',
      label: 'Danh sách data',
    },
    {
      children: <OverviewResult permission={khtdXemTongQuan} />,
      key: '2',
      label: 'Tổng quan kết quả',
    },
    {
      children: (
        <InformationCampaign
          formMethods={formMethods}
          isViewOnly={!khtdCapNhatChienDich}
          recruitmentDetail={recruitmentDataDetail}
        />
      ),
      key: '3',
      label: 'Thông tin chiến dịch',
    },
    {
      children: <TeamPlan />,
      key: '4',
      label: 'Chia chỉ tiêu',
    },
    {
      children: <DataDeletedList permission={khtdXemDataXoa} />,
      key: '5',
      label: 'Data đã xóa khỏi chiến dịch',
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

export { DetailRecruitment };
