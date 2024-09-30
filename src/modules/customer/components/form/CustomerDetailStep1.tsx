/* eslint-disable react/jsx-sort-props */
/* eslint-disable simple-import-sort/imports */
import { FC, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { InputField } from '@/components/molecules/InputField';
import { InputShiftWorkFieldArray } from '@/components/molecules/InputShiftWorkFieldArray';
import { SelectDistrict } from '@/components/molecules/SelectDistrict';
import { SelectProvince } from '@/components/molecules/SelectProvince';
import { SelectWard } from '@/components/molecules/SelectWard';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { UploadField } from '@/components/molecules/UploadField';
import { PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { CustomerRole, CustomerStatus, FormCustomerModel } from '@/modules/customer/models';
import { ChangePasswordModal } from '@/modules/hr-management/components/form/ChangePasswordModal';
import { history, trans } from '@/utils';
import { SettingOutlined } from '@ant-design/icons';
import { StatusModal } from '@/modules/customer/components/form/StatusModal';
import { useParams } from 'react-router-dom';
import { Avatar } from 'antd';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { getRoleEmployee } from '@/roles';

interface IProps {
  formMethods: UseFormReturn<FormCustomerModel, object>;
  customerDetail?: FormCustomerModel;
  readonly isSubmit?: boolean;
}

const CustomerDetailStep1: FC<IProps> = ({ formMethods, isSubmit, customerDetail }) => {
  const { id } = useParams();

  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const [visibleModalStatus, setVisibleModalStatus] = useState(false);

  const watchProvinceId = formMethods.watch('province_id');
  const watchDistrictId = formMethods.watch('district_id');

  const watchStatus = formMethods.watch('status');
  const watchTaxCode = formMethods.watch('tax_code');

  function handleSaved() {
    setIsVisibleFormModal(false);
  }
  const qlkhCapNhat = getRoleEmployee(CustomerRole.qlkh_cap_nhat);

  return (
    <>
      <div className="row card-body">
        <div className="mb-6 row">
          <div
            className="col-4"
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: '.5rem',
            }}
          >
            <span className="text-primary me-4">Trạng thái hoạt động</span>
            <TableTagCell
              className="py-1 px-5 rounded-pill fs-6"
              color={watchStatus === CustomerStatus.active ? 'success' : 'secondary'}
            >
              {watchStatus === CustomerStatus.active ? 'Đang hoạt động' : 'Dừng hoạt động'}
            </TableTagCell>

            <SettingOutlined
              disabled={qlkhCapNhat}
              className="cursor-pointer pe-2"
              onClick={() => setVisibleModalStatus(true)}
              rev="SettingOutlined"
            />
          </div>
          <div
            className="col-4 me-4"
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: '.5rem',
            }}
          >
            <span>Người tạo: </span>
            {customerDetail?.creator?.name ? (
              <div className="d-flex items-center gap-3">
                <Avatar
                  src={customerDetail?.creator?.avatar || defaultAvatar}
                  style={{ flexShrink: 0 }}
                />
                <div style={{ flexGrow: 1 }} className="mt-1">
                  {customerDetail?.creator?.name}
                </div>
              </div>
            ) : (
              <span>Không xác định</span>
            )}
          </div>
        </div>
        <div className="col-8">
          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>Tên khách hàng</b>}
            labelClass="col-3 mt-3"
            name="name"
            required
            disabled={qlkhCapNhat}
          />

          <div className="row mb-3">
            <b className="col-3">Mã số thuế</b>
            <h4 className="col-9 align-self-end">{watchTaxCode}</h4>
          </div>

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
            disabled={qlkhCapNhat}
          />

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>Email</b>}
            labelClass="col-3 mt-3"
            name="email"
            type="email"
            required
            disabled={qlkhCapNhat}
          />

          <div className="row mb-6">
            <div className="col-3 mt-3">
              <b>Địa chỉ</b>
              <span className="text-danger"> *</span>
            </div>
            <div className="col-9">
              <div className="row">
                <SelectProvince
                  control={formMethods.control}
                  getOptionValue={(option) => option.code}
                  groupClass="col-4 p-0 pe-3"
                  name="province_id"
                  onChange={() => formMethods.resetField('district_id')}
                  placeholder="Tỉnh thành"
                  required
                  disabled={qlkhCapNhat}
                />

                <SelectDistrict
                  key={`provinceValue${watchProvinceId}`}
                  control={formMethods.control}
                  getOptionValue={(option) => option.code}
                  groupClass="col-4 p-0 pe-3"
                  name="district_id"
                  onChange={() => formMethods.resetField('ward_id')}
                  placeholder="Quận huyện"
                  provinceCode={watchProvinceId}
                  required
                  disabled={qlkhCapNhat}
                />

                <SelectWard
                  key={`districtValue${watchDistrictId}`}
                  control={formMethods.control}
                  districtCode={watchDistrictId}
                  getOptionValue={(option) => option.code}
                  groupClass="col-4 p-0"
                  name="ward_id"
                  placeholder="Phường xã"
                  required
                  disabled={qlkhCapNhat}
                />
              </div>
              <div className="row">
                <InputField
                  control={formMethods.control}
                  groupClass="mt-4 p-0"
                  name="address"
                  placeholder="Địa chỉ chi tiết"
                  required
                  disabled={qlkhCapNhat}
                />
              </div>
            </div>
          </div>

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row"
            label={<b>Mô tả về công ty</b>}
            labelClass="col-3"
            maxLength={500}
            name="description"
            style={{ height: 120 }}
            type="textarea"
            required
            showCount
            disabled={qlkhCapNhat}
          />

          <div>
            <h3 className="mt-8">Thông tin công việc</h3>
          </div>

          <InputShiftWorkFieldArray
            disabled={qlkhCapNhat}
            formMethods={formMethods}
            groupClass="col-12"
          />
        </div>
        <div className="col-4 h-100 d-flex flex-column justify-content-center align-items-center px-5">
          {/* <div
            className="col-12 me-4"
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: '.5rem',
            }}
          >
            <span>Người tạo: </span>
            {customerDetail?.creator?.name ? (
              <div className="d-flex items-center gap-3">
                <Avatar
                  src={customerDetail?.creator?.avatar || defaultAvatar}
                  style={{ flexShrink: 0 }}
                />
                <div style={{ flexGrow: 1 }} className="mt-1">
                  {customerDetail?.creator?.name}
                </div>
              </div>
            ) : (
              <span>Không xác định</span>
            )}
          </div> */}
          <UploadField
            accept={{ 'image/*': [] }}
            control={formMethods.control}
            groupClass="mb-7"
            label={<b>Logo công ty</b>}
            labelClass="w-100 text-center mb-8"
            name="avatar"
            type="avatar"
            isCircleAvatar
            isOutlineAvatar
            disabled={qlkhCapNhat}
          />
        </div>
        <div className="col-12 d-flex justify-content-end">
          {qlkhCapNhat && (
            <div className="d-flex justify-content-end">
              <Button
                className="me-3 rounded-pill py-1 px-6"
                onClick={() => history.push(`list`)}
                variant="light"
              >
                {trans('GENERAL.ACTION.CANCEL')}
              </Button>

              <Button
                className="rounded-pill py-1 px-6"
                isLoading={isSubmit}
                type="submit"
                variant="primary"
              >
                Cập nhật
              </Button>
            </div>
          )}
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

      {visibleModalStatus && customerDetail && id && (
        <StatusModal
          formMethods={formMethods}
          show={visibleModalStatus}
          onHide={() => {
            setVisibleModalStatus(false);
          }}
          customerId={id}
        />
      )}
    </>
  );
};

export { CustomerDetailStep1 };
