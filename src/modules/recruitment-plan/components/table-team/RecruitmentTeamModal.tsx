/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
import { FC, useMemo, useState } from 'react';
import { CheckboxProps } from 'antd/lib/checkbox';
import { Button } from '@/components/molecules/Button';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { Modal } from '@/components/organisms/Modal';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useGetRecruitmentTeamsList } from '@/modules/hr-management/hooks/useGetRecruitmentTeamsList';
import { RecruitmentTeamsModel } from '@/modules/hr-management/models';
import { Table, TableColumnsType, TablePaginationConfig } from 'antd';
import { useAddTeamRecruitment } from '@/modules/recruitment-plan/hooks/useAddTeamRecruitment';
import { useMutation } from '@tanstack/react-query';
import { FormAddTeamRecruitment } from '@/modules/recruitment-plan/models';
import { cloneDeep } from 'lodash-es';
import { useGetRecruitmentTeamList } from '@/modules/recruitment-plan/hooks/useGetRecruitmentTeamList';

interface IProps {
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
  readonly planId?: string;
}

interface SelectedRowKeysPerPage {
  [key: string]: { id: string }[];
}

const RecruitmentTeamModal: FC<IProps> = ({ show, onHide, onSaved, planId }) => {
  const { globalSearch, queryString, handleUpdateGlobalSearch, updateQueryState, queryState } =
    useQueryRequest({}, () => undefined, false);

  const [selectedRowKeysPerPage, setSelectedRowKeysPerPage] = useState<SelectedRowKeysPerPage>({});

  const selectedRowKeys: { id: React.Key }[] = useMemo(() => {
    const selectedRowKeysPerPageCloned = cloneDeep(selectedRowKeysPerPage);

    let result: { id: React.Key }[] = [];

    Object.keys(selectedRowKeysPerPageCloned).forEach((key: string) => {
      result = result.concat(selectedRowKeysPerPageCloned[key]);
    });

    return result;
  }, [selectedRowKeysPerPage]);

  const {
    isLoading,
    data: recruitmentTeamsList,
    refetch,
  } = useGetRecruitmentTeamsList(queryString);

  const { isLoading: isLoadingTeamSelected, data: selectedTeam } = useGetRecruitmentTeamList(
    `page=1&limit=99&${`plan_id=` + planId}`
  );

  const columns: TableColumnsType<RecruitmentTeamsModel> = [
    {
      dataIndex: 'code',
      title: 'Mã nhóm',
      render(value, record, index) {
        const isSelected = Boolean(selectedTeam?.rows.find((team) => team.team_id === record.id));

        return (
          <span>
            {value} {isSelected && '(Đã chọn)'}
          </span>
        );
      },
    },
    {
      dataIndex: 'name',
      title: 'Tên nhóm',
    },
    {
      dataIndex: 'leader',
      render(_, record) {
        return record.leader_id ? <span>{record.leader?.name}</span> : null;
      },
      title: 'Trưởng nhóm',
    },
    {
      align: 'center',
      dataIndex: 'member',
      render(_, record) {
        return <span>{(record.member || []).length}</span>;
      },
      title: 'Số thành viên',
    },
    {
      dataIndex: 'active_recruitment_plan',
      title: 'Chiến dịch đang chạy',
    },
  ];

  const dataSource = recruitmentTeamsList?.rows.map((team) => ({ ...team, key: team.id }));

  const { mutateAsync: recruitmentTeams } = useAddTeamRecruitment();

  const { mutateAsync } = useMutation(recruitmentTeams);

  function handleHide() {
    updateQueryState({});
    onHide?.();
  }

  const handleSubmit = async () => {
    const dataSubmit: FormAddTeamRecruitment = {
      plan_id: planId as string,
      team_ids: selectedRowKeys.map((obj) => obj.id) as string[],
    };

    const res = await mutateAsync(dataSubmit);
    if (!res) return;

    handleHide();
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const currentPage = queryState.page.toString();

    setSelectedRowKeysPerPage((prev: SelectedRowKeysPerPage) => ({
      ...prev,
      [currentPage]: newSelectedRowKeys.map((id: React.Key) => ({ id: id as string })),
    }));
  };

  const rowSelection = {
    getCheckboxProps: (record: RecruitmentTeamsModel): CheckboxProps => ({
      checked: selectedRowKeys.some((keyObject) => keyObject.id === record.id),
      disabled: Boolean(selectedTeam?.rows.find((team) => team.team_id === record.id)),
      name: record.id,
    }),
    onChange: onSelectChange,
    selectedRowKeys: selectedRowKeys.map((keyObject) => keyObject.id),
  };

  const handleChangePagination = ({ current, pageSize }: TablePaginationConfig) => {
    updateQueryState({
      limit: pageSize as any,
      page: current,
    });
  };

  return (
    <Modal
      backdrop="static"
      bodyClassName="scroll-y"
      dialogClassName="mw-1000px"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="fw-bolder w-100">Thêm nhóm tuyển dụng vào chiến dịch</h3>}
      centered
    >
      <div className="card-toolbar mb-4">
        <TableGlobalSearch
          onChange={handleUpdateGlobalSearch}
          placeholder="Nhập tên nhóm / trưởng nhóm"
          value={globalSearch}
        />
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        onChange={handleChangePagination}
        pagination={{
          current: queryState.page,
          pageSize: queryState.limit,
          total: recruitmentTeamsList?.total_rows,
        }}
        rowSelection={rowSelection}
        scroll={{ y: 400 }}
      />

      <div className="d-flex items-center mt-4">
        <span>
          Đã chọn ({[...selectedRowKeys, ...(selectedTeam?.rows || [])].length}/
          {recruitmentTeamsList?.total_rows})
        </span>

        <div className="text-end flex-grow-1">
          <Button
            className="rounded-pill py-2"
            onClick={() => handleHide()}
            style={{ marginRight: '1rem' }}
            type="button"
            variant="secondary"
          >
            Hủy
          </Button>
          <Button
            className="rounded-pill py-2"
            onClick={() => handleSubmit()}
            type="submit"
            variant="primary"
          >
            Thêm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { RecruitmentTeamModal };
