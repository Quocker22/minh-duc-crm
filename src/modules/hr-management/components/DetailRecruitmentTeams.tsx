import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Spin } from 'antd';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { InputField } from '@/components/molecules/InputField';
import { HRGroup } from '@/modules/hr-management/components/form/HRGroup';
import { useGetRecruitmentTeamsDetail } from '@/modules/hr-management/hooks/useGetRecruitmentTeamsDetail';
import { useUpdateRecruitmentTeams } from '@/modules/hr-management/hooks/useUpdateRecruitmentTeams';
import { FormRecruitmentTeamsModel, TeamRole } from '@/modules/hr-management/models';
import { getRecruitmentTeamsFormSchema } from '@/modules/hr-management/services/validation';
import { getRoleEmployee } from '@/roles';
import { history } from '@/utils';

interface Props {
  breadcrumbName: (value: string) => void;
}

const DetailRecruitmentTeams: React.FC<Props> = ({ breadcrumbName }) => {
  const { id } = useParams();
  const resolver = yupResolver(getRecruitmentTeamsFormSchema());
  const formMethods = useForm<FormRecruitmentTeamsModel>({ resolver });
  const { mutateAsync: updateHR, isLoading } = useUpdateRecruitmentTeams();
  const { mutateAsync } = useMutation(updateHR);
  const onSubmit: SubmitHandler<FormRecruitmentTeamsModel> = async (formData) => {
    const res = await mutateAsync({ ...formData, id });
    if (!res) return;

    history.push(`/hr-management/recruitment-teams`);
  };

  const { data: recruitmentTeamsDetail } = useGetRecruitmentTeamsDetail(id || '', {
    enabled: !!id,
    onSuccess: (data) => {
      if (!data) return;
      breadcrumbName(data.name || '');

      formMethods.reset({
        description: data.description,
        leader_id: data.leader_id,
        member: data.member,
        name: data.name,
      });
    },
  });

  const qlnCapNhat = getRoleEmployee(TeamRole.qln_cap_nhat);

  return (
    <Spin spinning={isLoading}>
      <FormField className="form" methods={formMethods} onSubmit={onSubmit}>
        <div className="card card-body">
          <div className="row">
            <div className="col-8">
              <h6 className="text-primary mb-6">Thông tin nhóm tuyển dụng</h6>
              <div className="ms-4">
                <InputField
                  classNameInputHint="col-9"
                  control={formMethods.control}
                  groupClass="row mb-7"
                  label={<b>Tên nhóm tuyển dụng</b>}
                  labelClass="col-3 mt-3"
                  name="name"
                  required
                />

                <InputField
                  autoComplete={false}
                  classNameInputHint="col-9"
                  control={formMethods.control}
                  groupClass="row mb-7"
                  label={<b>Mô tả</b>}
                  labelClass="col-3 mt-3"
                  name="description"
                />

                <HRGroup
                  formMethods={formMethods}
                  recruitmentTeamsDetail={recruitmentTeamsDetail}
                />
              </div>

              <div className="d-flex justify-content-end mt-4">
                <Button
                  className="me-3 rounded-pill py-1 px-6"
                  onClick={() => history.push(`/hr-management/recruitment-teams`)}
                  variant="light"
                >
                  Đóng
                </Button>

                {qlnCapNhat && (
                  <Button className="rounded-pill py-1 px-6" type="submit" variant="primary">
                    Cập nhật
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </FormField>
    </Spin>
  );
};

export { DetailRecruitmentTeams };
