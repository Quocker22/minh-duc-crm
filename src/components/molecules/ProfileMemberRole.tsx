import { Table, TableColumnsType } from 'antd';
import { FC } from 'react';

import { HRModel, RoleModel } from '@/modules/hr-management/models';

interface IProps {
  readonly data?: HRModel;
}

const ProfileMemberRole: FC<IProps> = ({ data }) => {
  const columns: TableColumnsType<RoleModel> = [
    {
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => index + 1,
      title: 'STT',
    },
    { dataIndex: 'name', key: 'name', title: 'Tên vai trò' },
  ];

  return (
    <>
      <div className="row card-body">
        <div className="col-6">
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
            </div>
          </div>
          <Table columns={columns} dataSource={data?.roles} />
        </div>
      </div>
    </>
  );
};

export { ProfileMemberRole };
