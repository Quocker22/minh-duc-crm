/* eslint-disable simple-import-sort/imports */
import { Radio, Spin } from 'antd';
import { useEffect, useMemo } from 'react';
import { ActionMeta } from 'react-select';

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import { SelectAcademic } from '@/components/molecules/SelectAcademic';
import { SelectField } from '@/components/molecules/SelectField';
import { SelectRecruitmentTeam } from '@/components/molecules/SelectRecruitmentTeam';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { Table } from '@/components/organisms/Table';
import { useGetRecruitmentWorkerList } from '@/hooks/useGetRecruitmentWorkerList';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useTable } from '@/hooks/useTable';
import { GENDER_TYPE_OPTIONS, GenderTypeOptions, RecruitmentWorkerModel } from '@/models';
import { RecruitmentTeamsModel } from '@/modules/hr-management/models';
import { getColumnDef } from '@/modules/recruitment-plan/components/table-list-data/_columns';
import {
  CampaignOptions,
  DataListFilterModel,
  RePlanRole,
} from '@/modules/recruitment-plan/models';
import { useParams } from 'react-router-dom';
import { ListDataFilterCount } from '@/modules/recruitment-organization/components/table-list-data/ListDataFilterCount';
import { getRoleEmployee } from '@/roles';
import { ProtectedComponent } from '@/components/molecules/ProtectedComponent';
import { SelectEmployee } from '@/components/molecules/SelectEmployee';
import { InputDateRangeField } from '@/components/molecules/InputDateRangeField';
import { DateTimeFormat } from '@/constants';

const DataList = () => {
  const { id } = useParams();
  const {
    queryState,
    updateQueryState,
    updateSortStateByTable,
    getTableSortState,
    globalSearch,
    queryString,
    handleUpdateGlobalSearch,
    updateFiltersState,
  } = useQueryRequest<DataListFilterModel>();

  const { ...tableProps } = useTable<RecruitmentWorkerModel>(getTableSortState);
  const columnDef = useMemo(() => getColumnDef(tableProps.columnResizeMode), []);

  const {
    isFetching,
    isLoading,
    data: workerList,
  } = useGetRecruitmentWorkerList(queryString + '&recruitment_plan_id=' + id);

  useEffect(() => {
    updateSortStateByTable(tableProps.sorting);
  }, [tableProps.sorting]);

  function handleOnChangeFilterGenderType(
    newValue: string | null,
    _: ActionMeta<{ label: string; value: GenderTypeOptions }>
  ): void {
    const gender = newValue as GenderTypeOptions;
    updateFiltersState({ gender });
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

  function handleOnChangeFilterRecruitmentTeamType(
    newValue: string | null,
    _: ActionMeta<RecruitmentTeamsModel>
  ): void {
    updateFiltersState({ recruitment_team_id: newValue || '' });
  }

  function handleOnChangeFilterManager(newValue: unknown, _actionMeta: ActionMeta<unknown>): void {
    const a: { value: string } = newValue as { value: string };
    console.log('newValue', newValue);

    updateFiltersState({ manager_ids: a?.value || '' });
  }

  const khtdXemData = getRoleEmployee(RePlanRole.khtd_xem_data);

  return (
    <ProtectedComponent hasAccess={khtdXemData}>
      <KTCard>
        <div className="card-header border-0">
          <div className="card-toolbar d-flex">
            <TableGlobalSearch
              onChange={handleUpdateGlobalSearch}
              placeholder="Chiến dịch / Khách hàng"
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

            <SelectRecruitmentTeam
              getOptionValue={(option) => String(option.id)}
              groupClass="ms-3"
              name="degree_id"
              onChange={handleOnChangeFilterRecruitmentTeamType}
              placeholder="Nhóm tuyển dụng"
              clearable
              required
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

          {/* <div className="d-flex flex-column justify-content-center">
            <Button
              className="rounded-pill"
              onClick={() => setIsVisibleAddWorkerModal(true)}
              title="button-add-customer"
              variant="primary"
            >
              <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr075.svg" />
              Thêm data
            </Button>
          </div> */}
        </div>
        <div className="card-header">
          <div className="card-toolbar d-flex">
            <Radio.Group buttonStyle="solid" defaultValue="1" size="middle">
              <Radio.Button
                className="rounded-pill me-1"
                onChange={() => {
                  updateFiltersState({ status: 'ACTIVE' });
                }}
                value="1"
              >
                Tất cả <ListDataFilterCount id={id} status="ACTIVE" />
              </Radio.Button>
              <Radio.Button
                className="rounded-pill me-1"
                onChange={() => {
                  updateFiltersState({ status: CampaignOptions.chua_phan_loai });
                }}
                value="2"
              >
                Chưa phân loại{' '}
                <ListDataFilterCount id={id} status={CampaignOptions.chua_phan_loai} />
              </Radio.Button>
              <Radio.Button
                className="rounded-pill me-1"
                onChange={() => {
                  updateFiltersState({ status: CampaignOptions.tiem_nang });
                }}
                value="3"
              >
                Tiềm năng <ListDataFilterCount id={id} status={CampaignOptions.tiem_nang} />
              </Radio.Button>
              <Radio.Button
                className="rounded-pill me-1"
                onChange={() => {
                  updateFiltersState({ status: CampaignOptions.cho_den });
                }}
                value="4"
              >
                Chờ đến <ListDataFilterCount id={id} status={CampaignOptions.cho_den} />
              </Radio.Button>
              <Radio.Button
                className="rounded-pill me-1"
                onChange={() => {
                  updateFiltersState({ status: CampaignOptions.khong_tiem_nang });
                }}
                value="5"
              >
                Không tiềm năng{' '}
                <ListDataFilterCount id={id} status={CampaignOptions.khong_tiem_nang} />
              </Radio.Button>
              <Radio.Button
                className="rounded-pill me-1"
                onChange={() => {
                  updateFiltersState({ status: CampaignOptions.khong_den });
                }}
                value="6"
              >
                Thất bại <ListDataFilterCount id={id} status={CampaignOptions.khong_den} />
              </Radio.Button>
              <Radio.Button
                className="rounded-pill me-1"
                onChange={() => {
                  updateFiltersState({ status: CampaignOptions.duoc_vao_lam });
                }}
                value="7"
              >
                Được vào làm <ListDataFilterCount id={id} status={CampaignOptions.duoc_vao_lam} />
              </Radio.Button>
            </Radio.Group>
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
              total={workerList?.total_rows}
            />
          </KTCardBody>
        </Spin>
      </KTCard>
    </ProtectedComponent>
  );
};

const DataListWrapper = () => <DataList />;

export { DataListWrapper };
