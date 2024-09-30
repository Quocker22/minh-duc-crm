import { EditOutlined } from '@ant-design/icons';
import { Avatar, Form, InputNumber, Table, TablePaginationConfig, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { HRModel } from '@/modules/hr-management/models';
import { RecruitmentTeamModal } from '@/modules/recruitment-organization/components/table-team/RecruitmentTeamModal';
import { useGetHRListByRecruitmentPlanId } from '@/modules/recruitment-organization/hooks/useGetHRListByRecruitmentPlanId';
import { useUpdateHRTarget } from '@/modules/recruitment-organization/hooks/useUpdateHRTarget';
import { ReOrganizationRole } from '@/modules/recruitment-organization/models';
import { getRoleEmployee } from '@/roles';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  dataIndex: string;
  editing: boolean;
  index: number;
  inputType: 'number';
  record: HRModel;
  title: any;
}

const TeamOrganization: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm<HRModel>();
  const { globalSearch, queryState, handleUpdateGlobalSearch, updateQueryState } =
    useQueryRequest<HRModel>({}, () => undefined, false);

  const { isLoading, data: hrList, refetch } = useGetHRListByRecruitmentPlanId(id);

  const { mutateAsync: updateHRTarget } = useUpdateHRTarget();
  const [editingKey, setEditingKey] = useState('');
  const [visibleAddTeamRecruitment, setVisibleAddTeamRecruitment] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEditing = (record: HRModel) => record.id === editingKey;

  const edit = (record: Partial<HRModel> & { id: React.Key }) => {
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
          onChange={(value) => {
            form.setFieldsValue({ target: Number(value) });
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') cancel();
          }}
          onPressEnter={() => save(record)}
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

  const save = async (value: HRModel) => {
    try {
      await updateHRTarget({
        member_id: value.id,
        plan_id: id || '',
        target: Number(form.getFieldValue('target')),
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

  const tctdChiaChiTieu = getRoleEmployee(ReOrganizationRole.tctd_chia_chi_tieu);

  const columns = [
    {
      align: 'center',
      dataIndex: 'stt',
      render: (_: any, record: HRModel, index: number) => {
        const { page, limit } = queryState;

        return <span>{page * limit - limit + index + 1}</span>;
      },
      title: 'STT',
      width: '50px',
    },
    {
      dataIndex: 'code',
      render: (_: any, record: HRModel) => record.code,
      title: 'Mã nhân sự',
      width: '100px',
    },
    {
      dataIndex: 'name',
      render: (_: any, record: HRModel) => {
        const avatar = record.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1 }}>{record.name}</div>
          </div>
        );
      },
      title: 'Tên nhân sự',
      width: '180px',
    },
    {
      dataIndex: 'phone',
      render: (_: any, record: HRModel) => {
        return record.phone;
      },
      title: 'Số điện thoại',

      width: '120px',
    },
    {
      align: 'center',
      dataIndex: 'number_workers',
      render: (_: any, record: HRModel) => {
        return record.number_workers || 0;
      },
      title: 'Tổng số data thêm vào chiến dịch',

      width: '180px',
    },
    {
      dataIndex: 'target',
      editable: true,
      render: (_: any, record: HRModel) => {
        return (
          <>
            <span className="pe-5">{record.target || 0}</span>
            {tctdChiaChiTieu && (
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
  ];

  const mergedColumns = (columns as any).map((col: any) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: HRModel) => ({
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
      </div>

      <Form component={false} form={form}>
        <Table
          columns={mergedColumns}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={hrList?.rows}
          loading={isLoading}
          onChange={handleChangePagination}
          pagination={{
            current: queryState.page,
            onChange: cancel,
            pageSize: queryState.limit,
            total: hrList?.total_rows,
          }}
          rowClassName="editable-row"
          bordered
        />
      </Form>

      {visibleAddTeamRecruitment && (
        <RecruitmentTeamModal
          onHide={handleHideAddTeam}
          onSaved={handleSaved}
          planId={id}
          show={visibleAddTeamRecruitment}
        />
      )}
    </>
  );
};

export { TeamOrganization };
