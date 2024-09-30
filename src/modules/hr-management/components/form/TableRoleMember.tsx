import { Popconfirm, Table, TableColumnsType } from 'antd';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useGetRoleList } from '@/modules/hr-management/hooks/useGetRoleList';
import { FormHRModel, RoleModel } from '@/modules/hr-management/models';

interface IProps {
  formMethods: UseFormReturn<FormHRModel, object>;
  closeIcon?: boolean; // Prop to disable the close icon
  visibleAction?: boolean;
}

const TableRoleMember: React.FC<IProps> = ({ formMethods, closeIcon, visibleAction = true }) => {
  const [dataSource, setDataSource] = useState<RoleModel[]>();
  const { data: roleList } = useGetRoleList();

  const roleIds = formMethods.watch('role_ids');
  const filteredRoleList = roleList?.rows.filter((role) => roleIds?.includes(role.id));
  const useDataSource = filteredRoleList?.map((role) => ({ ...role, key: role.id }));

  useEffect(() => {
    setDataSource(useDataSource);
  }, [roleList, roleIds]);

  const columns: TableColumnsType<RoleModel> = [
    {
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => index + 1,
      title: 'STT',
    },
    { dataIndex: 'name', key: 'name', title: 'Tên vai trò' },
    {
      dataIndex: 'action_remove',
      key: 'action_remove',
      render: (_, record) => (
        <Popconfirm onConfirm={() => handleDelete(record.id)} title="Bạn có chắc chắn muốn xóa?">
          {closeIcon && (
            <a>
              <span className="material-symbols-outlined">close</span>
            </a>
          )}
        </Popconfirm>
      ),
      title: 'Gỡ',
    },
  ];

  const handleDelete = (key: React.Key) => {
    const newData = dataSource?.filter((item) => item.id !== key);
    const idArray = newData?.map((item) => item.id) || [];
    formMethods.setValue('role_ids', idArray);
    setDataSource(newData);
  };

  return (
    <Table
      columns={columns.filter((item) => (visibleAction ? true : item.key !== 'action_remove'))}
      dataSource={dataSource}
    />
  );
};

export { TableRoleMember };
