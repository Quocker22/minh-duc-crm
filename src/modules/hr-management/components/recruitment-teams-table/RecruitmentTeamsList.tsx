import { Spin } from 'antd';
import { size } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import { ProtectedComponent } from '@/components/molecules/ProtectedComponent';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { TableListGrouping } from '@/components/molecules/TableListGrouping';
import { Table } from '@/components/organisms/Table';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useTable } from '@/hooks/useTable';
import { getColumnDef } from '@/modules/hr-management/components/recruitment-teams-table/_columns';
import { RecruitmentTeamsListToolbar } from '@/modules/hr-management/components/recruitment-teams-table/RecruitmentTeamsListToolbar';
import { RecruitmentTeamsModal } from '@/modules/hr-management/components/RecruitmentTeamsModal';
import { useGetRecruitmentTeamsList } from '@/modules/hr-management/hooks/useGetRecruitmentTeamsList';
import { RecruitmentTeamsModel, TeamRole } from '@/modules/hr-management/models';
import { getRoleEmployee } from '@/roles';
import { history } from '@/utils';

const RecruitmentTeamsList = () => {
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);

  const {
    queryState,
    updateQueryState,
    updateSortStateByTable,
    getTableSortState,
    globalSearch,
    queryString,
    handleUpdateGlobalSearch,
  } = useQueryRequest();

  const { table, ...tableProps } = useTable<RecruitmentTeamsModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  const {
    isFetching,
    isLoading,
    data: recruitmentTeamsList,
    refetch,
  } = useGetRecruitmentTeamsList(queryString);

  const customerToDelete = useMemo(
    () => table?.getSelectedRowModel().flatRows.map(({ original }) => original),
    [table]
  );

  useEffect(() => {
    updateSortStateByTable(tableProps.sorting);
  }, [tableProps.sorting]);

  function handleRowClick(role: RecruitmentTeamsModel) {
    history.push(`recruitment-teams/detail/${role.id}`);
  }

  function handleSaved() {
    setIsVisibleFormModal(false);
    refetch();
  }

  const qlnXemDanhSach = getRoleEmployee(TeamRole.qln_xem_danh_sach);
  const qlnThem = getRoleEmployee(TeamRole.qln_them);

  return (
    <ProtectedComponent hasAccess={qlnXemDanhSach}>
      <div data-testid="customer-list-element">
        <KTCard>
          <div className="card-header border-0 pt-6">
            <div className="card-toolbar">
              <TableGlobalSearch
                onChange={handleUpdateGlobalSearch}
                placeholder="Nhập tên nhóm"
                value={globalSearch}
              />
            </div>
            <div className="card-toolbar">
              {(() => {
                if (size(tableProps.rowSelection) > 0) {
                  return <TableListGrouping keyText={'user_name'} selected={customerToDelete} />;
                }

                return (
                  qlnThem && (
                    <RecruitmentTeamsListToolbar
                      onClickCreateButton={() => {
                        setIsVisibleFormModal(true);
                      }}
                    />
                  )
                );
              })()}
            </div>
          </div>
          <Spin spinning={isFetching || isLoading}>
            <KTCardBody className="py-4">
              <Table
                {...tableProps}
                className="cursor-pointer"
                columns={columnDef}
                currentPage={queryState.page}
                data={recruitmentTeamsList?.rows}
                limit={queryState.limit}
                onLimitChange={(limit) => updateQueryState({ limit })}
                onPageChange={(page) => updateQueryState({ page })}
                onRowClick={handleRowClick}
                total={recruitmentTeamsList?.total_rows}
              />
            </KTCardBody>
          </Spin>
        </KTCard>
      </div>

      {isVisibleFormModal && (
        <RecruitmentTeamsModal
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

const RecruitmentTeamsListWrapper = () => <RecruitmentTeamsList />;

export { RecruitmentTeamsListWrapper };
