import { Spin } from 'antd';
import { size } from 'lodash-es';
import { useEffect, useMemo } from 'react';

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import { ProtectedComponent } from '@/components/molecules/ProtectedComponent';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { TableListGrouping } from '@/components/molecules/TableListGrouping';
import { Table } from '@/components/organisms/Table';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useTable } from '@/hooks/useTable';
import { getColumnDef } from '@/modules/hr-management/components/table/_columns';
import { HRListToolbar } from '@/modules/hr-management/components/table/HRListToolbar';
import { useGetHRList } from '@/modules/hr-management/hooks/useGetHRList';
import { EmployeeRole, HRModel } from '@/modules/hr-management/models';
import { getRoleEmployee } from '@/roles';
import { history } from '@/utils';

const HRList = () => {
  const {
    queryState,
    updateQueryState,
    updateSortStateByTable,
    getTableSortState,
    globalSearch,
    queryString,
    handleUpdateGlobalSearch,
  } = useQueryRequest();

  const { table, ...tableProps } = useTable<HRModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  const { isFetching, isLoading, data: HRList } = useGetHRList(queryString);

  const customerToDelete = useMemo(
    () => table?.getSelectedRowModel().flatRows.map(({ original }) => original),
    [table]
  );

  useEffect(() => {
    updateSortStateByTable(tableProps.sorting);
  }, [tableProps.sorting]);

  function handleRowClick(user: HRModel) {
    history.push(`${user.id}`);
  }
  const qltkmemXemDanhSach = getRoleEmployee(EmployeeRole.qltkmem_xem_danh_sach);
  const qltkmemThem = getRoleEmployee(EmployeeRole.qltkmem_them);
  const qltkmemXemChiTiet = getRoleEmployee(EmployeeRole.qltkmem_xem_chi_tiet);

  return (
    <ProtectedComponent hasAccess={qltkmemXemDanhSach}>
      <div data-testid="customer-list-element">
        <KTCard>
          <div className="card-header border-0 pt-6">
            <div className="card-toolbar">
              <TableGlobalSearch
                onChange={handleUpdateGlobalSearch}
                placeholder="Tên / sđt / email"
                value={globalSearch}
              />
            </div>
            <div className="card-toolbar">
              {(() => {
                if (size(tableProps.rowSelection) > 0) {
                  return <TableListGrouping keyText={'user_name'} selected={customerToDelete} />;
                }

                return (
                  qltkmemThem && (
                    <HRListToolbar
                      onClickCreateButton={() => {
                        history.push(`/hr-management/create`);
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
                data={HRList?.rows}
                limit={queryState.limit}
                onLimitChange={(limit) => updateQueryState({ limit })}
                onPageChange={(page) => updateQueryState({ page })}
                onRowClick={qltkmemXemChiTiet ? handleRowClick : undefined}
                total={HRList?.total_rows}
              />
            </KTCardBody>
          </Spin>
        </KTCard>
      </div>
    </ProtectedComponent>
  );
};

const HRListWrapper = () => <HRList />;

export { HRListWrapper };
