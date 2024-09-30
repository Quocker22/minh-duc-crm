/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable simple-import-sort/imports */
import { SettingOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { WorkerNotedList } from '@/modules/recruitment-plan/components/table-list-data/WorkerNotedList';
import { SelectAcademic } from '@/components/molecules/SelectAcademic';
import { DateTimeFormat, PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { LeaderModal } from '@/modules/recruitment-plan/components/table-list-data/LeaderModal';
import { StatusModal } from '@/modules/recruitment-plan/components/table-list-data/StatusModal';
import { useGetRecruitmentDetail } from '@/modules/recruitment-plan/hooks/useGetRecruitmentDetail';
import { FormRecruitmentPlanModel } from '@/modules/recruitment-plan/models';
import { useGetWorkerDetail } from '@/modules/worker/hooks/useGetWorkerDetail';
import { FormWorkerModel, STATUS_OPTION, StatusOption } from '@/modules/worker/models';
import { Modal } from '@/components/organisms/Modal';
import { FormWorkerNoted, useUpdateWorkerNoted } from '@/modules/worker/hooks/useUpdateWorkerNoted';
import { Badge, Popconfirm } from 'antd';
import { Button } from '@/components/molecules/Button';
import { useUpdateWorker } from '@/modules/worker/hooks/useUpdateWorker';
import { useDeleteWorkerFromRecruitment } from '@/modules/recruitment-organization/hooks/useDeleteWorkerFromRecruitment';

interface IProps {
  readonly workerId: string;
  readonly isViewOnly?: boolean;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const statusWorker = (status?: any) => {
  if (!status) {
    return {
      bgColor: '#B8B8B8',
      label: 'Chưa phân loại',
      textColor: 'white',
      value: StatusOption.trangThai01,
    };
  }

  return STATUS_OPTION.find((item) => item.value === status);
};

const hiddenBtnStatusWorker = (status: any) => {
  if (
    status === StatusOption.trangThai05 ||
    status === StatusOption.trangThai06 ||
    status === StatusOption.trangThai07 ||
    status === StatusOption.trangThai08 ||
    status === StatusOption.trangThai09
  ) {
    return false;
  }

  return true;
};

const WorkerInfoModal: FC<IProps> = ({ workerId, onSaved, show, onHide, isViewOnly }) => {
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const { id } = useParams();
  const formMethodsWorker = useForm<FormWorkerModel>();
  const recruitmentFormMethods = useForm<FormRecruitmentPlanModel>();

  const [visibleModalStatus, setVisibleModalStatus] = useState(false);

  const { mutateAsync: updateNoteWorker } = useUpdateWorkerNoted();
  const { mutateAsync: mutateAsyncUpdateWorker } = useUpdateWorker();
  const { mutateAsync: updateWorker } = useMutation(mutateAsyncUpdateWorker);
  const { mutateAsync: deleteWorkerFromRecruitment } = useDeleteWorkerFromRecruitment();

  const { mutateAsync: mutateNoteAsync } = useMutation(updateNoteWorker);

  const { data: recruitmentDetail } = useGetRecruitmentDetail(id || '', {
    enabled: !!id,
    onSuccess: (data) => {
      if (!data) return;

      recruitmentFormMethods.reset({
        academic_level_id: data.academic_level_id,
        age_range: data.age_range,
        career_id: data.career_id,
        customer_id: data.customer_id,
        customer_name: data.customer?.name,
        degree_id: data.degree_id,
        end_date: data.end_date,
        experience: data.experience,
        gender_percentage: data.gender_percentage,
        name: data.name,
        other_requirement_id: data.other_requirement_id,
        position_id: data.position_id,
        quantity: data.quantity,
        salary: data.salary,
        start_date: data.start_date,
        status: data.status,
      });
    },
  });

  const { data: workerDetail, refetch } = useGetWorkerDetail(workerId || '', {
    enabled: !!workerId,
    onSuccess: (data) => {
      if (!data) return;

      formMethodsWorker.reset({
        id: workerId,
        back_id_card_image_link: data.back_id_card_image_link,
        bank_name: data.bank_name,
        bank_owner_account_name: data.bank_owner_account_name,
        bank_owner_account_number: data.bank_owner_account_number,
        birthday: data.birthday,
        code: data.code,
        creator: data.creator,
        cv_link: data.cv_link,
        degree_id: data.degree_id,
        email: data.email,
        front_id_card_image_link: data.front_id_card_image_link,
        full_address: data.full_address,
        full_name: data.full_name,
        gender: data.gender,
        id_number: data.id_number,
        num_experience: data.num_experience,
        password: '',
        phone: data.phone,
        province_code: data.province_code,
        district_code: data.district_code,
        ward_code: data.ward_code,
        recruitment_status_id: data.recruitment_status_id,
        manager_id: data.manager_id,
        manager_name: data.manager?.name,
      });
    },
  });

  const handleOnSubmit = async () => {
    await updateWorker(formMethodsWorker.watch());
    refetch();
    handleSaved();
  };

  function handleSaved() {
    setIsVisibleFormModal(false);
    onSaved?.();
  }

  function handleHide() {
    onHide?.();
    onSaved?.();
  }

  const handleKeyPressNote = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitNote();
    }
  };

  const handleSubmitNote = async () => {
    const noteData = recruitmentFormMethods.getValues('note');
    if (!noteData) return;

    const submitData: FormWorkerNoted = {
      note: noteData,
      plan_id: id,
      worker_id: workerId,
      recruitment_status_id: workerDetail?.recruitment_status_id,
    };

    const res = await mutateNoteAsync(submitData);
    if (!res) return;
    recruitmentFormMethods.resetField('note');
    refetch();
  };

  async function handleClickRemove() {
    await deleteWorkerFromRecruitment({
      plan_id: id || '',
      worker_id: workerDetail?.id || '',
    });
    onSaved?.();
  }

  return (
    <Modal
      bodyClassName="scroll-y"
      size="xl"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={
        <h3 className="fw-bolder text-center w-100">Thông tin NLĐ trong chiến dịch tuyển dụng</h3>
      }
      centered
    >
      <div className="row card-body">
        <div
          className="col-6 px-4"
          style={{
            borderRight: '1px solid #BFC0C2',
          }}
        >
          <div className="mb-3" style={{ alignItems: 'center', display: 'flex' }}>
            <div className="fw-bold fs-4" style={{ flexGrow: 1 }}>
              Tình trạng tuyển dụng
            </div>

            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: '.5rem',
              }}
            >
              <span>Trạng thái tuyển dụng</span>
              {workerDetail?.recruitment_status_id && (
                <Badge
                  className="site-badge-count-109"
                  count={statusWorker(workerDetail?.recruitment_status_id)?.label}
                  style={{
                    backgroundColor: statusWorker(workerDetail?.recruitment_status_id)?.bgColor,
                    color: statusWorker(workerDetail?.recruitment_status_id)?.textColor,
                  }}
                />
              )}
              {isViewOnly && (
                <SettingOutlined
                  className="cursor-pointer pe-2"
                  onClick={() => setVisibleModalStatus(true)}
                  rev="SettingOutlined"
                />
              )}
            </div>
          </div>
          <InputField
            classNameInputHint="col-8"
            control={recruitmentFormMethods.control}
            errorClass="ps-4"
            groupClass="row mb-5"
            label={<b>Tên chiến dịch</b>}
            labelClass="col-4 mt-3"
            name="name"
            disabled
          />

          <InputField
            classNameInputHint="col-8"
            control={recruitmentFormMethods.control}
            errorClass="ps-4"
            groupClass="row mb-5"
            label={<b>Tên khách hàng</b>}
            labelClass="col-4 mt-3"
            name="customer_name"
            disabled
          />
          <div className="mb-3 d-flex items-center">
            <svg
              style={{
                height: '25px',
                width: '25px',
              }}
            >
              <path
                d="M17.1 0H1.9C0.855 0 0.00949999 0.855 0.00949999 1.9L0 19L3.8 15.2H17.1C18.145 15.2 19 14.345 19 13.3V1.9C19 0.855 18.145 0 17.1 0ZM3.8 6.65H15.2V8.55H3.8V6.65ZM11.4 11.4H3.8V9.5H11.4V11.4ZM15.2 5.7H3.8V3.8H15.2V5.7Z"
                fill="#778FBB"
                xmlns="http://www.w3.org/2000/svg"
              />
            </svg>
            <span
              style={{
                color: '#3f4254',
                fontSize: '1.1rem',
                fontWeight: 700,
              }}
            >
              Ghi chú chiến dịch
            </span>
          </div>
          <InputField
            control={recruitmentFormMethods.control}
            errorClass="ps-4"
            name="note"
            placeholder="Viết ghi chú"
            onPressEnter={handleKeyPressNote}
            suffix={
              <div className="cursor-pointer" onClick={handleSubmitNote}>
                <svg
                  style={{
                    fill: 'blue',
                    height: '20px',
                    width: '20px',
                  }}
                >
                  <path
                    clipRule="evenodd"
                    d="M19.943 1.41631C20.223 0.576244 19.4239 -0.222997 18.5838 0.0569869L0.734798 6.00673C-0.267542 6.34081 -0.23647 7.76919 0.779364 8.05938L9.46034 10.5398L11.9406 19.2207C12.2309 20.2367 13.6592 20.2678 13.9933 19.2653L19.943 1.41631ZM18.5437 2.21634L12.9739 18.9256L10.4984 10.2615L18.5437 2.21634ZM17.7838 1.45645L9.73862 9.5016L1.07466 7.02619L17.7838 1.45645Z"
                    fillRule="evenodd"
                    xmlns="http://www.w3.org/2000/svg"
                  />
                </svg>
              </div>
            }
            required
          />
          <WorkerNotedList workerId={workerId} />
        </div>
        {isViewOnly && (
          <div className="col-6 px-8">
            <div className="mb-3" style={{ alignItems: 'center', display: 'flex' }}>
              <div className="fw-bold fs-4" style={{ flexGrow: 1 }}>
                Thông tin hồ sơ NLĐ
              </div>
            </div>
            <InputField
              classNameInputHint="col-9"
              control={formMethodsWorker.control}
              errorClass="ps-4"
              groupClass="row mb-5"
              label={<b>Họ tên</b>}
              labelClass="col-3 mt-3"
              name="full_name"
              disabled
            />

            <InputField
              classNameInputHint="col-9"
              control={formMethodsWorker.control}
              groupClass="row mb-5"
              label={<b>Số điện thoại</b>}
              labelClass="col-3 mt-3"
              name="phone"
              pattern={`${PHONE_RULE_REGEX_NULLABLE}`}
              type="tel"
              disabled
            />

            <InputField
              classNameInputHint="col-9"
              groupClass="row mb-5"
              label={<b>Giới tính</b>}
              labelClass="col-3 mt-3"
              value={formMethodsWorker.watch('gender') === 'MALE' ? 'Nam' : 'Nữ'}
              name="gender"
              disabled
            />

            <InputDateField
              classNameInputHint="col-9"
              className="w-100"
              control={formMethodsWorker.control}
              format={DateTimeFormat.fe_date}
              formatValue={DateTimeFormat.be_date}
              groupClass="row mb-5"
              label={<b>Ngày sinh</b>}
              labelClass="col-3 mt-3"
              name="birthday"
              placeholder="DD/MM/YYYY"
              disabled
            />

            <SelectAcademic
              classNameInputHint="col-9"
              control={formMethodsWorker.control}
              getOptionValue={(option) => String(option.id)}
              groupClass="row mb-5"
              label={<b>Trình độ</b>}
              labelClass="col-3 mt-3"
              name="degree_id"
              disabled
            />

            <InputField
              classNameInputHint="col-9"
              control={formMethodsWorker.control}
              groupClass="row mb-5"
              label={<b>Người tạo</b>}
              labelClass="col-3 mt-3"
              name="creator.name"
              disabled
            />

            <InputField
              classNameInputHint="col-9"
              control={formMethodsWorker.control}
              groupClass="row mb-5"
              label={<b>Người quản lý</b>}
              labelClass="col-3 mt-3"
              name="manager_name"
              suffix={
                <SettingOutlined
                  className="cursor-pointer pe-2"
                  onClick={() => setIsVisibleFormModal(true)}
                  rev="SettingOutlined"
                />
              }
              readOnly
            />
            <div style={{ display: 'flex', fontSize: '1rem', justifyContent: 'flex-end' }}>
              <Link to={`/worker/${workerId}`}>Xem thêm</Link>
            </div>
          </div>
        )}
        <div className="d-flex pt-5 justify-content-between">
          <Popconfirm onConfirm={handleClickRemove} title="Bạn có chắc chắn muốn xóa?">
            <a className="text-danger">Xóa data khỏi chiến dịch</a>
          </Popconfirm>

          <div className="text-center">
            <Button className="rounded-pill py-2 me-4" variant="secondary" onClick={handleHide}>
              Đóng
            </Button>
            <Button className="rounded-pill py-2" variant="primary" onClick={handleOnSubmit}>
              cập nhật
            </Button>
          </div>
        </div>
      </div>
      {isVisibleFormModal && workerDetail && (
        <LeaderModal
          formMethods={formMethodsWorker}
          onHide={() => {
            setIsVisibleFormModal(false);
          }}
          workerDetail={workerDetail}
          workerId={workerId}
          onSaved={handleSaved}
          show={isVisibleFormModal}
        />
      )}

      {visibleModalStatus && workerDetail && (
        <StatusModal
          show={visibleModalStatus}
          onHide={() => {
            setVisibleModalStatus(false);
          }}
          onSaved={() => {
            refetch();
          }}
          workerId={workerId}
          workerDetail={workerDetail}
        />
      )}
    </Modal>
  );
};

export { WorkerInfoModal };
