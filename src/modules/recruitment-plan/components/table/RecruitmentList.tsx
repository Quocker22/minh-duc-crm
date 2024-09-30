/* eslint-disable typescript-sort-keys/string-enum */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Spin } from 'antd';
import { size } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import { ProtectedComponent } from '@/components/molecules/ProtectedComponent';
import { SelectField } from '@/components/molecules/SelectField';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { TableListGrouping } from '@/components/molecules/TableListGrouping';
import { Table } from '@/components/organisms/Table';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useTable } from '@/hooks/useTable';
import { RecruitmentModal } from '@/modules/recruitment-plan/components/RecruitmentModal';
import { getColumnDef } from '@/modules/recruitment-plan/components/table/_columns';
import { RecruitmentListToolbar } from '@/modules/recruitment-plan/components/table/RecruitmentListToolbar';
import { useGetRecruitmentList } from '@/modules/recruitment-plan/hooks/useGetRecruitmentList';
import {
  RECRUITMENT_OPTION,
  RecruitmentPlanFilterModel,
  RecruitmentPlanModel,
  RePlanRole,
} from '@/modules/recruitment-plan/models';
import { getRoleEmployee } from '@/roles';
import { history } from '@/utils';

const findOption = (value: any) => {
  if (!value || typeof value !== 'string') return undefined;

  return RECRUITMENT_OPTION.find((option) => option.value === value);
};

const RecruitmentList = () => {
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const {
    queryState,
    updateQueryState,
    updateSortStateByTable,
    getTableSortState,
    globalSearch,
    queryString,
    updateFiltersState,
    handleUpdateGlobalSearch,
  } = useQueryRequest<RecruitmentPlanFilterModel>();

  const params = new URLSearchParams(queryString);
  const queryParams = Object.fromEntries(params.entries());

  const { table, ...tableProps } = useTable<RecruitmentPlanModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  const {
    isFetching,
    isLoading,
    data: RecruitmentList,
    refetch,
  } = useGetRecruitmentList(queryString);

  const customerToDelete = useMemo(
    () => table?.getSelectedRowModel().flatRows.map(({ original }) => original),
    [table]
  );

  useEffect(() => {
    updateSortStateByTable(tableProps.sorting);
  }, [tableProps.sorting]);

  function handleSaved() {
    setIsVisibleFormModal(false);
    refetch();
  }

  function handleRowClick(recruitment: RecruitmentPlanModel) {
    history.push(`${recruitment.id}`);
  }

  const khtdXemDanhSach = getRoleEmployee(RePlanRole.khtd_xem_danh_sach);
  const khtdTaoChienDich = getRoleEmployee(RePlanRole.khtd_tao_chien_dich);

  return (
    <ProtectedComponent hasAccess={khtdXemDanhSach}>
      <KTCard>
        <div className="card-header border-0 pt-6">
          <div className="card-toolbar d-flex">
            <TableGlobalSearch
              onChange={handleUpdateGlobalSearch}
              placeholder="Chiến dịch / Khách hàng"
              value={globalSearch}
            />
            <SelectField
              defaultValue={findOption(queryParams?.status) || RECRUITMENT_OPTION[0]} //Đồng bộ với query params trên url trong trường hợp f5 lại trang
              name="status"
              onChange={(value) => {
                updateFiltersState({ status: value?.value });
              }}
              options={RECRUITMENT_OPTION}
              required
            />
          </div>

          <div className="card-toolbar">
            {(() => {
              if (size(tableProps.rowSelection) > 0) {
                return <TableListGrouping keyText={'user_name'} selected={customerToDelete} />;
              }

              return (
                khtdTaoChienDich && (
                  <RecruitmentListToolbar
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
              data={RecruitmentList?.rows}
              limit={queryState.limit}
              onLimitChange={(limit) => updateQueryState({ limit })}
              onPageChange={(page) => updateQueryState({ page })}
              onRowClick={handleRowClick}
              total={RecruitmentList?.total_rows}
            />
          </KTCardBody>
        </Spin>
      </KTCard>

      {isVisibleFormModal && (
        <RecruitmentModal
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

const RecruitmentListWrapper = () => <RecruitmentList />;

export { RecruitmentListWrapper };
