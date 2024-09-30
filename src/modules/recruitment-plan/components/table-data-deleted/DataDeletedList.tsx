import { Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import { ProtectedComponent } from '@/components/molecules/ProtectedComponent';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { Table } from '@/components/organisms/Table';
import { useGetRecruitmentWorkerList } from '@/hooks/useGetRecruitmentWorkerList';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useTable } from '@/hooks/useTable';
import { RecruitmentWorkerModel } from '@/models';
import { RecruitmentWorkerFilterModel } from '@/models/filters';
import { getColumnDef } from '@/modules/recruitment-plan/components/table-data-deleted/_columns';
import { WorkerModal } from '@/modules/worker/components/WorkerModal';

const DataDeletedList = (props: { permission: boolean }) => {
  const { id } = useParams();
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const {
    queryState,
    updateQueryState,
    updateSortStateByTable,
    getTableSortState,
    globalSearch,
    queryString,
    handleUpdateGlobalSearch,
  } = useQueryRequest<RecruitmentWorkerFilterModel>(
    {
      filters: {
        is_deleted: true,
        recruitment_plan_id: id,
      },
    },
    () => undefined,
    false
  );

  const { ...tableProps } = useTable<RecruitmentWorkerModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  const {
    isFetching,
    isLoading,
    data: workerList,
    refetch,
  } = useGetRecruitmentWorkerList(queryString);

  useEffect(() => {
    updateSortStateByTable(tableProps.sorting);
  }, [tableProps.sorting]);

  function handleSaved() {
    setIsVisibleFormModal(false);
    refetch();
  }

  function handleRowClick(worker: RecruitmentWorkerModel) {
    console.log(worker);
  }

  return (
    <ProtectedComponent hasAccess={props.permission}>
      <KTCard>
        <div className="card-header border-0">
          <div className="card-toolbar d-flex">
            <TableGlobalSearch
              onChange={handleUpdateGlobalSearch}
              placeholder="Chiến dịch / Khách hàng"
              value={globalSearch}
            />
          </div>
        </div>
        <Spin spinning={isFetching || isLoading}>
          <KTCardBody className="py-4">
            <Table
              {...tableProps}
              className="cursor-pointer"
              columns={columnDef}
              currentPage={queryState.page}
              data={workerList?.rows}
              limit={queryState.limit}
              onLimitChange={(limit) => updateQueryState({ limit })}
              onPageChange={(page) => updateQueryState({ page })}
              onRowClick={handleRowClick}
              total={workerList?.total_rows}
            />
          </KTCardBody>
        </Spin>
      </KTCard>

      {isVisibleFormModal && (
        <WorkerModal
          onHide={() => {
            setIsVisibleFormModal(false);
          }}
          onSaved={handleSaved}
          show={isVisibleFormModal}
        />
      )}
    </ProtectedComponent>
  );
};

export { DataDeletedList };
