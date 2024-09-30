import { HistoryOutlined } from '@ant-design/icons';
import { Image, Space } from 'antd';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useGetRecruitmentUpdateHistoryList } from '@/modules/recruitment-plan/hooks/useGetRecruitmentUpdateHistoryList';
import { getClientDateTime } from '@/utils';

const RecruitmentUpdateHistoryList: FC = () => {
  const { id } = useParams();
  const { queryString, updateFiltersState, updateQueryState } = useQueryRequest<{
    id: string;
  }>();

  const { data: historyList } = useGetRecruitmentUpdateHistoryList(queryString);

  useEffect(() => {
    updateFiltersState({ id });
  }, [id, historyList]);

  return (
    <div className="ms-5">
      <Space className="pb-2 border-bottom border-2 w-100">
        <HistoryOutlined className="fs-3" rev="HistoryOutlined" />
        <span className="fs-5">lịch sử thao tác</span>
      </Space>

      {historyList?.rows.map((i) => {
        return (
          <div key={i.id} className="row mt-5 border-bottom border-2 w-100">
            <div className="col-3">
              <Space>
                <Image preview={false} src={i.updated_by.avatar} width={20} />
                <span>{i.updated_by.name}</span>
              </Space>
            </div>
            <div className="col-5">
              <p className="text-start">{i.message}</p>
            </div>
            <div className="col-4">
              <span>Lúc</span> <span>{getClientDateTime(i.updated_at)}</span>
            </div>
          </div>
        );
      })}
      <div className="mt-2 w-100 text-end">
        {(historyList?.rows.length || 0) === 3 && (
          <span
            className="fs-4 text-primary cursor-pointer"
            onClick={() => updateQueryState({ limit: 20 })}
          >
            xem thêm
          </span>
        )}

        {(historyList?.rows.length || 0) > 3 && (
          <span
            className="fs-4 text-primary cursor-pointer"
            onClick={() => updateQueryState({ limit: 3 })}
          >
            ẩn bớt
          </span>
        )}
      </div>
    </div>
  );
};

export { RecruitmentUpdateHistoryList };
