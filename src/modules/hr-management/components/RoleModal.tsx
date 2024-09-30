/* eslint-disable simple-import-sort/imports */
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FC, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { InputField } from '@/components/molecules/InputField';
import { Modal } from '@/components/organisms/Modal';
import { useAuth } from '@/hooks/useAuth';
import { getRoleFormSchema } from '@/modules/customer/services/validation';
import { InputRoleFieldArray } from '@/modules/hr-management/components/form/InputRoleFieldArray';
import { useCreateRole } from '@/modules/hr-management/hooks/useCreateRole';
import { useGetRoleDetail } from '@/modules/hr-management/hooks/useGetRoleDetail';
import { useUpdateRole } from '@/modules/hr-management/hooks/useUpdateRole';
import {
  FormRoleModel,
  PermissionRole,
  RoleModel,
  SimplifiedRecruitmentPlan,
} from '@/modules/hr-management/models';
import moment from 'moment';
import { DateTimeFormat } from '@/constants';
import { Popconfirm, PopconfirmProps } from 'antd';
import { useDeleteGroupRole } from '@/modules/hr-management/hooks/useDeleteGroupRole';
import { getRoleEmployee } from '@/roles';

interface IProps {
  readonly data?: SimplifiedRecruitmentPlan[];
  readonly idEdit?: string;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const defaultValues: FormRoleModel = {
  creator_id: '',
  description: '',
  name: '',
  permissions: [],
};

const RoleModal: FC<IProps> = ({ show, onHide, onSaved, data, idEdit }) => {
  const [onChangeValue, setOnChangeValue] = useState<boolean>(false);

  const { currentUser } = useAuth();
  const { mutateAsync: createRole } = useCreateRole();
  const { mutateAsync: updateRole } = useUpdateRole();
  const { mutateAsync: deleteGroupRole } = useDeleteGroupRole();

  const resolver = yupResolver(getRoleFormSchema());
  const formMethods = useForm<FormRoleModel>({ defaultValues, resolver });
  formMethods.setValue('creator_id', currentUser?.id);

  const action = idEdit
    ? (formData: FormRoleModel) => updateRole({ ...formData, id: idEdit })
    : createRole;
  const { mutateAsync } = useMutation(action);

  const onSubmit: SubmitHandler<FormRoleModel> = async (formData) => {
    const res = await mutateAsync(formData);
    if (!res) return;
    onSaved?.();
    formMethods.reset();
  };

  function handleHide() {
    onHide?.();
    formMethods.reset();
  }

  const { data: roleDetail } = useGetRoleDetail(idEdit || '', {
    enabled: !!idEdit,
    onSuccess: (role) => {
      if (!role) return;

      formMethods.reset({
        creator_id: role.creator_id,
        description: role.description,
        name: role.name,
      });
    },
  });

  const extractChecked = useMemo(() => extractCheckedPermissions(roleDetail), [roleDetail]);

  const confirm: PopconfirmProps['onConfirm'] = async () => {
    const res = await deleteGroupRole(idEdit || '');
    if (!res) return;

    onSaved?.();
    formMethods.reset();
  };

  const qlqCapNhat = getRoleEmployee(PermissionRole.qlq_cap_nhat);

  return (
    <Modal
      backdrop="static"
      bodyClassName="scroll-y"
      dialogClassName="mw-1000px"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={
        <h3 className="fw-bolder w-100 text-center text-primary">
          {' '}
          {idEdit ? 'Cập nhật ' : 'Tạo '} vai trò
        </h3>
      }
      centered
    >
      <FormField className="form w-100" methods={formMethods} onSubmit={onSubmit}>
        <InputField
          classNameInputHint="col-10"
          control={formMethods.control}
          groupClass="row mb-7"
          label={<b>Tên vai trò</b>}
          labelClass="col-2 mt-3"
          name="name"
          required
        />

        <InputField
          autoComplete={false}
          classNameInputHint="col-10"
          control={formMethods.control}
          groupClass="row mb-7"
          label={<b>Mô tả</b>}
          labelClass="col-2 mt-3"
          name="description"
        />

        <div className="row mb-7">
          <b className="col-2">Phân quyền nghiệp vụ</b>
          <span className="col-8 align-self-end">
            <div className="row mb-3">
              <span className="text-muted fs-6 fw-bold">Danh sách quyền nghiệp vụ</span>
            </div>
            <div className="overflow-auto" style={{ maxHeight: '300px' }}>
              <InputRoleFieldArray
                dataUpdate={extractChecked}
                formMethods={formMethods}
                isChangeValue={() => {
                  if (!onChangeValue) setOnChangeValue(true);
                }}
                plainOptions={data}
              />
            </div>
          </span>
          {idEdit ? (
            <div className="col-2">
              <span className="text-muted">Ngày tạo:</span>
              <span>
                &nbsp; &nbsp;{moment(roleDetail?.created_at).format(DateTimeFormat.fe_date_2)}
              </span>
            </div>
          ) : null}
        </div>

        <div className="d-flex justify-content-between">
          <Popconfirm
            cancelText="Hủy"
            okText="Xóa"
            onConfirm={confirm}
            title="Bạn có chắc muốn xóa vai trò này không ?"
          >
            <span className="pt-2 text-danger cursor-pointer">Xóa vai trò</span>
          </Popconfirm>
          <div className="">
            <Button className="rounded-pill py-2" onClick={() => handleHide()} variant="outline">
              Hủy
            </Button>
            {qlqCapNhat && (
              <Button
                className="rounded-pill py-2 ms-3"
                disabled={!onChangeValue}
                type="submit"
                variant="primary"
              >
                {idEdit ? 'Cập nhật ' : 'Tạo '}vai trò
              </Button>
            )}
          </div>
        </div>
      </FormField>
    </Modal>
  );
};

const extractCheckedPermissions = (groups?: RoleModel): { id: string }[] => {
  const checkedPermissions: { id: string }[] = [];

  groups?.group_permissions?.forEach((groupPermission) => {
    groupPermission?.permissions.forEach((permission) => {
      if (permission.checked) {
        checkedPermissions.push({ id: permission.id });
      }
    });
  });

  return checkedPermissions;
};

export { RoleModal };
