import { useEffect, useMemo } from 'react';

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { Table } from '@/components/organisms/Table';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useTable } from '@/hooks/useTable';
import { useGetCustomerList } from '@/modules/customer/hooks/useGetCustomerList';
import { CustomerModel } from '@/modules/customer/models';
import { getColumnDef } from '@/modules/operate-worker/components/table/_columns';
import { history } from '@/utils';

interface Props {
  breadcrumbName: (value: string) => void;
}

const OperateWorkerList = ({ breadcrumbName }: Props) => {
  const {
    queryState,
    updateQueryState,
    updateSortStateByTable,
    getTableSortState,
    globalSearch,
    queryString,
    handleUpdateGlobalSearch,
  } = useQueryRequest();

  const { isLoading, data: customerList } = useGetCustomerList(queryString);

  const { ...tableProps } = useTable<CustomerModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  useEffect(() => {
    updateSortStateByTable(tableProps.sorting);
  }, [tableProps.sorting]);

  function handleRowClick(recruitment: CustomerModel) {
    breadcrumbName(recruitment.name);
    history.push(`${recruitment.id}`);
  }

  return (
    <>
      <KTCard>
        <div className="card-header border-0 pt-6">
          <div className="card-toolbar d-flex">
            <TableGlobalSearch
              onChange={handleUpdateGlobalSearch}
              placeholder="Chiến dịch / Khách hàng"
              value={globalSearch}
            />
          </div>
        </div>
        <KTCardBody className="py-4">
          <Table
            {...tableProps}
            className="cursor-pointer"
            columns={columnDef}
            currentPage={queryState.page}
            data={customerList?.rows}
            isLoading={isLoading}
            limit={queryState.limit}
            onLimitChange={(limit) => updateQueryState({ limit })}
            onPageChange={(page) => updateQueryState({ page })}
            onRowClick={handleRowClick}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const OperateWorkerListListWrapper = (props: Props) => (
  <OperateWorkerList breadcrumbName={props.breadcrumbName} />
);

export { OperateWorkerListListWrapper };
