import { useMutation } from '@tanstack/react-query';
import { Badge, TableColumnsType } from 'antd';
import { cloneDeep } from 'lodash-es';
import moment from 'moment';
import { FC, useMemo, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { DropdownCheckInAll } from '@/components/molecules/DropdownCheckInAll';
import { FormField } from '@/components/molecules/FormField';
import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { InputNumberField } from '@/components/molecules/InputNumberField';
import { TableGlobalSearch } from '@/components/molecules/TableGlobalSearch';
import { Modal } from '@/components/organisms/Modal';
import { TableAntd } from '@/components/organisms/TableAntd';
import { DateTimeFormat } from '@/constants';
import { DatePickerType, LimitOption, QueryState } from '@/models';
import { statusOperationalWorker } from '@/modules/operate-worker/components/CheckInWorkerInfoModal';
import { useCreateCheckInMany } from '@/modules/operate-worker/hooks/useCreateCheckInMany';
import { FromCheckInWorkerManyModel } from '@/modules/operate-worker/models';
import { CheckInsModel, WorkerModel, WorkerModelFilterModel } from '@/modules/worker/models';
import { disabledDateBirthday, filterWorkersInCheckInList } from '@/utils';

interface IProps {
  readonly globalSearch?: string;
  handleUpdateGlobalSearch?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  readonly isHideEdit?: boolean;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  queryState?: QueryState<WorkerModelFilterModel>;
  readonly show?: boolean;
  updateQueryState?: (updates: Partial<QueryState<WorkerModelFilterModel>>) => void;
  readonly workerList?: WorkerModel[];
}

const WorkerManageCheckInALLModal: FC<IProps> = (props: IProps) => {
  const [today, setToday] = useState(moment().format(DateTimeFormat.fe_date_2));
  const [isDL, setIsDL] = useState<{ indexs?: number[] }>({ indexs: [] });

  const formMethods = useForm<FromCheckInWorkerManyModel>({ defaultValues: { data: [] } });

  useFieldArray({
    control: formMethods.control,
    name: 'data',
  });

  const { mutateAsync: createCheckIn } = useCreateCheckInMany();

  const { mutateAsync } = useMutation(createCheckIn);
  const onSubmit: SubmitHandler<FromCheckInWorkerManyModel> = async (formData) => {
    const cloneData = cloneDeep(formData);
    formData = { data: cloneData.data.filter((obj) => obj.checkin_type) };

    const res = await mutateAsync(formData);
    if (!res) return;

    props.onSaved?.();
    formMethods.reset();
  };

  const columns: TableColumnsType<WorkerModel> = [
    {
      dataIndex: 'full_name',
      fixed: 'left',
      key: 'full_name',
      render: (text, record, index) => {
        formMethods.setValue(`data.${index}.worker_id`, record.id);

        const status = statusOperationalWorker(record.operational_status_id);
        let label = status?.label;
        if (
          status?.label === 'Tự nghỉ' ||
          status?.label === 'Cắt giảm' ||
          status?.label === 'Bị đuổi'
        )
          label = 'Đã nghỉ';

        return (
          <div className="text-start">
            <p className="text-primary"> {record.full_name}</p>
            <Badge
              className="site-badge-count-109"
              count={label}
              style={{
                backgroundColor: status?.bgColor,
                color: status?.textColor,
              }}
            />
            <p className="m-0">{record.code}</p>
            <p className="m-0">{record.id_number}</p>
          </div>
        );
      },
      title: 'Họ và tên NLĐ',
      width: 150,
    },
    {
      dataIndex: 'check_in',
      fixed: 'left',
      key: 'check_in',
      render: (_, record: WorkerModel, index) => (
        <div className="text-end">
          <DropdownCheckInAll
            formMethods={formMethods}
            index={index}
            isHideEdit={props.isHideEdit}
            onSelect={(value) => {
              if (value?.key === 'CDL') {
                const updatedIndexes = isDL.indexs ? [...isDL.indexs, index] : [index];
                setIsDL({ indexs: updatedIndexes });
              } else {
                const updatedIndexes = isDL.indexs
                  ? isDL.indexs.filter((idx) => idx !== index)
                  : [];
                setIsDL({ indexs: updatedIndexes });
              }
            }}
            workerCheckIn={{ title: today }}
          />
        </div>
      ),
      title: 'Check in',
      width: 150,
    },
    {
      dataIndex: 'HC_NGAY',
      key: 'HC_NGAY',
      render: (_, record, index) => {
        formMethods.setValue(`data.${index}.checkin_shifts.${0}.name`, 'HC_NGAY');

        return (
          isDL.indexs?.includes(index) && (
            <InputNumberField
              control={formMethods.control}
              disabled={props.isHideEdit}
              name={`data.${index}.checkin_shifts.${0}.value`}
              size="small"
              type="number"
              isHideRoundedPill
            />
          )
        );
      },

      title: `HC ngày (h)`,
    },
    {
      dataIndex: 'TC_TRUA',
      key: 'TC_TRUA',
      render: (_, record, index) => {
        formMethods.setValue(`data.${index}.checkin_shifts.${1}.name`, 'TC_TRUA');

        return (
          isDL.indexs?.includes(index) && (
            <InputNumberField
              control={formMethods.control}
              disabled={props.isHideEdit}
              name={`data.${index}.checkin_shifts.${1}.value`}
              size="small"
              type="number"
              isHideRoundedPill
            />
          )
        );
      },
      title: `TC trưa (h)`,
    },
    {
      dataIndex: 'TC_NGAY',
      key: 'TC_NGAY',
      render: (_, record, index) => {
        formMethods.setValue(`data.${index}.checkin_shifts.${2}.name`, 'TC_NGAY');

        return (
          isDL.indexs?.includes(index) && (
            <InputNumberField
              control={formMethods.control}
              disabled={props.isHideEdit}
              name={`data.${index}.checkin_shifts.${2}.value`}
              size="small"
              type="number"
              isHideRoundedPill
            />
          )
        );
      },
      title: `TC ngày (h)`,
    },
    {
      dataIndex: 'HC_DEM',
      key: 'HC_DEM',
      render: (_, record, index) => {
        formMethods.setValue(`data.${index}.checkin_shifts.${3}.name`, 'HC_DEM');

        return (
          isDL.indexs?.includes(index) && (
            <InputNumberField
              control={formMethods.control}
              disabled={props.isHideEdit}
              name={`data.${index}.checkin_shifts.${3}.value`}
              size="small"
              type="number"
              isHideRoundedPill
            />
          )
        );
      },
      title: `HC đêm (h)`,
    },
    {
      dataIndex: 'TC_DEM',
      key: 'TC_DEM',
      render: (_, record, index) => {
        formMethods.setValue(`data.${index}.checkin_shifts.${4}.name`, 'TC_DEM');

        return (
          isDL.indexs?.includes(index) && (
            <InputNumberField
              control={formMethods.control}
              disabled={props.isHideEdit}
              name={`data.${index}.checkin_shifts.${4}.value`}
              size="small"
              type="number"
              isHideRoundedPill
            />
          )
        );
      },
      title: `TC đêm (h)`,
    },
    {
      dataIndex: 'note',
      key: 'note',
      render: (_, record, index) => (
        <InputField
          control={formMethods.control}
          disabled={props.isHideEdit}
          name={`data.${index}.note`}
          size="small"
          type="textarea"
          isHideRoundedPill
        />
      ),
      title: `Ghi chú`,
      width: 200,
    },
  ];

  function handleHide() {
    props.onHide?.();
  }

  const workerListFilter = useMemo(
    () =>
      props.workerList?.map((i) => {
        return i.manager_checkins?.filter((e) => {
          return moment(e.checkin_date).format('DD/MM/YYYY') === today;
        });
      }),
    [props.workerList, today]
  );

  function filterCheckIns(data: CheckInsModel[][] | undefined) {
    const result: CheckInsModel[] = [];

    data?.forEach((innerArray) => {
      innerArray?.forEach((item) => {
        result.push(item);
      });
    });

    return result;
  }

  const dataSource = useMemo(
    () =>
      filterWorkersInCheckInList(
        props.workerList?.map((i) => ({ ...i, key: i.id })) || [],
        filterCheckIns(workerListFilter) || []
      ),
    [props.workerList, workerListFilter]
  );

  return (
    <Modal
      backdrop="static"
      bodyClassName="scroll-y"
      headerClassName="py-3"
      onHide={handleHide}
      show={props.show}
      size="xl"
      title={
        <h3 className="text-center w-100">
          <h4 className="pb-2">
            {props.isHideEdit ? 'Người lao động chấm công' : 'Cập nhật ngày công tất cả lao động'}{' '}
          </h4>
          <p className="fs-5 text-danger">
            {!props.isHideEdit &&
              'Danh sách chỉ chứa những lao động chưa được checkin lần nào trong ngày'}
          </p>
          <InputDateField
            allowClear={false}
            disabledDate={disabledDateBirthday}
            format={DateTimeFormat.fe_date_2}
            formatValue={DateTimeFormat.fe_date_2}
            name="date"
            onChange={(date: string | undefined, dateString: string) => {
              setToday(dateString);
            }}
            picker={DatePickerType.date}
            size="middle"
            value={today}
            isHideRoundedPill
          />
        </h3>
      }
      centered
    >
      <FormField className="form w-100" methods={formMethods} onSubmit={onSubmit}>
        <TableGlobalSearch
          onChange={props.handleUpdateGlobalSearch}
          placeholder="Người lao động"
          value={props.globalSearch}
        />
        <div className="overflow-auto" style={{ maxHeight: '450px' }}>
          <TableAntd
            PaginationOnchange={(page: number, pageSize: number) => {
              props.updateQueryState &&
                props.updateQueryState({
                  limit: pageSize as LimitOption,
                  page,
                });
            }}
            columns={columns}
            currentPage={props.queryState && props.queryState.page}
            data={dataSource || []}
            limit={(props.queryState && props.queryState.limit) || 0}
            sticky={{ offsetHeader: 0 }}
            showSizeChanger
          />
        </div>
        <div className="text-end pt-10">
          <Button className="rounded-pill py-2 me-3" onClick={() => handleHide()} variant="outline">
            Hủy
          </Button>
          {!props.isHideEdit && (
            <Button className="rounded-pill py-2" type="submit" variant="primary">
              Check in
            </Button>
          )}
        </div>
      </FormField>
    </Modal>
  );
};

export { WorkerManageCheckInALLModal };
