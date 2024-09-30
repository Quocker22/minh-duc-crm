/* eslint-disable react/jsx-boolean-value */
import { FC, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { toAbsoluteUrl } from '@/_metronic/helpers';
import { Image } from '@/components/molecules/Image';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { FileUploadModel } from '@/models';
import { InputRoleFieldArray } from '@/modules/hr-management/components/form/InputRoleFieldArray';
import { TableRoleMember } from '@/modules/hr-management/components/form/TableRoleMember';
import { useGetGroupPermissionList } from '@/modules/hr-management/hooks/useGetGroupPermissionList';
import { FormHRModel } from '@/modules/hr-management/models';
import { filterNameAndId, getHRRoleColor } from '@/utils';

interface IProps {
  formMethods: UseFormReturn<FormHRModel, object>;
}

const HRCreateStep3: FC<IProps> = ({ formMethods }) => {
  const userInfo = formMethods.getValues();
  const role = formMethods.watch('account_type');
  const roleColor = getHRRoleColor(role);
  const avatar = userInfo.avatar as FileUploadModel;

  const { data: groupPermissionList } = useGetGroupPermissionList();
  const newGroupPermissionList = useMemo(
    () => filterNameAndId(groupPermissionList || []),
    [groupPermissionList]
  );

  return (
    <div className="row card-body">
      <span className="text-primary mb-4 p-0">Thông tin tài khoản</span>
      <div className="col-6">
        <div className="row mb-4">
          <div className="col-12">
            <div className="row mb-3">
              <div className="col-sm-3">
                <span className="mb-0">Tên đăng nhập</span>
              </div>
              <div className="col-sm-9">
                <span className="mb-0">
                  <b>{userInfo.phone}</b>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-3">
                <span className="mb-0">Loại tài khoản</span>
              </div>
              <div className="col-sm-9">
                <span className="mb-0">
                  <TableTagCell className="py-1 px-5 rounded-pill fs-6" color={roleColor?.color}>
                    {roleColor?.role}
                  </TableTagCell>
                </span>
              </div>
            </div>
          </div>
        </div>
        {role === 'ADMIN' ? (
          <>
            <div className="border p-3 rounded-3 bg-light">
              <span> Quyền quản lý người dùng mặc định</span>
              <ul>
                <li> Tạo / cập nhật thông tin cho member</li>
                <li>Phân quyền nghiệp vụ cho member</li>
                <li>Dừng / mở hoạt động cho tài khoản member</li>
              </ul>
            </div>
            <InputRoleFieldArray
              formMethods={formMethods}
              plainOptions={newGroupPermissionList}
              disableAll
              selectAll
            />
          </>
        ) : (
          <>
            <div className="border p-3 rounded-3 bg-light">
              <span>Các quyền quản lý người dùng mặc định</span>
              <ul>
                <li> Không có</li>
              </ul>
            </div>
            <div className="mt-3">
              <span className="text-primary">Quyền nghiệp vụ</span>
              <p>Phân vai trò cho tài khoản theo chức năng thực tế</p>
            </div>
            <TableRoleMember formMethods={formMethods} visibleAction={false} />
          </>
        )}
      </div>
      <div className="col-6 d-flex justify-content-center">
        <div className="card card-body ms-10 border">
          <span className="text-muted mb-4">Thông tin cơ bản</span>
          <div className="row">
            <div className="col-4">
              <Image
                alt="avatar"
                className="border rounded"
                height={100}
                src={avatar.url || toAbsoluteUrl('/media/avatars/300-1.jpg')}
                width={100}
                isImageRoundedCircle
              />
            </div>
            <div className="col-8">
              <div className="row mb-2">
                <div className="col-sm-4">
                  <span className="text-muted mb-0">Họ tên</span>
                </div>
                <div className="col-sm-8">
                  <span className="mb-0">{userInfo.name}</span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <span className="text-muted mb-0">Giới tính</span>
                </div>
                <div className="col-sm-8">
                  <span className="mb-0">{userInfo.gender === 'MALE' ? 'Nam' : 'Nữ'}</span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <span className="text-muted mb-0">Số điện thoại</span>
                </div>
                <div className="col-sm-8">
                  <span className="mb-0">{userInfo.phone}</span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <span className="text-muted mb-0">Email</span>
                </div>
                <div className="col-sm-8">
                  <span className="mb-0">{userInfo.email}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4">
                  <span className="text-muted mb-0">Loại tài khoản</span>
                </div>
                <div className="col-sm-8">
                  <span className="mb-0">
                    <TableTagCell className="py-1 px-5 rounded-pill fs-6" color={roleColor?.color}>
                      {roleColor?.role}
                    </TableTagCell>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HRCreateStep3 };
