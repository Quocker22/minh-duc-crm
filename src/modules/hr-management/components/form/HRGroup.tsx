import { Popconfirm, Radio, TableColumnsType } from 'antd';
import { FC, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { KTSVG } from '@/_metronic/helpers';
import { TableAntd } from '@/components/organisms/TableAntd';
import { HRGroupModal } from '@/modules/hr-management/components/HRGroupModal';
import {
  FormRecruitmentTeamsModel,
  HRModel,
  RecruitmentTeamsModel,
} from '@/modules/hr-management/models';

interface IProps {
  formMethods: UseFormReturn<FormRecruitmentTeamsModel, object>;
  readonly recruitmentTeamsDetail?: RecruitmentTeamsModel;
}

const HRGroup: FC<IProps> = ({ formMethods, recruitmentTeamsDetail }) => {
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const [newDataHRGroup, setNewDataHRGroup] = useState<HRModel[]>();
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

  const leader = formMethods.watch('leader_id');

  useEffect(() => {
    if (leader) handleRadioChange(leader);
  }, [leader]);

  const columns: TableColumnsType<HRModel> = [
    {
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => index + 1,
      title: 'STT',
    },
    {
      dataIndex: 'code',
      title: 'Mã nhân sự',
    },
    {
      dataIndex: 'name',
      title: 'Tên nhân sự tuyển dụng',
    },
    {
      dataIndex: 'phone',
      title: 'Số điện thoại',
    },
    {
      dataIndex: 'id',
      render: (text, record) => (
        <div className="w-100 text-center">
          <Radio
            checked={selectedRadio === record.id}
            onChange={() => handleRadioChange(record.id)}
          />
        </div>
      ),
      title: <div className="w-100 text-center ">Chọn Trưởng nhóm</div>,
    },
    {
      dataIndex: 'stt',
      render: (_text, record) => {
        const isLeader = record.id === selectedRadio;

        return (
          !isLeader && (
            <div className="text-center">
              <Popconfirm
                onConfirm={() => {
                  handleDelete(record.id);
                }}
                title="Bạn có chắc chắn muốn xóa?"
              >
                <a>
                  <span className="material-symbols-outlined">close</span>
                </a>
              </Popconfirm>
            </div>
          )
        );
      },
      title: <div className="w-100 text-center ">Gỡ</div>,
    },
  ];

  const handleRadioChange = (id: string) => {
    formMethods.setValue('leader_id', id);
    setSelectedRadio(id);
  };

  const handleDelete = (key: React.Key) => {
    const newData = dataSource?.filter((item) => item.id !== key);

    const newKeyData = formMethods.watch('member')?.filter((i) => i.id !== key);
    formMethods.setValue('member', newKeyData);
    setNewDataHRGroup(newData);
  };

  const dataSource = newDataHRGroup || recruitmentTeamsDetail?.member || [];

  return (
    <>
      <div className="row min-h-200px">
        <div className="col-6">
          <span>Danh sách nhân sự tuyển dụng trong nhóm ({dataSource?.length})</span>
        </div>
        <div className="col-6 text-end">
          <span className="cursor-pointer" onClick={() => setIsVisibleFormModal(true)}>
            Thêm nhân sự tuyển dụng{' '}
            <KTSVG className="svg-icon-2 fs-3" path="/media/icons/duotune/general/add_task.svg" />
          </span>
        </div>
        <div className="mt-3">
          <TableAntd
            columns={columns}
            data={dataSource}
            sticky={{ offsetHeader: 0 }}
            isHidePagination
            showSizeChanger
          />
        </div>
      </div>
      {isVisibleFormModal && (
        <HRGroupModal
          formMethods={formMethods}
          onHide={() => {
            setIsVisibleFormModal(false);
          }}
          onSaved={() => setIsVisibleFormModal(false)}
          onSelectedRows={(newSelectedRows?: HRModel[]) => {
            const newData = mergeUniqueUsers(newSelectedRows || [], dataSource || []);
            formMethods.setValue('member', getUserIds(newData));
            setNewDataHRGroup(newData);
          }}
          show={isVisibleFormModal}
        />
      )}
    </>
  );
};

export { HRGroup };

function mergeUniqueUsers(list1: HRModel[], list2: HRModel[]): HRModel[] {
  const userMap: { [key: string]: HRModel } = {};

  [...list1, ...list2].forEach((user) => {
    userMap[user.id] = user;
  });

  return Object.values(userMap);
}

function getUserIds(users: HRModel[]): { id: string }[] {
  return users.map((user) => ({ id: user.id }));
}
