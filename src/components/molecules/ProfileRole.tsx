import clsx from 'clsx';
import { FC, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { KTSVG } from '@/_metronic/helpers';
import { Button } from '@/components/molecules/Button';
import { RadioField } from '@/components/molecules/RadioField';
import { useAuth } from '@/hooks/useAuth';
import { InputRoleFieldArray } from '@/modules/hr-management/components/form/InputRoleFieldArray';
import { TableRoleMember } from '@/modules/hr-management/components/form/TableRoleMember';
import { MemberRoleModal } from '@/modules/hr-management/components/MemberRoleModal';
import { useGetGroupPermissionList } from '@/modules/hr-management/hooks/useGetGroupPermissionList';
import { FormHRModel, HRStatus } from '@/modules/hr-management/models';
import { checkRoleSystem, filterNameAndId } from '@/utils';

interface IProps {
  formMethods: UseFormReturn<FormHRModel, object>;
}

const ProfileRole: FC<IProps> = ({ formMethods }) => {
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);

  const role = formMethods.watch('account_type');
  formMethods.setValue('status', HRStatus.active);

  const { currentUser } = useAuth();
  const roleSystem = checkRoleSystem(currentUser?.account_type, role);

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
          {role === 'OWNER' && (
            <RadioField
              className="w-100"
              control={formMethods.control}
              groupClass="mb-3"
              label={<b>Loại tài khoản</b>}
              name="account_type"
              options={[{ label: 'Owner', value: 'OWNER' }]}
              disabled
              required
            />
          )}
          {roleSystem && currentUser?.account_type === 'OWNER' && role !== 'OWNER' && (
            <RadioField
              className="w-100"
              control={formMethods.control}
              groupClass="mb-3"
              label={<b>Loại tài khoản</b>}
              name="account_type"
              options={[
                { label: 'Admin', value: 'ADMIN' },
                { label: 'Member', value: 'MEMBER' },
              ]}
              required
            />
          )}
          {role === 'OWNER' && (
            <>
              <div className="border p-3 rounded-3 bg-light mb-5">
                <span> Quyền Owner mặc định</span>
                <ul>
                  <li> Được thao tác tất cả các chức năng trong hệ thống</li>
                </ul>
              </div>
              <div className="rounded-3 mb-3">
                <span className="text-primary"> Quyền nghiệp vụ</span>
                <p>Owner được mở tất cả quyền nghiệp vụ hệ thống</p>
              </div>
            </>
          )}
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

export { ProfileRole };
