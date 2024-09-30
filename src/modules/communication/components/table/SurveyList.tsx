/* eslint-disable react/jsx-sort-props */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable simple-import-sort/imports */
import { Spin } from 'antd';
import { size } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

import { KTCard, KTCardBody } from '@/_metronic/helpers';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { TableListGrouping } from '@/components/molecules/TableListGrouping';
import { Table } from '@/components/organisms/Table';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useTable } from '@/hooks/useTable';
import { SurveyListToolbar } from '@/modules/communication/components/table/SurveyListToolbar';
import { getColumnDef } from '@/modules/communication/components/table/_columns';
import { SurveyModel } from '@/modules/communication/models';
import { useGetSurveyList } from '@/modules/communication/hooks/useGetSurveyList';
import { history } from '@/utils';
import { ModalConfirmDelete } from '@/components/organisms/ModalConfirmDelete';
import { useDeleteSurvey } from '@/modules/communication/hooks/useDeleteSurvey';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  isFreeSurvey?: boolean;
}

export function SurveyListWrapper({ isFreeSurvey }: Props) {
  const formTypeEnpoint = isFreeSurvey ? 'form-survey' : 'form-salary';

  const queryClient = useQueryClient();

  const {
    queryState,
    updateQueryState,
    updateSortStateByTable,
    getTableSortState,
    globalSearch,
    queryString,
    handleUpdateGlobalSearch,
  } = useQueryRequest();

  const { mutateAsync: deleteSurvey } = useDeleteSurvey(formTypeEnpoint);

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [surveyId, setSurveyId] = useState<string | undefined>();

  const handleOpenModalDelete = (surveyId: string) => {
    setVisibleModalDelete(true);
    setSurveyId(surveyId);
  };

  const handleCloseModalDelete = () => {
    setVisibleModalDelete(false);
    setSurveyId(undefined);
  };

  const { table, ...tableProps } = useTable<SurveyModel>(getTableSortState);
  const columnDef = useMemo(
    () => getColumnDef(tableProps.columnResizeMode, handleOpenModalDelete),
    []
  );

  const {
    isFetching,
    isLoading,
    data: HRList,
    refetch,
  } = useGetSurveyList(
    `${queryString}&form_category=${isFreeSurvey ? 'survey' : 'salary_survey'}`,
    formTypeEnpoint
  );

  const customerToDelete = useMemo(
    () => table?.getSelectedRowModel().flatRows.map(({ original }) => original),
    [table]
  );

  useEffect(() => {
    updateSortStateByTable(tableProps.sorting);
  }, [tableProps.sorting]);

  function handleRowClick(user: SurveyModel) {
    history.push(`${user.id}`);
  }

  const handleDeleteSurvey = async () => {
    if (!surveyId) return;
    await deleteSurvey(surveyId);
    handleCloseModalDelete();
    refetch();
  };

  return (
    <div data-testid="customer-list-element">
      {visibleModalDelete && (
        <ModalConfirmDelete
          show={visibleModalDelete}
          onHide={handleCloseModalDelete}
          onConfirmDelete={handleDeleteSurvey}
        />
      )}

      <KTCard>
        <div className="card-header border-0 pt-6">
          <div className="card-toolbar">
            <TableGlobalSearch
              onChange={handleUpdateGlobalSearch}
              placeholder="Tìm kiếm"
              value={globalSearch}
            />
          </div>
          <div className="card-toolbar">
            {(() => {
              if (size(tableProps.rowSelection) > 0) {
                return <TableListGrouping keyText={'user_name'} selected={customerToDelete} />;
              }

              return (
                <SurveyListToolbar
                  onClickCreateButton={() => {
                    history.push(
                      isFreeSurvey
                        ? `/communication/free-survey/create`
                        : `/communication/salary-survey/create`
                    );
                  }}
                />
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
              total={HRList?.total_rows}
            />
          </KTCardBody>
        </Spin>
      </KTCard>
    </div>
  );
}
