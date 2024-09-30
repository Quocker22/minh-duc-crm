import { Radio, Spin } from 'antd';
import { size } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { ActionMeta } from 'react-select';

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import { InputDateRangeField } from '@/components/molecules/InputDateRangeField';
import { ProtectedComponent } from '@/components/molecules/ProtectedComponent';
import { SelectAcademic } from '@/components/molecules/SelectAcademic';
import { SelectEmployee } from '@/components/molecules/SelectEmployee';
import { SelectField } from '@/components/molecules/SelectField';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { TableListGrouping } from '@/components/molecules/TableListGrouping';
import { Table } from '@/components/organisms/Table';
import { DateTimeFormat } from '@/constants';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useTable } from '@/hooks/useTable';
import { GENDER_TYPE_OPTIONS, GenderTypeOptions, WORKER_STATUS_OPTIONS } from '@/models';
import { CampaignOptions, DataListFilterModel } from '@/modules/recruitment-plan/models';
import { getColumnDef } from '@/modules/worker/components/table/_columns';
import { CountListDataWorkerFilter } from '@/modules/worker/components/table/CountListDataWorkerFilter';
import { WorkerListToolbar } from '@/modules/worker/components/table/WorkerListToolbar';
import { WorkerModal } from '@/modules/worker/components/WorkerModal';
import { useGetWorkerList } from '@/modules/worker/hooks/useGetWorkerList';
import { WorkerModel, WorkerRole } from '@/modules/worker/models';
import { getRoleEmployee } from '@/roles';
import { history } from '@/utils';

