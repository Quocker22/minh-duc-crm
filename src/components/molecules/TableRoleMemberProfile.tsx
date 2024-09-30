import { Table, TableColumnsType } from 'antd';
import React from 'react';

import { RoleModel } from '@/modules/hr-management/models';

interface IProps {
  readonly data: RoleModel[] | undefined;

  // Prop to disable the close icon
}

const TableRoleMemberProfile: React.FC<IProps> = ({ data }) => {
  const dataSource = data?.map((role) => ({ ...role, key: role.id }));

  const columns: TableColumnsType<RoleModel> = [
    {
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => index + 1,
      title: 'STT',
    },
    { dataIndex: 'name', key: 'name', title: 'Tên vai trò' },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
};

export { TableRoleMemberProfile };
