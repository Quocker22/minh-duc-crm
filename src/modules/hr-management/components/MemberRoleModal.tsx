import { Table, TableColumnsType } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
import { FC, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { Modal } from '@/components/organisms/Modal';
import { useGetRoleList } from '@/modules/hr-management/hooks/useGetRoleList';
import { FormHRModel, RoleModel } from '@/modules/hr-management/models';

interface IProps {
  formMethods?: UseFormReturn<FormHRModel, object>;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const columns: TableColumnsType<RoleModel> = [
  {
    dataIndex: 'name',
    title: 'Tên vai trò',
  },
];

const MemberRoleModal: FC<IProps> = ({ show, onHide, formMethods }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { isLoading, data: roleList } = useGetRoleList();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    // Update selectedRowKeys based on formMethods?.watch('role_ids')
    const watchedRoleIds = formMethods?.watch('role_ids');
    if (watchedRoleIds) {
      setSelectedRowKeys(watchedRoleIds);
    }
  }, [formMethods]);

  const rowSelection = {
    // Determine whether a row's checkbox should be checked based on role_ids
    getCheckboxProps: (record: RoleModel): CheckboxProps => ({
      checked: selectedRowKeys.includes(record.id),
    }),

    onChange: onSelectChange,

    selectedRowKeys,
  };

  const handleSubmit = () => {
    formMethods?.setValue('role_ids', selectedRowKeys);
    onHide?.();
  };

  function handleHide() {
    onHide?.();
  }

  const dataSource = roleList?.rows.map((role) => ({ ...role, key: role.id }));

  return (
    <Modal
      backdrop={isLoading || 'static'}
      bodyClassName="scroll-y"
      dialogClassName="mw-1000px"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="text-muted">Danh sách vai trò</h3>}
      centered
    >
      <Table columns={columns} dataSource={dataSource} rowSelection={rowSelection} />

      <div className="text-end pt-10">
        <Button className="rounded-pill py-2 me-3" onClick={() => handleHide()} variant="outline">
          Hủy
        </Button>
        <Button
          className="rounded-pill py-2"
          onClick={handleSubmit}
          type="submit"
          variant="primary"
        >
          Thêm
        </Button>
      </div>
    </Modal>
  );
};

export { MemberRoleModal };
