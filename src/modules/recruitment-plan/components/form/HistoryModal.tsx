/* eslint-disable simple-import-sort/imports */
import { Modal } from '@/components/organisms/Modal';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useGetRecruitmentUpdateHistoryList } from '@/modules/recruitment-plan/hooks/useGetRecruitmentUpdateHistoryList';
import { getClientDateTime } from '@/utils';
import { Avatar, Table, TableColumnsType, TablePaginationConfig } from 'antd';
import { useParams } from 'react-router-dom';
import { RecruitmentUpdateHistoryModel } from '@/modules/recruitment-plan/models';
import defaultAvatar from '@/assets/images/defaultAvatar.png';

type Props = {
  readonly onHide?: () => void;
  readonly show?: boolean;
};

function HistoryModal({ onHide, show }: Props) {
  const { id } = useParams();
  const { updateQueryState } = useQueryRequest({ limit: 999 as any }, () => undefined, false);

  const { isLoading, data: historyList } = useGetRecruitmentUpdateHistoryList(
    `page=1&limit=999&id=${id}`
  );

  const dataSource = historyList?.rows.map((history) => ({ ...history, key: history.id }));

  const columns: TableColumnsType<RecruitmentUpdateHistoryModel> = [
    {
      dataIndex: 'code',
      render(_, record) {
        const avatar = record.updated_by?.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div>{record.updated_by?.name}</div>
          </div>
        );
      },
      title: 'Tên',
    },
    {
      dataIndex: 'message',
      title: 'Ghi chú',
    },
    {
      dataIndex: 'leader',
      render(_, record) {
        return (
          <div>
            <span>{getClientDateTime(record.updated_at)}</span>
          </div>
        );
      },
      title: 'Lúc',
    },
  ];

  const handleChangePagination = ({ current, pageSize }: TablePaginationConfig) => {
    updateQueryState({
      limit: pageSize as any,
      page: current,
    });
  };
  function handleHide() {
    onHide?.();
  }

  return (
    <Modal
      bodyClassName="scroll-y"
      dialogClassName="mw-1000px"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="fw-bolder w-100 text-center">Lịch sử thao tác</h3>}
      centered
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        onChange={handleChangePagination}
        pagination={false}
        scroll={{ y: 400 }}
        showHeader={false}
      />
    </Modal>
  );
}

export default HistoryModal;
