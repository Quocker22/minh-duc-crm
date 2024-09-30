/* eslint-disable lines-around-comment */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { InputField } from '@/components/molecules/InputField';
import { RadioField } from '@/components/molecules/RadioField';
import { DateTimeFormat, PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { FormWorkerModel } from '@/modules/worker/models';
import { InputDateField } from '@/components/molecules/InputDateField';
import { disabledDateBirthday } from '@/utils';

interface IProps {
  formMethods: UseFormReturn<FormWorkerModel, object>;
}

const FormCreateWorker: FC<IProps> = ({ formMethods }) => {
  return (
    <>
      <InputField
        classNameInputHint="col-9"
        control={formMethods.control}
        groupClass="row mb-5"
        label={<b>Họ tên đầy đủ</b>}
        labelClass="col-3 mt-3"
        name="full_name"
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
        required
      />

      <InputField
        classNameInputHint="col-9"
        control={formMethods.control}
        errorClass="ps-4"
        groupClass="row mb-5"
        label={<b>Số điện thoại</b>}
        labelClass="col-3 mt-3"
        name="phone"
        pattern={`${PHONE_RULE_REGEX_NULLABLE}`}
        placeholder="Nhập số điện thoại"
        type="tel"
        required
      />
      <InputDateField
        classNameInputHint="col-9"
        className="w-100"
        control={formMethods.control}
        groupClass="row mb-5"
        label={<b>Ngày sinh</b>}
        labelClass="col-3 mt-3"
        disabledDate={disabledDateBirthday}
        name="birthday"
        placeholder="DD/MM/YYYY"
        format={DateTimeFormat.fe_date}
        formatValue={DateTimeFormat.be_date}
        required
      />

      <InputField
        classNameInputHint="col-9"
        control={formMethods.control}
        groupClass="row mb-5"
        label={<b>Mật khẩu</b>}
        labelClass="col-3 mt-3"
        name="password"
        placeholder="Nhập mật khẩu"
        required
      />
    </>
  );
};

export { FormCreateWorker };
