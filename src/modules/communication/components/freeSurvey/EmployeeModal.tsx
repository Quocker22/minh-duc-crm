/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable typescript-sort-keys/interface */
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { Button } from '@/components/molecules/Button';
import { Modal } from '@/components/organisms/Modal';
import { StatsManagerWorkerStatus } from '@/modules/communication/models';
import { Avatar, Table, TableColumnsType } from 'antd';
import { useId } from 'react';

interface Props {
  setSelectedManager: React.Dispatch<StatsManagerWorkerStatus>;
  readonly onHide?: () => void;
  readonly show?: boolean;
  dataAllStatsManagerWorkerStatus?: StatsManagerWorkerStatus[];
}

function EmployeeModal({
  onHide,
  show,
  setSelectedManager,
  dataAllStatsManagerWorkerStatus,
}: Props) {
  const uniqueId = useId();

  function handleHide() {
    onHide?.();
  }

  const dataSource = (dataAllStatsManagerWorkerStatus || [])?.map((i, index) => ({
    ...i,
    key: `${i.manager_id}_${index}`,
  }));

  const handleSelectedManager = (record: StatsManagerWorkerStatus) => {
    setSelectedManager(record);
    handleHide();
  };

  const columns: TableColumnsType<StatsManagerWorkerStatus> = [
    {
      dataIndex: 'name',
      title: 'Tên nhân sự',
      render(value, record, index) {
        const avatar = record.manager.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px' }}>{record.manager.name}</div>
          </div>
        );
      },
    },
    {
      dataIndex: 'phone',
      title: 'Số lượng NLĐ',
      render(value, record, index) {
        return (
          <span>
            {' '}
            {record.workers?.reduce(
              (result, current) => result + Number(current.worker_count),
              0
            ) || 0}
          </span>
        );
      },
    },
  ];

  return (
    <Modal
      bodyClassName="scroll-y"
      dialogClassName="mw-800px"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="fw-bolder text-center">Thêm nhận sự đang quản lý</h3>}
      centered
      footer={[
        <Button
          key={uniqueId}
          className="rounded-pill py-2"
          onClick={() => handleHide()}
          variant="outline"
          style={{
            color: 'red',
          }}
        >
          Hủy
        </Button>,
      ]}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 400 }}
        pagination={false}
        rowSelection={{
          onSelect: (record) => {
            handleSelectedManager(record);
          },
          type: 'radio',
        }}
      />
    </Modal>
  );
}

export default EmployeeModal;
