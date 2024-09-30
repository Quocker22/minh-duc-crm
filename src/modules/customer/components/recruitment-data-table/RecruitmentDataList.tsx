/* eslint-disable unused-imports/no-unused-vars */
import { Spin } from 'antd';
import { FC, useEffect, useMemo } from 'react';

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import { SelectField } from '@/components/molecules/SelectField';
import { Table } from '@/components/organisms/Table';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useTable } from '@/hooks/useTable';
import { getColumnDef } from '@/modules/customer/components/recruitment-data-table/_columns';
import { useGetRecruitmentList } from '@/modules/recruitment-plan/hooks/useGetRecruitmentList';
import {
  CAMPAIGN_OPTIONS,
  RecruitmentPlanFilterModel,
  RecruitmentPlanModel,
} from '@/modules/recruitment-plan/models';
import { history } from '@/utils';

interface Props {
  customerId?: string;
}

const RecruitmentDataList: FC<Props> = (props: Props) => {
  const {
    queryState,
    updateQueryState,
    updateSortStateByTable,
    getTableSortState,
    globalSearch,
    queryString,
    updateFiltersState,
    handleUpdateGlobalSearch,
  } = useQueryRequest<RecruitmentPlanFilterModel>({ query: props.customerId });

  const { table, ...tableProps } = useTable<RecruitmentPlanModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  const { isFetching, isLoading, data: RecruitmentList } = useGetRecruitmentList(queryString);

  useEffect(() => {
    updateSortStateByTable(tableProps.sorting);
  }, [tableProps.sorting]);

  function handleRowClick(recruitment: RecruitmentPlanModel) {
    history.push(`${recruitment.id}`);
  }

  return (
    <>
      <KTCard>
        <div className="card-header border-0 pt-6">
          <div className="card-toolbar d-flex">
            <b className="pe-4">Danh sách chiến dịch</b>
            <SelectField
              defaultValue={CAMPAIGN_OPTIONS[0]}
              name="status"
              onChange={(value) => {
                updateFiltersState({ status: value?.value });
              }}
              options={CAMPAIGN_OPTIONS}
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
    </>
  );
};

export { RecruitmentDataList };
