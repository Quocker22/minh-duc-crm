/* eslint-disable simple-import-sort/imports */
import { Avatar, Table, TableColumnsType, TablePaginationConfig } from 'antd';
import { FC } from 'react';

import { useQueryRequest } from '@/hooks/useQueryRequest';
import { getClientDateTime } from '@/utils';
import { RecruitmentWorkerHistory } from '@/modules/recruitment-plan/models';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { useGetNoteCheckInList } from '@/modules/operate-worker/hooks/useGetNoteCheckInList';

interface Props {
  workerId: string;
}

const WorkerNotedList: FC<Props> = ({ workerId }) => {
  const { queryString, updateQueryState, queryState } = useQueryRequest<{
    worker_id: string;
  }>({ filters: { worker_id: workerId } }, () => undefined, false);

  const { isLoading, data: historyList } = useGetNoteCheckInList(queryString);

  const dataSource = historyList?.rows.map((history) => ({ ...history, key: history.id }));

  const handleChangePagination = ({ current, pageSize }: TablePaginationConfig) => {
    updateQueryState({
      limit: pageSize as any,
      page: current,
    });
  };

  const columns: TableColumnsType<RecruitmentWorkerHistory> = [
    {
      dataIndex: 'code',
      render(_, record) {
        const avatar = record.updater?.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1 }}>{record.updater?.name}</div>
          </div>
        );
      },
      title: 'Tên',
    },
    {
      dataIndex: 'note',
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

  return (
    <div className="m-5">
      {historyList?.rows.length ? (
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
          onChange={handleChangePagination}
          pagination={{
            current: queryState.page,
            pageSize: queryState.limit,
            total: historyList?.total_rows,
          }}
          scroll={{ y: 300 }}
        />
      ) : (
        <span className="text-center">Chưa có thông tin ghi chú</span>
      )}
    </div>
  );
};

export { WorkerNotedList };
