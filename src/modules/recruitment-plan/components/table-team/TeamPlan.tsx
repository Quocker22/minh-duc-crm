/* eslint-disable react/jsx-sort-props */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable simple-import-sort/imports */
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import {
  Avatar,
  Form,
  InputNumber,
  Popconfirm,
  Table,
  TablePaginationConfig,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeleteTeam } from '@/modules/recruitment-plan/hooks/useDeleteTeam';
import { useGetRecruitmentTeamList } from '@/modules/recruitment-plan/hooks/useGetRecruitmentTeamList';
import { useUpdateTeamTarget } from '@/modules/recruitment-plan/hooks/useUpdateTeamTarget';
import { RecruitmentTeamModel, RePlanRole } from '@/modules/recruitment-plan/models';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { RecruitmentTeamToolbar } from '@/modules/recruitment-plan/components/table-team/RecruitmentTeamToolbar';
import { RecruitmentTeamModal } from '@/modules/recruitment-plan/components/table-team/RecruitmentTeamModal';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { getRoleEmployee } from '@/roles';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  dataIndex: string;
  editing: boolean;
  index: number;
  inputType: 'number';
  record: RecruitmentTeamModel;
  title: any;
}

const TeamPlan: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm<RecruitmentTeamModel>();
  const { globalSearch, queryString, queryState, handleUpdateGlobalSearch, updateQueryState } =
    useQueryRequest<RecruitmentTeamModel>({}, () => undefined, false);

  const {
    isLoading,
    data: originData,
    refetch,
  } = useGetRecruitmentTeamList(`${queryString}&${`plan_id=` + id}`);
  const { mutateAsync: updateTeamTarget } = useUpdateTeamTarget();
  const { mutateAsync: deleteTeam } = useDeleteTeam();
  const [editingKey, setEditingKey] = useState('');
  const [visibleAddTeamRecruitment, setVisibleAddTeamRecruitment] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEditing = (record: RecruitmentTeamModel) => record.id === editingKey;

  const edit = (record: Partial<RecruitmentTeamModel> & { id: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
    form.setFieldsValue({
      target: record.target,
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editingKey]);

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    children,
    record,
    ...restProps
  }) => {
    const inputNode = (
      <>
        <InputNumber
          ref={inputRef}
          defaultValue={String(form.getFieldValue('target'))}
          name="target"
          onPressEnter={() => save(record)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') cancel();
          }}
          onChange={(value) => {
            form.setFieldsValue({ target: Number(value) });
          }}
          type="number"
          width={5}
        />
        <div className="d-flex pt-2">
          <Typography.Link className="fs-4" onClick={() => save(record)} style={{ marginRight: 8 }}>
            Lưu
          </Typography.Link>
          <Typography.Link className="fs-4" onClick={cancel}>
            Hủy
          </Typography.Link>
        </div>
      </>
    );

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            rules={[
              {
                message: `Please Input ${title}!`,
                required: true,
              },
            ]}
            style={{ margin: 0 }}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const cancel = () => {
    setEditingKey('');
  };

  const onDeleteRow = async (row: RecruitmentTeamModel) => {
    await deleteTeam({
      plan_id: row.plan_id,
      team_id: row.team_id,
    });
    refetch();
  };

  const save = async (value: RecruitmentTeamModel) => {
    try {
      await updateTeamTarget({
        plan_id: value.plan_id,
        target: Number(form.getFieldValue('target')),
        team_id: value.team_id,
      });
      await refetch();
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleHideAddTeam = () => {
    setVisibleAddTeamRecruitment(false);
    refetch();
  };

  const khtdChiaChiTieu = getRoleEmployee(RePlanRole.khtd_chia_chi_tieu);

  const columns = [
    {
      align: 'center',
      dataIndex: 'stt',
      render: (_: any, record: RecruitmentTeamModel, index: number) => {
        const { page, limit } = queryState;

        return <span>{page * limit - limit + index + 1}</span>;
      },
      title: 'STT',
      width: '50px',
    },
    {
      dataIndex: 'team.code',
      render: (_: any, record: RecruitmentTeamModel) => record.team.code,
      title: 'Mã nhóm',
      width: '100px',
    },
    {
      dataIndex: 'team.name',
      render: (_: any, record: RecruitmentTeamModel) => record.team.name,
      title: 'Tên nhóm tuyển dụng',
      width: '180px',
    },
    {
      dataIndex: 'team.leader.name',
      render: (_: any, record: RecruitmentTeamModel) => {
        const avatar = record.team.leader.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1 }}>{record.team.leader.name}</div>
          </div>
        );
      },
      title: 'Tên trưởng nhóm',
      width: '180px',
    },
    {
      dataIndex: 'team.leader.status',
      render: (_: any, record: RecruitmentTeamModel) => {
        return (
          <TableTagCell
            className="py-1 px-5 rounded-pill fs-6"
            color={record.team.leader.status === 'ACTIVE' ? 'success' : 'secondary'}
          >
            {record.team.leader.status === 'ACTIVE' ? 'Đang hoạt động' : 'Dừng hoạt động'}
          </TableTagCell>
        );
      },
      title: 'Trạng thái',
      width: '120px',
    },
    {
      align: 'center',
      dataIndex: 'num_of_added_data',
      title: 'Tổng số data đã thêm vào chiến dịch',
      width: '180px',
    },
    {
      dataIndex: 'target',
      editable: true,
      render: (_: any, record: RecruitmentTeamModel) => {
        return (
          <>
            <span className="pe-5">{record.target}</span>
            {khtdChiaChiTieu && (
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                <EditOutlined className="fs-3" rev="EditOutlined" />
              </Typography.Link>
            )}
          </>
        );
      },
      title: 'Số lượng chia',
      width: '130px',
    },
    {
      dataIndex: 'id',
      render: (_: any, record: RecruitmentTeamModel) => {
        return Number(record.num_of_added_data) > 0 ? null : (
          <Popconfirm onConfirm={() => onDeleteRow(record)} title="Bạn có chắc muốn xóa?">
            <CloseOutlined rev="CloseOutlined" />
          </Popconfirm>
        );
      },
      title: 'Gỡ',
      width: '30px',
    },
  ];

  const mergedColumns = (columns as any).map((col: any) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: RecruitmentTeamModel) => ({
        dataIndex: col.dataIndex,
        editing: isEditing(record),
        record,
        title: col.title,
      }),
    };
  });

  function handleSaved() {
    setVisibleAddTeamRecruitment(false);
    refetch();
  }

  const handleChangePagination = ({ current, pageSize }: TablePaginationConfig) => {
    updateQueryState({
      limit: pageSize as any,
      page: current,
    });
  };

  return (
    <>
      <div className="card-header border-0">
        <div className="card-toolbar d-flex">
          <TableGlobalSearch
            onChange={handleUpdateGlobalSearch}
            placeholder="Tên nhóm / Tên trưởng nhóm"
            value={globalSearch}
          />
        </div>

        <div className="card-toolbar">
          {(() => {
            return (
              <RecruitmentTeamToolbar
                onClickCreateButton={() => {
                  setVisibleAddTeamRecruitment(true);
                }}
              />
            );
          })()}
        </div>
      </div>

      <Form component={false} form={form}>
        <Table
          columns={mergedColumns}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={originData?.rows}
          loading={isLoading}
          onChange={handleChangePagination}
          pagination={{
            current: queryState.page,
            onChange: cancel,
            pageSize: queryState.limit,
            total: originData?.total_rows,
          }}
          rowClassName="editable-row"
          bordered
        />
      </Form>

      {visibleAddTeamRecruitment && (
        <RecruitmentTeamModal
          onHide={handleHideAddTeam}
          onSaved={handleSaved}
          show={visibleAddTeamRecruitment}
          planId={id}
        />
      )}
    </>
  );
};

export { TeamPlan };
