/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
import { Avatar, Radio, TableColumnsType, TablePaginationConfig } from 'antd';
import { FC, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { Modal } from '@/components/organisms/Modal';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { LeaderModel } from '@/modules/hr-management/models';
import { FormWorkerModel } from '@/modules/worker/models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUpdateWorker } from '@/modules/worker/hooks/useUpdateWorker';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { TableAntd } from '@/components/organisms/TableAntd';
import { LimitOption } from '@/models';
import { useGetHRList } from '@/modules/hr-management/hooks/useGetHRList';

interface IProps {
  formMethods?: UseFormReturn<FormWorkerModel, object>;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
  workerDetail?: FormWorkerModel;
  workerId?: string;
}

const LeaderModal: FC<IProps> = ({ show, onHide, formMethods, workerId, workerDetail }) => {
  const { globalSearch, queryString, handleUpdateGlobalSearch, updateQueryState, queryState } =
    useQueryRequest<{ acc_type: string }>(
      { filters: { acc_type: 'FACTORY' } },
      () => undefined,
      false
    );
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

  const leader = formMethods?.watch('manager_id');

  const queryClient = useQueryClient();
  const { mutateAsync: updateWorker } = useUpdateWorker({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['worker-detail', workerId] });
    },
  });
  const { mutateAsync } = useMutation(updateWorker);

  useEffect(() => {
    if (leader) handleRadioChange(leader);
  }, [leader]);

  const { data: recruitmentTeamsList, isLoading } = useGetHRList(queryString);

  const dataSource = recruitmentTeamsList?.rows?.map((i) => ({
    ...i,
    key: i.id,
  }));

  const columns: TableColumnsType<LeaderModel> = [
    {
      dataIndex: 'id',
      render: (text, record) => (
        <div className="w-100 text-center">
          <Radio
            checked={selectedRadio === record.id}
            onChange={() => handleRadioChange(record.id)}
          />
        </div>
      ),
      width: '100px',
    },
    {
      dataIndex: 'code',
      title: 'Mã nhân sự',
    },
    {
      dataIndex: 'name',
      title: 'Họ tên nhân sự',
      render(value, record, index) {
        const avatar = record.avatar || defaultAvatar;

        return (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px' }}>{record.name}</div>
          </div>
        );
      },
    },
    {
      dataIndex: 'phone',
      title: 'Số điện thoại',
    },
  ];

  const handleRadioChange = (id: string) => {
    formMethods?.setValue('id', id);
    setSelectedRadio(id);
  };

  function handleHide() {
    onHide?.();
  }

  const handleSubmit = async () => {
    formMethods?.setValue('manager_id', selectedRadio || '');

    if (!selectedRadio) return;

    const submitData: FormWorkerModel = {
      id: workerId,
      manager_id: selectedRadio,
      full_name: workerDetail?.full_name || '',
      gender: workerDetail?.gender || '',
      phone: workerDetail?.phone || '',
    };

    const res = await mutateAsync(submitData);
    if (!res) return;

    onHide?.();
  };

  const handleChangePagination = ({ current, pageSize }: TablePaginationConfig) => {
    updateQueryState({
      limit: pageSize as any,
      page: current,
    });
  };

  return (
    <Modal
      bodyClassName="scroll-y"
      dialogClassName="mw-1000px"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="text-muted">Chuyển người quản lý mới</h3>}
      centered
    >
      <div className="card-toolbar mb-4">
        <TableGlobalSearch
          onChange={handleUpdateGlobalSearch}
          placeholder="Nhập tên người quản lý"
          value={globalSearch}
        />
      </div>
      <TableAntd
        PaginationOnchange={(page: number, pageSize: number) => {
          updateQueryState({
            limit: pageSize as LimitOption,
            page,
          });
        }}
        columns={columns}
        currentPage={queryState.page}
        data={dataSource || []}
        isLoading={isLoading}
        limit={queryState.limit}
        total={recruitmentTeamsList?.total_rows}
        showSizeChanger
      />

      <div className="text-end pt-10">
        <Button className="rounded-pill py-2 me-3" onClick={() => handleHide()} variant="outline">
          Hủy
        </Button>
        <Button className="rounded-pill py-2" onClick={handleSubmit} variant="primary">
          Cập nhật
        </Button>
      </div>
    </Modal>
  );
};

export { LeaderModal };
