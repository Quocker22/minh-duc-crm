import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { InputField } from '@/components/molecules/InputField';
import { Modal } from '@/components/organisms/Modal';
import { getRecruitmentTeamsFormSchema } from '@/modules/customer/services/validation';
import { HRGroup } from '@/modules/hr-management/components/form/HRGroup';
import { useCreateRecruitmentTeams } from '@/modules/hr-management/hooks/useCreateRecruitmentTeams';
import { FormRecruitmentTeamsModel } from '@/modules/hr-management/models';

interface IProps {
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const defaultValues: FormRecruitmentTeamsModel = {
  description: '',
  leader_id: '',
  member: [],
  name: '',
};

const RecruitmentTeamsModal: FC<IProps> = ({ show, onHide, onSaved }) => {
  const { mutateAsync: recruitmentTeams } = useCreateRecruitmentTeams();

  const resolver = yupResolver(getRecruitmentTeamsFormSchema());
  const formMethods = useForm<FormRecruitmentTeamsModel>({ defaultValues, resolver });

  const { mutateAsync } = useMutation(recruitmentTeams);

  const onSubmit: SubmitHandler<FormRecruitmentTeamsModel> = async (formData) => {
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
    <>
      <Modal
        backdrop="static"
        bodyClassName="scroll-y"
        dialogClassName="mw-800px"
        headerClassName="py-3"
        onHide={handleHide}
        show={show}
        title={<h3 className=" text-muted"> Tạo nhóm tuyển dụng mới</h3>}
        centered
      >
        <FormField className="form w-100" methods={formMethods} onSubmit={onSubmit}>
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

          <HRGroup formMethods={formMethods} />

          <div className="text-end pt-10">
            <Button
              className="rounded-pill py-2 me-3 text-danger"
              onClick={() => handleHide()}
              variant="outline"
            >
              Hủy
            </Button>
            <Button className="rounded-pill py-2" type="submit" variant="primary">
              Tạo
            </Button>
          </div>
        </FormField>
      </Modal>
    </>
  );
};

export { RecruitmentTeamsModal };
