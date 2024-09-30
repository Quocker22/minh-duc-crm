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
import { getColumnDef } from '@/modules/hr-management/components/role-table/_columns';
import { RoleListToolbar } from '@/modules/hr-management/components/role-table/RoleListToolbar';
import { RoleModal } from '@/modules/hr-management/components/RoleModal';
import { useGetGroupPermissionList } from '@/modules/hr-management/hooks/useGetGroupPermissionList';
import { useGetRoleList } from '@/modules/hr-management/hooks/useGetRoleList';
import { PermissionRole, RoleModel } from '@/modules/hr-management/models';
import { getRoleEmployee } from '@/roles';
import { filterNameAndId } from '@/utils';

const RoleList = () => {
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const [roleId, setRoleId] = useState<string>();

  const {
    queryState,
    updateQueryState,
    updateSortStateByTable,
    getTableSortState,
    globalSearch,
    queryString,
    handleUpdateGlobalSearch,
  } = useQueryRequest<{ name: string }>();

  const { table, ...tableProps } = useTable<RoleModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  useEffect(() => {
    updateQueryState({ filters: { name: globalSearch } });
  }, [queryString]);

  const { isFetching, isLoading, data: roleList, refetch } = useGetRoleList(queryString);
  const { data: groupPermissionList } = useGetGroupPermissionList();
  const newGroupPermissionList = useMemo(
    () => filterNameAndId(groupPermissionList || []),
    [groupPermissionList]
  );

  const customerToDelete = useMemo(
    () => table?.getSelectedRowModel().flatRows.map(({ original }) => original),
    [table]
  );

  useEffect(() => {
    updateSortStateByTable(tableProps.sorting);
  }, [tableProps.sorting]);

  function handleRowClick(role: RoleModel) {
    setRoleId(role.id);
    setIsVisibleFormModal(true);
  }

  function handleSaved() {
    setRoleId('');
    setIsVisibleFormModal(false);
    refetch();
  }

  const qlqXemDanhSach = getRoleEmployee(PermissionRole.qlq_xem_danh_sach);
  const qlqThem = getRoleEmployee(PermissionRole.qlq_them);
  const qlqXemChiTiet = getRoleEmployee(PermissionRole.qlq_xem_chi_tiet);

  return (
    <ProtectedComponent hasAccess={qlqXemDanhSach}>
      <div data-testid="customer-list-element">
        <KTCard>
          <div className="card-header border-0 pt-6">
            <div className="card-toolbar">
              <TableGlobalSearch
                onChange={handleUpdateGlobalSearch}
                placeholder="Tên vai trò"
                value={globalSearch}
              />
            </div>
            <div className="card-toolbar">
              {(() => {
                if (size(tableProps.rowSelection) > 0) {
                  return <TableListGrouping keyText={'user_name'} selected={customerToDelete} />;
                }

                return (
                  qlqThem && (
                    <RoleListToolbar
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
                data={roleList?.rows}
                limit={queryState.limit}
                onLimitChange={(limit) => updateQueryState({ limit })}
                onPageChange={(page) => updateQueryState({ page })}
                onRowClick={qlqXemChiTiet ? handleRowClick : undefined}
                total={roleList?.total_rows}
              />
            </KTCardBody>
          </Spin>
        </KTCard>
      </div>

      {isVisibleFormModal && (
        <RoleModal
          data={newGroupPermissionList}
          idEdit={roleId}
          onHide={() => {
            setRoleId('');
            setIsVisibleFormModal(false);
          }}
          onSaved={handleSaved}
          show={isVisibleFormModal}
        />
      )}
    </ProtectedComponent>
  );
};

const RoleListWrapper = () => <RoleList />;

export { RoleListWrapper };
