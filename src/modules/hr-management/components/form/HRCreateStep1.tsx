import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { RadioField } from '@/components/molecules/RadioField';
import { UploadField } from '@/components/molecules/UploadField';
import { DateTimeFormat, PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { FormHRModel } from '@/modules/hr-management/models';
import { disabledDateBirthday, transCFL } from '@/utils';

interface IProps {
  formMethods: UseFormReturn<FormHRModel, object>;
  readonly isHideAvatar?: boolean;
  readonly isHideMail?: boolean;
}

const HRCreateStep1: FC<IProps> = ({ formMethods, isHideAvatar, isHideMail }) => {
  return (
    <div className="row card-body">
      <div className={isHideAvatar ? 'col-12' : 'col-6'}>
        <InputField
          classNameInputHint="col-9"
          control={formMethods.control}
          errorClass="ps-4"
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
          errorClass="ps-4"
          groupClass="row mb-5"
          label={<b>{transCFL('VALIDATION.FIELD.HR.PHONE_NUMBER')}</b>}
          labelClass="col-3 mt-3"
          name="phone"
          pattern={`${PHONE_RULE_REGEX_NULLABLE}`}
          placeholder="Nhập số điện thoại"
          type="tel"
          required
        />

        {!isHideMail && (
          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            errorClass="ps-4"
            groupClass="row mb-5"
            label={<b>{transCFL('VALIDATION.FIELD.HR.EMAIL')}</b>}
            labelClass="col-3 mt-3"
            name="email"
            placeholder="Nhập email"
            type="email"
            required
          />
        )}

        <InputDateField
          className="w-100"
          classNameInputHint="col-9"
          control={formMethods.control}
          disabledDate={disabledDateBirthday}
          format={DateTimeFormat.fe_date}
          formatValue={DateTimeFormat.be_date}
          groupClass="row mb-7"
          label={<b>{transCFL('VALIDATION.FIELD.HR.DATE_OF_BIRTH')}</b>}
          labelClass="col-3 mt-3"
          name="birthday"
          placeholder="DD/MM/YYYY"
        />
      </div>
      {!isHideAvatar && (
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
      )}
    </div>
  );
};

export { HRCreateStep1 };
