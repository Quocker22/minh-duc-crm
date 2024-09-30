/* eslint-disable react/jsx-sort-props */
/* eslint-disable simple-import-sort/imports */
import moment, { Moment } from 'moment';
import { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/molecules/Button';
import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { RadioField } from '@/components/molecules/RadioField';
import { SelectAcademic } from '@/components/molecules/SelectAcademic';
import { SelectDistrict } from '@/components/molecules/SelectDistrict';
import { SelectProvince } from '@/components/molecules/SelectProvince';
import { SelectWard } from '@/components/molecules/SelectWard';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { UploadField } from '@/components/molecules/UploadField';
import { DateTimeFormat, PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { ChangePasswordModal } from '@/modules/hr-management/components/form/ChangePasswordModal';
import {
  FormWorkerModel,
  STATUS_OPTION,
  StatusOption,
  WorkerModel,
  WorkerRole,
} from '@/modules/worker/models';
import { getClientDate, history } from '@/utils';
import { Avatar, Badge } from 'antd';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { LeaderModal } from '@/modules/recruitment-plan/components/table-list-data/LeaderModal';
import { SettingOutlined } from '@ant-design/icons';
import { AccountStatusModal } from '@/modules/worker/components/AccountStatusModal';
import { Image } from '@/components/molecules/Image';
import { getWorkerStatus } from '@/modules/worker/utils';
import { getRoleEmployee } from '@/roles';

interface IProps {
  formMethods: UseFormReturn<FormWorkerModel, object>;
  readonly isSubmit?: boolean;
  readonly workerDataDetail?: WorkerModel;
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

const WorkerDetailStep1: FC<IProps> = ({ formMethods, isSubmit, workerDataDetail }) => {
  const { id } = useParams();
  formMethods.setValue('id', id);
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const [isVisibleLeaderModal, setIsVisibleLeaderModal] = useState(false);
  const [visibleModalAccountStatus, setVisibleModalAccountStatus] = useState(false);

  const formMethodsWorker = useForm<FormWorkerModel>();

  function handleSaved() {
    setIsVisibleFormModal(false);
  }

  const disabledDate = (currentDate: Moment) => {
    // Có thể disable ngày hiện tại và ngày trong tương lai
    return currentDate && currentDate >= moment().startOf('day');
  };

  const watchProvinceId = formMethods.watch('province_code');
  const watchDistrictId = formMethods.watch('district_code');

  useEffect(() => {
    formMethodsWorker.reset({
      manager_id: workerDataDetail?.manager_id,
    });
  }, [workerDataDetail]);

  const qlnldCapNhat = getRoleEmployee(WorkerRole.qlnld_cap_nhat);

  return (
    <>
      <div className="row card-body">
        <div className="col-6">
          <div className="mb-3">
            <span className="text-primary">Trạng thái hoạt động</span>
          </div>
          <div className="p-5 rounded-3" style={{ backgroundColor: '#F2F4F6' }}>
            <div className="row mb-2">
              <div className="col-sm-4">
                <span className="mb-0">Trạng thái chung</span>
              </div>
              <div className="col-sm-8">
                <Badge
                  className="site-badge-count-109"
                  count={statusWorker(workerDataDetail?.recruitment_status_id)?.label}
                  style={{
                    backgroundColor: statusWorker(workerDataDetail?.recruitment_status_id)?.bgColor,
                    color: statusWorker(workerDataDetail?.recruitment_status_id)?.textColor,
                  }}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4">
                <span className="mb-0">Xác thực hồ sơ</span>
              </div>
              <div className="col-sm-8">
                <span className="mb-0">
                  {workerDataDetail?.doc_verification_status === 'NOT_VERIFY' ? (
                    'Chưa xác thực'
                  ) : (
                    <div className="d-flex alight-items-center">
                      <span className="material-symbols-outlined fs-2 text-success">task_alt</span>
                      <span className="ps-1">Đã xác thực</span>
                    </div>
                  )}
                </span>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4">
                <span className="mb-0">Loại tài khoản</span>
              </div>
              <div className="col-sm-8">
                <span className="mb-0">
                  <div>
                    {workerDataDetail?.worker_status === 'OLD' ? (
                      <span>Cũ</span>
                    ) : (
                      <span className="text-primary">Mới</span>
                    )}
                  </div>
                </span>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4">
                <span className="mb-0">Trạng thái tài khoản</span>
              </div>
              <div className="col-sm-8">
                <span className="mb-0">
                  {
                    <TableTagCell
                      className="py-1 px-5 rounded-pill fs-6"
                      color={getWorkerStatus(workerDataDetail?.status)?.color}
                    >
                      {getWorkerStatus(workerDataDetail?.status)?.status}
                    </TableTagCell>
                  }
                </span>
                <SettingOutlined
                  className="cursor-pointer ps-2 fs-3"
                  onClick={() => setVisibleModalAccountStatus(true)}
                  rev="SettingOutlined"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="row">
              <div className="col-6">
                <div className="row mb-2">
                  <div className="col-5">
                    <span className="mb-0">Người quản lý</span>
                  </div>
                  <div className="col-7">
                    <div
                      className="d-flex items-center gap-3"
                      style={{ alignItems: 'flex-start', display: 'flex' }}
                    >
                      {workerDataDetail?.manager_id ? (
                        <>
                          <Avatar
                            src={workerDataDetail?.manager?.avatar || defaultAvatar}
                            style={{ flexShrink: 0 }}
                          />
                          <div style={{ flexGrow: 1, width: '120px' }}>
                            {workerDataDetail?.manager?.name}
                          </div>
                        </>
                      ) : (
                        <p>Không xác định</p>
                      )}
                      <SettingOutlined
                        className="cursor-pointer pe-2 mt-2"
                        style={{
                          flex: 1,
                        }}
                        onClick={() => setIsVisibleLeaderModal(true)}
                        rev="SettingOutlined"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-5">
                    <span className="mb-0">Người tạo</span>
                  </div>
                  <div className="col-7">
                    {workerDataDetail?.creator_id ? (
                      <div className="d-flex">
                        <Avatar
                          src={workerDataDetail?.creator.avatar || defaultAvatar}
                          style={{ flexShrink: 0 }}
                        />
                        <div className="ps-2">{workerDataDetail?.creator.name}</div>
                      </div>
                    ) : (
                      'Không xác định'
                    )}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-5">
                    <span className="mb-0">Reset mật khẩu</span>
                  </div>
                  <div className="col-7">
                    <Button className="me-3 rounded-pill py-1 px-6" variant="light">
                      reset
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row mb-2">
                  <div className="col-6">
                    <span className="mb-0">Ngày tiếp nhận</span>
                  </div>
                  <div className="col-6">
                    <span className="mb-0">{getClientDate(workerDataDetail?.created_at)}</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <span className="mb-0">Ngày tạo</span>
                  </div>
                  <div className="col-6">
                    <span className="mb-0">{getClientDate(workerDataDetail?.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <span className="text-primary">Thông tin tổng quan</span>
          </div>

          <div className="w-100 d-flex justify-content-center py-3">
            <Image
              src={workerDataDetail?.avatar || defaultAvatar}
              isImageRoundedCircle
              width={120}
              height={120}
            />
          </div>

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            errorClass="ps-4"
            groupClass="row mb-5"
            label={<b>Mã NLĐ</b>}
            labelClass="col-3 mt-3"
            name="code"
            disabled
            required
          />

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            errorClass="ps-4"
            groupClass="row mb-5"
            label={<b>Họ tên đầy đủ </b>}
            labelClass="col-3 mt-3"
            name="full_name"
            required
          />

          <RadioField
            className="col-9"
            control={formMethods.control}
            groupClass="row mb-2"
            label={<b>Giới tính</b>}
            labelClass="col-3"
            name="gender"
            options={[
              { label: 'Nam', value: 'MALE' },
              { label: 'Nữ', value: 'FEMALE' },
            ]}
            required
          />

          <InputDateField
            classNameInputHint="col-9"
            className="w-100"
            control={formMethods.control}
            disabledDate={disabledDate}
            format={DateTimeFormat.fe_date}
            formatValue={DateTimeFormat.be_date}
            groupClass="row mb-7"
            label={<b>Ngày sinh</b>}
            labelClass="col-3 mt-3"
            name="birthday"
            placeholder="DD/MM/YYYY"
            required
          />

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>Số điện thoại</b>}
            labelClass="col-3 mt-3"
            name="phone"
            pattern={`${PHONE_RULE_REGEX_NULLABLE}`}
            type="tel"
            required
          />

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>Email</b>}
            labelClass="col-3 mt-3"
            name="email"
            placeholder="Nhập email"
            type="email"
          />

          <div className="row mb-5">
            <div className="col-3 mt-3">
              <Form.Label>
                <b>Địa chỉ</b>
                <span className="text-danger"> *</span>
              </Form.Label>
            </div>
            <div className="col-9">
              <div className="row">
                <SelectProvince
                  control={formMethods.control}
                  getOptionValue={(option) => option.code}
                  groupClass="col-4 p-0 pe-3"
                  name="province_code"
                  onChange={() => formMethods.resetField('district_code')}
                  placeholder="Tỉnh thành"
                  required
                />

                <SelectDistrict
                  key={`provinceValue${watchProvinceId}`}
                  control={formMethods.control}
                  getOptionValue={(option) => option.code}
                  groupClass="col-4 p-0 pe-3"
                  name="district_code"
                  onChange={() => formMethods.resetField('ward_code')}
                  placeholder="Quận huyện"
                  provinceCode={watchProvinceId}
                  required
                />

                <SelectWard
                  key={`districtValue${watchDistrictId}`}
                  control={formMethods.control}
                  districtCode={watchDistrictId}
                  getOptionValue={(option) => option.code}
                  groupClass="col-4 p-0 pe-3"
                  name="ward_code"
                  placeholder="Phường xã"
                  required
                />
              </div>
              <div className="row">
                <InputField
                  control={formMethods.control}
                  groupClass="mt-5 p-0"
                  name="full_address"
                  placeholder="Địa chỉ chi tiết"
                  required
                />
              </div>
            </div>
          </div>

          <SelectAcademic
            classNameInputHint="col-9"
            control={formMethods.control}
            getOptionValue={(option) => String(option.id)}
            groupClass="row mb-5"
            label={<b>Trình độ</b>}
            labelClass="col-3 mt-3"
            name="degree_id"
            required
          />

          <InputField
            allowClear={false}
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>Kinh nghiệm</b>}
            labelClass="col-3 mt-3"
            name="num_experience"
            suffix={<span className="text-muted">Năm</span>}
            type="number"
            required
          />

          <div className="row mb-5">
            <div className="col-3">
              <Form.Label>
                <b>CV</b>
              </Form.Label>
            </div>
            <div className="col-9 text-primary">
              <UploadField control={formMethods.control} name="cv_link" type="file" hideRemoveAll />
            </div>
          </div>

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>CCCD</b>}
            labelClass="col-3 mt-3"
            name="id_number"
            placeholder="Nhập căn cước công dân"
          />

          <div className="row mb-5">
            <div className="col-3"> </div>
            <div className="col-9">
              <div className="row">
                <div className="col-12">
                  <UploadField
                    accept={{ 'image/*': [] }}
                    control={formMethods.control}
                    groupClass="mb-7"
                    label={<b>Mặt trước</b>}
                    name="front_id_card_image_link"
                    type="avatar"
                    imageClassName={'w-250px h-150px'}
                  />
                </div>
                <div className="col-12">
                  <UploadField
                    accept={{ 'image/*': [] }}
                    control={formMethods.control}
                    groupClass="mb-7"
                    label={<b>Mặt sau</b>}
                    name="back_id_card_image_link"
                    type="avatar"
                    imageClassName={'w-250px h-150px'}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-3 mt-3">
              <Form.Label>
                <b>Tài khoản ngân hàng</b>
                <span className="text-danger"> *</span>
              </Form.Label>
            </div>
            <div className="col-9">
              <div className="row">
                <InputField
                  control={formMethods.control}
                  groupClass="row mb-5"
                  name="bank_name"
                  disabled
                  required
                />

                <InputField
                  control={formMethods.control}
                  groupClass="row mb-5"
                  name="bank_owner_account_name"
                  disabled
                  required
                />
                <InputField
                  control={formMethods.control}
                  groupClass="row mb-5"
                  name="bank_owner_account_number"
                  disabled
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-end">
          <div className="d-flex justify-content-end">
            <Button
              className="me-3 rounded-pill py-1 px-6"
              onClick={() => history.push(`list`)}
              variant=""
            >
              Quay lại
            </Button>

            {qlnldCapNhat && (
              <Button
                className="rounded-pill py-1 px-6"
                isLoading={isSubmit}
                type="submit"
                variant="primary"
              >
                Cập nhật
              </Button>
            )}
          </div>
        </div>
      </div>
      {isVisibleFormModal && (
        <ChangePasswordModal
          onHide={() => {
            setIsVisibleFormModal(false);
          }}
          onSaved={handleSaved}
          show={isVisibleFormModal}
        />
      )}
      {isVisibleLeaderModal && workerDataDetail && (
        <LeaderModal
          workerDetail={workerDataDetail}
          workerId={workerDataDetail.id}
          onHide={() => setIsVisibleLeaderModal(false)}
          formMethods={formMethodsWorker}
          show={isVisibleLeaderModal}
        />
      )}

      {visibleModalAccountStatus && (
        <AccountStatusModal
          formMethods={formMethods}
          show={visibleModalAccountStatus}
          onHide={() => {
            setVisibleModalAccountStatus(false);
          }}
          customerId={id}
        />
      )}
    </>
  );
};

export { WorkerDetailStep1 };
