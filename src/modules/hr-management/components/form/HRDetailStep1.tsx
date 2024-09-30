/* eslint-disable simple-import-sort/imports */
import clsx from 'clsx';
import moment, { Moment } from 'moment';
import { FC, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { RadioField } from '@/components/molecules/RadioField';
import { UploadField } from '@/components/molecules/UploadField';
import { DateTimeFormat, PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { ChangePasswordModal } from '@/modules/hr-management/components/form/ChangePasswordModal';
import { FormHRModel, HRStatus } from '@/modules/hr-management/models';
import { checkRoleSystem, transCFL } from '@/utils';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { SettingOutlined } from '@ant-design/icons';
import { HRStatusModal } from '@/modules/hr-management/components/HRStatusModal';
import { useParams } from 'react-router-dom';
import { useReSendPassword } from '@/modules/hr-management/hooks/useReSendPassword';
import { Popconfirm } from 'antd';

interface IProps {
  formMethods: UseFormReturn<FormHRModel, object>;
}

const HRDetailStep1: FC<IProps> = ({ formMethods }) => {
  const { id } = useParams();
  const [visibleModalStatus, setVisibleModalStatus] = useState(false);
  const { currentUser } = useAuth();
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const { mutateAsync: resendPassword } = useReSendPassword();

  function handleSaved() {
    setIsVisibleFormModal(false);
  }

  const disabledDate = (currentDate: Moment) => {
    return currentDate && currentDate >= moment().startOf('day');
  };

  const handleReSendPassword = async () => {
    await resendPassword(id || '');
  };

  const roleSystem = checkRoleSystem(currentUser?.account_type, formMethods.watch('account_type'));

  return (
    <>
      <div className="row card-body">
        <div className="mb-6 d-flex items-center gap-2">
          <div className="text-primary">Trạng thái hoạt động</div>

          <TableTagCell
            className="py-1 px-5 rounded-pill fs-6 ml-4"
            color={formMethods.getValues('status') === HRStatus.active ? 'success' : 'secondary'}
          >
            {formMethods.getValues('status') === HRStatus.active
              ? 'Đang hoạt động'
              : 'Dừng hoạt động'}
          </TableTagCell>
          {roleSystem && (
            <SettingOutlined
              className="cursor-pointer ps-2 mt-1 fs-3"
              onClick={() => setVisibleModalStatus(true)}
              rev="SettingOutlined"
            />
          )}
        </div>
        <span className="text-primary mb-6">Thông tin định danh</span>
        <div className="col-6">
          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>{transCFL('VALIDATION.FIELD.HR.FULL_NAME')}</b>}
            labelClass="col-3 mt-3"
            name="name"
            placeholder="Nhập họ tên đầy đủ"
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
          />

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>{transCFL('VALIDATION.FIELD.HR.PHONE_NUMBER')}</b>}
            labelClass="col-3 mt-3"
            name="phone"
            pattern={`${PHONE_RULE_REGEX_NULLABLE}`}
            placeholder="Nhập số điện thoại"
            type="tel"
            required
          />

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>{transCFL('VALIDATION.FIELD.HR.EMAIL')}</b>}
            labelClass="col-3 mt-3"
            name="email"
            placeholder="Nhập email"
            type="email"
          />

          <InputDateField
            className="w-100"
            classNameInputHint="col-9"
            control={formMethods.control}
            disabledDate={disabledDate}
            format={DateTimeFormat.fe_date}
            formatValue={DateTimeFormat.be_date}
            groupClass="row mb-5"
            label={<b>{transCFL('VALIDATION.FIELD.HR.DATE_OF_BIRTH')}</b>}
            labelClass="col-3 mt-3"
            name="birthday"
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="col-6 h-100 d-flex justify-content-center align-items-center">
          <UploadField
            accept={{ 'image/*': [] }}
            control={formMethods.control}
            groupClass="mb-7"
            label={transCFL('VALIDATION.FIELD.HR.AVATAR')}
            labelClass="w-100 text-center mb-8"
            name="avatar"
            type="avatar"
            isCircleAvatar
            isOutlineAvatar
          />
        </div>
        <div className="col-12 d-flex justify-content-between">
          {/* tài khoản login vào xem lại chính nó */}
          {currentUser?.phone === formMethods.getValues('phone') && (
            <Button
              className={clsx('rounded-pill')}
              onClick={() => {
                setIsVisibleFormModal(true);
              }}
              variant="outline p-1 px-3 text-primary"
            >
              Đổi mật khẩu
            </Button>
          )}

          {/* tài khoản OWNER xem Admin và Member */}
          {(currentUser?.account_type === 'OWNER' || currentUser?.account_type === 'ADMIN') &&
          currentUser?.phone !== formMethods.getValues('phone') ? (
            <div>
              <span className="text-primary me-5">Gửi lại mật khẩu vào email</span>
              <Popconfirm
                cancelText="Thoát"
                okButtonProps={{ danger: true }}
                okText="Gửi lại"
                onConfirm={handleReSendPassword}
                title="bạn có chắc chắn muốn gửi lại mật khẩu vào mail"
              >
                <Button className="me-3 rounded-pill py-1 px-6" variant="outline">
                  Gửi lại
                </Button>
              </Popconfirm>
            </div>
          ) : (
            <div> </div>
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
      {visibleModalStatus && (
        <HRStatusModal
          formMethods={formMethods}
          onHide={() => {
            setVisibleModalStatus(false);
          }}
          show={visibleModalStatus}
        />
      )}
    </>
  );
};

export { HRDetailStep1 };
