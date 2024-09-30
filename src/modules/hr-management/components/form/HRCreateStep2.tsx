import clsx from 'clsx';
import { FC, useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';
import { Button } from '@/components/molecules/Button';
import { Image } from '@/components/molecules/Image';
import { RadioField } from '@/components/molecules/RadioField';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { useAuth } from '@/hooks/useAuth';
import { FileUploadModel } from '@/models';
import { InputRoleFieldArray } from '@/modules/hr-management/components/form/InputRoleFieldArray';
import { TableRoleMember } from '@/modules/hr-management/components/form/TableRoleMember';
import { MemberRoleModal } from '@/modules/hr-management/components/MemberRoleModal';
import { useGetGroupPermissionList } from '@/modules/hr-management/hooks/useGetGroupPermissionList';
import { FormHRModel, HRRole, HRStatus } from '@/modules/hr-management/models';
import { filterNameAndId, getHRRoleColor } from '@/utils';

interface IProps {
  formMethods: UseFormReturn<FormHRModel, object>;
}

const HRCreateStep2: FC<IProps> = ({ formMethods }) => {
  const { currentUser } = useAuth();

  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);

  const userInfo = formMethods.getValues();
  const role = formMethods.watch('account_type');
  formMethods.setValue('status', HRStatus.active);

  useEffect(() => {
    if (currentUser?.account_type === HRRole.admin) {
      formMethods.setValue('account_type', HRRole.member);
    }
  }, [currentUser]);

  const roleColor = getHRRoleColor(role);
  const avatar = userInfo.avatar as FileUploadModel;

  const { data: groupPermissionList } = useGetGroupPermissionList();
  const newGroupPermissionList = useMemo(
    () => filterNameAndId(groupPermissionList || []),
    [groupPermissionList]
  );

  function handleSaved() {
    setIsVisibleFormModal(false);
  }

  return (
    <>
      <div className="row card-body">
        <div className="col-6">
          <RadioField
            className="w-100"
            control={formMethods.control}
            disabled={currentUser?.account_type === HRRole.admin}
            groupClass="mb-3"
            label={<b>Loại tài khoản</b>}
            name="account_type"
            options={[
              { label: 'Admin', value: 'ADMIN' },
              { label: 'Member', value: 'MEMBER' },
              { label: 'QL nhà máy', value: 'FACTORY' },
            ]}
            required
          />
          {role === 'ADMIN' && (
            <>
              <div className="border p-3 rounded-3 bg-light mb-5">
                <span> Quyền quản lý người dùng mặc định</span>
                <ul>
                  <li> Tạo / cập nhật thông tin cho member</li>
                  <li>Phân quyền nghiệp vụ cho member</li>
                  <li>Dừng / mở hoạt động cho tài khoản member</li>
                </ul>
              </div>
              <div className="rounded-3 mb-3">
                <span className="text-primary"> Quyền nghiệp vụ</span>
                <p>Admin được mở tất cả quyền nghiệp vụ hệ thống</p>
              </div>
              <div className="overflow-auto" style={{ maxHeight: '165px' }}>
                <InputRoleFieldArray
                  formMethods={formMethods}
                  plainOptions={newGroupPermissionList}
                  disableAll
                  selectAll
                />
              </div>
            </>
          )}
          {role === 'MEMBER' && (
            <>
              <div className="border p-3 rounded-3 bg-light">
                <span>Các quyền quản lý người dùng mặc định</span>
                <ul>
                  <li> Không có</li>
                </ul>
              </div>
              <div className="mt-3">
                <span className="text-primary">Quyền nghiệp vụ</span>
                <div className="d-flex justify-content-between my-2">
                  <span>Phân vai trò cho tài khoản theo chức năng thực tế</span>
                  <Button
                    className={clsx('d-flex fs-6 text-mute p-0 text-primary')}
                    onClick={() => setIsVisibleFormModal(true)}
                    variant="link rounded-pill"
                  >
                    <KTSVG
                      className="svg-icon-2 fs-3"
                      path="/media/icons/duotune/general/add_task.svg"
                    />
                    Thêm vai trò
                  </Button>
                </div>
              </div>
              <TableRoleMember formMethods={formMethods} closeIcon />
            </>
          )}

          {role === 'FACTORY' && (
            <>
              <div className="border p-3 rounded-3 bg-light">
                <span>Các quyền quản lý nhà máy mặc định</span>
                <ul>
                  <li> Xem/ Cập nhật trạng thái data cho NLĐ trong chiến dịch tuyển dụng</li>
                  <li> Vận hành NLĐ trong nhà máy</li>
                </ul>
              </div>
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
                    <span className="text-muted mb-0">loại tài khoản</span>
                  </div>
                  <div className="col-sm-8">
                    <span className="mb-0">
                      {roleColor?.role ? (
                        <TableTagCell
                          className="py-1 px-5 rounded-pill fs-6"
                          color={roleColor?.color}
                        >
                          {roleColor?.role}
                        </TableTagCell>
                      ) : (
                        <>---</>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isVisibleFormModal && (
        <MemberRoleModal
          formMethods={formMethods}
          onHide={() => {
            setIsVisibleFormModal(false);
          }}
          onSaved={handleSaved}
          show={isVisibleFormModal}
        />
      )}
    </>
  );
};

export { HRCreateStep2 };
