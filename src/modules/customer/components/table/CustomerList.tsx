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
import { CustomerModal } from '@/modules/customer/components/CustomerModal';
import { getColumnDef } from '@/modules/customer/components/table/_columns';
import { CustomerListToolbar } from '@/modules/customer/components/table/CustomerListToolbar';
import { useGetCustomerList } from '@/modules/customer/hooks/useGetCustomerList';
import { CustomerModel, CustomerRole } from '@/modules/customer/models';
import { getRoleEmployee } from '@/roles';
import { history } from '@/utils';

const CustomerList = () => {
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

  const { table, ...tableProps } = useTable<CustomerModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  const { isFetching, isLoading, data: HRList, refetch } = useGetCustomerList(queryString);
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

  function handleRowClick(customer: CustomerModel) {
    history.push(`${customer.id}`);
  }

  const qlkhXemDanhSach = getRoleEmployee(CustomerRole.qlkh_xem_danh_sach);
  const qlkhThem = getRoleEmployee(CustomerRole.qlkh_them);
  const qlkhXemChiTiet = getRoleEmployee(CustomerRole.qlkh_xem_chi_tiet);

  return (
    <ProtectedComponent hasAccess={qlkhXemDanhSach}>
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
                qlkhThem && (
                  <CustomerListToolbar
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
              data={HRList?.rows}
              limit={queryState.limit}
              onLimitChange={(limit) => updateQueryState({ limit })}
              onPageChange={(page) => updateQueryState({ page })}
              onRowClick={qlkhXemChiTiet ? handleRowClick : undefined}
              total={HRList?.total_rows}
            />
          </KTCardBody>
        </Spin>
      </KTCard>

      {isVisibleFormModal && (
        <CustomerModal
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

const CustomerListWrapper = () => <CustomerList />;

export { CustomerListWrapper };
