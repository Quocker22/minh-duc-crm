import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { CheckboxProps, TableColumnsType, Tabs } from 'antd';
import clsx from 'clsx';
import { FC, Key, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { Modal } from '@/components/organisms/Modal';
import { TableAntd } from '@/components/organisms/TableAntd';
import { useAuth } from '@/hooks/useAuth';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { LimitOption } from '@/models';
import { useCreateRecruitmentAddWorker } from '@/modules/recruitment-organization/hooks/useCreateRecruitmentAddWorker';
import { WorkerInfoModal } from '@/modules/recruitment-plan/components/table-list-data/WorkerInfoModal';
import { FormCreateWorker } from '@/modules/worker/components/form/FormCreateWorker';
import { useCreateWorker } from '@/modules/worker/hooks/useCreateWorker';
import { useGetWorkerList } from '@/modules/worker/hooks/useGetWorkerList';
import { FormWorkerModel, WorkerModel } from '@/modules/worker/models';
import { getWorkerFormSchema } from '@/modules/worker/services/validation';

interface IProps {
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const ListDataModal: FC<IProps> = ({ show, onHide, onSaved }) => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const [workerIdEdit, setWorkerIdEdit] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { globalSearch, queryString, handleUpdateGlobalSearch, queryState, updateQueryState } =
    useQueryRequest<{
      plan_id?: string;
      source_target?: string;
    }>({ filters: { plan_id: id, source_target: 'all' } });

  const resolver = yupResolver(getWorkerFormSchema());
  const formMethods = useForm<FormWorkerModel>({
    defaultValues: {
      gender: 'MALE',
      password: '123456789',
    },
    resolver,
  });

  const { mutateAsync: createRecruitmentAddWorker } = useCreateRecruitmentAddWorker();
  const { mutateAsync: createWorker } = useCreateWorker();

  const { mutateAsync: mutateAsyncRecruitmentAddWorker } = useMutation(createRecruitmentAddWorker);
  const { mutateAsync } = useMutation(createWorker);

  const onSubmit: SubmitHandler<FormWorkerModel> = async (formData, event) => {
    event?.preventDefault();
    const response = await mutateAsync({ ...formData });
    const workerId = response as unknown as { id: string };

    if (!response) return;
    await mutateAsyncRecruitmentAddWorker({
      plan_id: id || '',
      workers: [{ id: workerId.id, manager_id: currentUser?.id || '' }],
    });

    setWorkerIdEdit(workerId.id);
    setIsVisibleFormModal(true);
    formMethods.reset({});
  };

  const { isLoading, data: workerList, refetch } = useGetWorkerList(queryString);

  const dataSource = workerList?.rows.map((i) => ({ ...i, key: i.id }));

  const onSubmitFromWorker = async () => {
    const newData: {
      id: Key;
      manager_id?: string;
    }[] = [];
    selectedRowKeys.map((i) => {
      dataSource?.map((j) => {
        if (j.id === i) {
          newData.push({ id: i, manager_id: j.manager?.id });
        }
      });
    });
    const res = await mutateAsyncRecruitmentAddWorker({
      plan_id: id || '',
      workers: newData,
    });
    if (!res) return;
    onSaved?.();
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setDisableSubmit(false);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    const initialSelectedKeys = workerList?.rows.filter((i) => i.in_plan).map((d) => d.id) || [];
    setSelectedRowKeys(initialSelectedKeys);
  }, [workerList]);

  const rowSelection = {
    getCheckboxProps: (record: WorkerModel): CheckboxProps => ({
      disabled: record.in_plan,
    }),
    onChange: onSelectChange,
    selectedRowKeys,
  };

  const columns: TableColumnsType<WorkerModel> = [
    {
      dataIndex: 'code',
      title: 'Mã NLĐ',
    },
    {
      dataIndex: 'full_name',
      title: 'Họ tên NLĐ',
    },
    {
      dataIndex: 'manager.name',
      render: (_: any, record: WorkerModel) => record.manager?.name,
      title: 'Người quản lý',
    },
    {
      dataIndex: 'phone',
      title: 'Số điện thoại',
    },
  ];

  function handleHide() {
    onHide?.();
  }

  return (
    <Modal
      backdrop="static"
      dialogClassName={clsx(!isVisibleFormModal ? 'mw-700px' : 'mw-1000px')}
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={
        <h3 className="fw-bolder">
          {' '}
          {!isVisibleFormModal ? 'Danh sách người lao động' : 'Thông tin người lao động'}
        </h3>
      }
      centered
    >
      {!isVisibleFormModal ? (
        <Tabs
          className="min-h-300px"
          defaultActiveKey="1"
          items={[
            {
              children: (
                <div>
                  <div className="card-toolbar">
                    <TableGlobalSearch
                      onChange={handleUpdateGlobalSearch}
                      placeholder="Nhập tên hoặc số điện thoại"
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
                    rowSelection={rowSelection}
                    scroll={{ y: 300 }}
                    total={workerList?.total_rows}
                    showSizeChanger
                  />
                  <div className="mt-5 d-flex w-100">
                    <div className="text-start w-50">
                      <span>
                        Đã chọn ({selectedRowKeys.length}/{dataSource?.length})
                      </span>
                    </div>
                    <div className="text-end w-50">
                      <Button
                        className="rounded-pill py-2 me-3 text-danger"
                        onClick={() => handleHide()}
                        variant="outline"
                      >
                        Hủy
                      </Button>
                      <Button
                        className="rounded-pill py-2"
                        disabled={disableSubmit}
                        onClick={onSubmitFromWorker}
                        variant="primary"
                      >
                        Thêm
                      </Button>
                    </div>
                  </div>
                </div>
              ),
              key: '1',
              label: 'Danh sách có sẵn',
            },
            {
              children: (
                <div>
                  <FormField className="form w-100" methods={formMethods} onSubmit={onSubmit}>
                    <FormCreateWorker formMethods={formMethods} />
                    <div className="text-end">
                      <Button
                        className="rounded-pill py-2 me-3 text-danger"
                        onClick={() => handleHide()}
                        variant="outline"
                      >
                        Hủy
                      </Button>
                      <Button
                        className="rounded-pill py-2"
                        onClick={formMethods.handleSubmit(onSubmit)}
                        variant="primary"
                      >
                        tạo
                      </Button>
                    </div>
                  </FormField>
                </div>
              ),
              key: '2',
              label: 'Tạo NLD mới',
            },
          ]}
          type="card"
        />
      ) : (
        <WorkerInfoModal
          onHide={() => {
            handleHide();
          }}
          onSaved={() => {
            refetch();
            handleHide();
          }}
          show={isVisibleFormModal}
          workerId={workerIdEdit}
          isViewOnly
        />
      )}
    </Modal>
  );
};

export { ListDataModal };
