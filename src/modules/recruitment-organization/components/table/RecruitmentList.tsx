/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable typescript-sort-keys/string-enum */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import { ProtectedComponent } from '@/components/molecules/ProtectedComponent';
import { SelectField } from '@/components/molecules/SelectField';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { Table } from '@/components/organisms/Table';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useTable } from '@/hooks/useTable';
import { ReOrganizationRole } from '@/modules/recruitment-organization/models';
import { RecruitmentModal } from '@/modules/recruitment-plan/components/RecruitmentModal';
import { getColumnDef } from '@/modules/recruitment-plan/components/table/_columns';
import { useGetRecruitmentList } from '@/modules/recruitment-plan/hooks/useGetRecruitmentList';
import {
  RECRUITMENT_OPTION,
  RecruitmentPlanFilterModel,
  RecruitmentPlanModel,
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

  const { table, ...tableProps } = useTable<RecruitmentPlanModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  const params = new URLSearchParams(queryString);
  const queryParams = Object.fromEntries(params.entries());

  const {
    isFetching,
    isLoading,
    data: RecruitmentList,
    refetch,
  } = useGetRecruitmentList(queryString);

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

  const tctdXemDanhSach = getRoleEmployee(ReOrganizationRole.tctd_xem_danh_sach);

  return (
    <ProtectedComponent hasAccess={tctdXemDanhSach}>
      <KTCard>
        <div className="card-header border-0 pt-6">
          <div className="card-toolbar d-flex">
            <TableGlobalSearch
              onChange={handleUpdateGlobalSearch}
              placeholder="Chiến dịch / Khách hàng"
              value={globalSearch}
            />
            <SelectField
              defaultValue={findOption(queryParams?.status) || RECRUITMENT_OPTION[0]}
              name="status"
              onChange={(value) => {
                updateFiltersState({ status: value?.value });
              }}
              options={RECRUITMENT_OPTION}
              required
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
