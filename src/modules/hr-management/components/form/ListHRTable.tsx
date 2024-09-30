import { TableColumnsType } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
import { FC, Key, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { TableAntd } from '@/components/organisms/TableAntd';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { LimitOption } from '@/models';
import { useGetHRList } from '@/modules/hr-management/hooks/useGetHRList';
import { FormRecruitmentTeamsModel, HRModel, HRStatus } from '@/modules/hr-management/models';

interface IProps {
  onSelectedRowKeys: (newSelectedRowKeys: { id: Key }[], newSelectedRows: HRModel[]) => void;
  formMethods?: UseFormReturn<FormRecruitmentTeamsModel, object>;
}

const columns: TableColumnsType<HRModel> = [
  {
    dataIndex: 'code',
    title: 'Mã nhân sự',
  },
  {
    dataIndex: 'name',
    title: 'Tên nhân sự tuyển dụng',
  },
  {
    dataIndex: 'phone',
    title: 'Số điện thoại',
  },
  {
    dataIndex: 'status',
    render: (_text, record) => (
      <TableTagCell
        className="py-1 px-5 rounded-pill fs-6"
        color={record.status === HRStatus.active ? 'success' : 'secondary'}
      >
        {record.status === HRStatus.active ? 'Đang hoạt động' : 'Dừng hoạt động'}
      </TableTagCell>
    ),
    title: 'Trạng thái tài khoản',
  },
];

const ListHRTable: FC<IProps> = ({ formMethods, onSelectedRowKeys }) => {
  const [selectedRows, setSelectedRows] = useState<{
    newSelectedRowKeys: { id: React.Key }[];
    newSelectedRows: HRModel[];
  }>({ newSelectedRowKeys: [], newSelectedRows: [] });

  const { queryState, updateQueryState, queryString, globalSearch, handleUpdateGlobalSearch } =
    useQueryRequest();

  const { data: HRList, isLoading } = useGetHRList(queryString);

  useEffect(() => {
    onSelectedRowKeys(selectedRows.newSelectedRowKeys, selectedRows.newSelectedRows);
  }, [selectedRows]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRows: HRModel[]) => {
    setSelectedRows({
      newSelectedRowKeys: newSelectedRowKeys.map((i) => ({ id: i })),
      newSelectedRows,
    });
  };

  const rowSelection = {
    getCheckboxProps: (record: HRModel): CheckboxProps => ({
      disabled:
        formMethods?.watch('member')?.some((row) => row.id === record.id) ||
        record.status !== HRStatus.active,
    }),
    onChange: onSelectChange,
    selectedRowKeys: [
      // Combine newSelectedRows and the watched member array, then map to their ids
      ...new Set([
        ...selectedRows.newSelectedRows.map((row) => row.id),
        ...(formMethods?.watch('member')?.map((row) => row.id) || []),
      ]),
    ],
  };

  const dataSource: HRModel[] = HRList?.rows.map((hr) => ({ ...hr, key: hr.id })) || [];

  return (
    <>
      <div className="card-toolbar">
        <TableGlobalSearch
          onChange={handleUpdateGlobalSearch}
          placeholder="Nhập tên nhân sự tuyển dụng"
          value={globalSearch}
        />
      </div>

      <TableAntd
        PaginationOnchange={(page: number, pageSize: number) => {
          updateQueryState &&
            updateQueryState({
              limit: pageSize as LimitOption,
              page,
            });
        }}
        columns={columns}
        currentPage={queryState?.page}
        data={dataSource}
        isLoading={isLoading}
        limit={queryState?.limit}
        rowSelection={rowSelection}
        sticky={{ offsetHeader: 0 }}
        showSizeChanger
      />
    </>
  );
};

export { ListHRTable };