const WorkerList = () => {
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
  } = useQueryRequest<DataListFilterModel>();

  const { table, ...tableProps } = useTable<WorkerModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  const { isFetching, isLoading, data: workerList, refetch } = useGetWorkerList(queryString);

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

  function handleRowClick(worker: WorkerModel) {
    history.push(`${worker.id}`);
  }

  function handleOnChangeFilterGenderType(
    newValue: string | null,
    _: ActionMeta<{ label: string; value: GenderTypeOptions }>
  ): void {
    const gender = newValue as GenderTypeOptions;
    updateFiltersState({ gender });
  }

  function handleOnChangeFilterWorkerStatus(
    newValue: string | null,
    _: ActionMeta<{ label: string; value: string }>
  ): void {
    updateFiltersState({ status: (newValue as CampaignOptions) || undefined });
  }

  function handleOnChangeFilterAcademicType(
    newValue: string | null,
    _: ActionMeta<{
      id: string;
      value: string;
    }>
  ): void {
    updateFiltersState({ edu_level: newValue || '' });
  }

  function handleOnChangeFilterManager(newValue: unknown, _actionMeta: ActionMeta<unknown>): void {
    const a: { value: string } = newValue as { value: string };
    console.log('newValue', newValue);

    updateFiltersState({ manager_ids: a?.value || '' });
  }

  const qlnldXemDanhSach = getRoleEmployee(WorkerRole.qlnld_xem_danh_sach);
  const qlnldThem = getRoleEmployee(WorkerRole.qlnld_them);
  const qlnldChiTiet = getRoleEmployee(WorkerRole.qlnld_chi_tiet);

  return (
    <ProtectedComponent hasAccess={qlnldXemDanhSach}>
      <KTCard>
        <div className="card-header border-0 pt-6">
          <div className="card-header border-0">
            <div className="card-toolbar d-flex">
              <TableGlobalSearch
                onChange={handleUpdateGlobalSearch}
                placeholder=" Nhập tên / SĐT"
                value={globalSearch}
              />
              <SelectField
                className="min-w-125px"
                getOptionValue={(option) => option.value}
                multiple={false}
                name="gender"
                onChange={handleOnChangeFilterGenderType}
                options={GENDER_TYPE_OPTIONS}
                placeholder="Giới tính"
                clearable
              />

              <SelectAcademic
                getOptionValue={(option) => String(option.id)}
                groupClass="ms-3"
                name="degree_id"
                onChange={handleOnChangeFilterAcademicType}
                placeholder="Trình độ"
                clearable
                required
              />
              <SelectField
                className="min-w-125px ms-3"
                getOptionValue={(option) => option.value}
                multiple={false}
                name="status"
                onChange={handleOnChangeFilterWorkerStatus}
                options={WORKER_STATUS_OPTIONS}
                placeholder="Trạng thái tài khoản"
                clearable
              />

              <SelectEmployee
                groupClass="ms-3"
                onChange={handleOnChangeFilterManager}
                style={{ minWidth: 220 }}
              />

              <InputDateRangeField
                format={DateTimeFormat.fe_date}
                formatValue={DateTimeFormat.be_date}
                groupClass="ms-2"
                name="date_range"
                onChange={(values) =>
                  updateFiltersState({ from: values?.[0] as string, to: values?.[1] as string })
                }
                value={[queryState.filters?.from || '', queryState.filters?.to || '']}
              />
            </div>
          </div>
          <div className="card-toolbar">
            {(() => {
              if (size(tableProps.rowSelection) > 0) {
                return <TableListGrouping keyText={'user_name'} selected={customerToDelete} />;
              }

              return (
                qlnldThem && (
                  <WorkerListToolbar
                    onClickCreateButton={() => {
                      setIsVisibleFormModal(true);
                    }}
                  />
                )
              );
            })()}
          </div>
          <div className="card-header">
            <div className="card-toolbar d-flex">
              <Radio.Group buttonStyle="solid" defaultValue="1" size="middle">
                <Radio.Button
                  className="rounded-pill me-1"
                  onChange={() => {
                    updateFiltersState({ operational_status_id: undefined });
                  }}
                  value="1"
                >
                  Tất cả <CountListDataWorkerFilter status={undefined} />
                </Radio.Button>
                <Radio.Button
                  className="rounded-pill me-1"
                  onChange={() => {
                    updateFiltersState({ operational_status_id: CampaignOptions.chua_phan_loai });
                  }}
                  value="2"
                >
                  Chưa phân loại
                  <CountListDataWorkerFilter status={CampaignOptions.chua_phan_loai} />
                </Radio.Button>
                <Radio.Button
                  className="rounded-pill me-1"
                  onChange={() => {
                    updateFiltersState({ operational_status_id: CampaignOptions.tiem_nang });
                  }}
                  value="3"
                >
                  Tiềm năng <CountListDataWorkerFilter status={CampaignOptions.tiem_nang} />
                </Radio.Button>
                <Radio.Button
                  className="rounded-pill me-1"
                  onChange={() => {
                    updateFiltersState({ operational_status_id: CampaignOptions.cho_den });
                  }}
                  value="4"
                >
                  Chờ đến <CountListDataWorkerFilter status={CampaignOptions.cho_den} />
                </Radio.Button>
                <Radio.Button
                  className="rounded-pill me-1"
                  onChange={() => {
                    updateFiltersState({ operational_status_id: CampaignOptions.khong_tiem_nang });
                  }}
                  value="5"
                >
                  Không tiềm năng{' '}
                  <CountListDataWorkerFilter status={CampaignOptions.khong_tiem_nang} />
                </Radio.Button>
                <Radio.Button
                  className="rounded-pill me-1"
                  onChange={() => {
                    updateFiltersState({ operational_status_id: CampaignOptions.khong_den });
                  }}
                  value="6"
                >
                  Thất bại <CountListDataWorkerFilter status={CampaignOptions.khong_den} />
                </Radio.Button>
                <Radio.Button
                  className="rounded-pill me-1"
                  onChange={() => {
                    updateFiltersState({ operational_status_id: CampaignOptions.duoc_vao_lam });
                  }}
                  value="7"
                >
                  Được vào làm <CountListDataWorkerFilter status={CampaignOptions.duoc_vao_lam} />
                </Radio.Button>
              </Radio.Group>
            </div>
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
              onRowClick={qlnldChiTiet ? handleRowClick : undefined}
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

const WorkerListWrapper = () => <WorkerList />;

export { WorkerListWrapper };
