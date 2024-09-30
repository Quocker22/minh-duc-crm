/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable simple-import-sort/imports */
import { SettingOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { WorkerNotedList } from '@/modules/recruitment-plan/components/table-list-data/WorkerNotedList';
import { SelectAcademic } from '@/components/molecules/SelectAcademic';
import { DateTimeFormat, PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { LeaderModal } from '@/modules/recruitment-plan/components/table-list-data/LeaderModal';
import { FormRecruitmentPlanModel } from '@/modules/recruitment-plan/models';
import { useGetWorkerDetail } from '@/modules/worker/hooks/useGetWorkerDetail';
import { FormWorkerModel } from '@/modules/worker/models';
import { Modal } from '@/components/organisms/Modal';
import { Badge } from 'antd';
import { useGetCustomerDetail } from '@/modules/customer/hooks/useGetCustomerDetail';
import { OPERATIONAL_STATUS_OPTION } from '@/modules/operate-worker/models';
import { StatusOperateModal } from '@/modules/operate-worker/components/StatusOperateModal';

interface IProps {
  readonly workerId: string;
  readonly isViewOnly?: boolean;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

export const statusOperationalWorker = (status?: string) => {
  return OPERATIONAL_STATUS_OPTION.find((item) => item.value === status);
};

const CheckInWorkerInfoModal: FC<IProps> = ({ workerId, onSaved, show, onHide, isViewOnly }) => {
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const { id } = useParams();
  const formMethodsWorker = useForm<FormWorkerModel>();
  const recruitmentFormMethods = useForm<FormRecruitmentPlanModel>();

  const [visibleModalStatus, setVisibleModalStatus] = useState(false);

  useGetCustomerDetail(id || '', {
    enabled: !!id,
    onSuccess: (data) => {
      if (!data) return;

      recruitmentFormMethods.reset({
        name: data.description,
        customer_name: data.name,
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

  function handleSaved() {
    setIsVisibleFormModal(false);
    onSaved?.();
  }

  function handleHide() {
    onHide?.();
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
        <h3 className="fw-bolder text-center w-100">
          Thông tin người lao động | Trong nhà máy đang vận hành
        </h3>
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
              Thông tin vận hành
            </div>

            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: '.5rem',
              }}
            >
              <span>Trạng thái vận hành</span>
              <Badge
                className="site-badge-count-109"
                count={statusOperationalWorker(workerDetail?.operational_status.id)?.label}
                style={{
                  backgroundColor: statusOperationalWorker(workerDetail?.operational_status.id)
                    ?.bgColor,
                  color: statusOperationalWorker(workerDetail?.operational_status.id)?.textColor,
                }}
              />
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
              Ghi chú vận hành
            </span>
          </div>
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
        {/* <div className="text-center mt-3">
          <Button className="rounded-pill py-2 me-4" variant="secondary" onClick={handleHide}>
            Đóng
          </Button>
          <Button className="rounded-pill py-2" variant="primary" onClick={handleOnSubmit}>
            cập nhật
          </Button>
        </div> */}
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
        <StatusOperateModal
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

export { CheckInWorkerInfoModal };
