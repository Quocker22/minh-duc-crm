import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { InputField } from '@/components/molecules/InputField';
import { InputShiftWorkFieldArray } from '@/components/molecules/InputShiftWorkFieldArray';
import { SelectDistrict } from '@/components/molecules/SelectDistrict';
import { SelectEmployee } from '@/components/molecules/SelectEmployee';
import { SelectProvince } from '@/components/molecules/SelectProvince';
import { SelectWard } from '@/components/molecules/SelectWard';
import { UploadField } from '@/components/molecules/UploadField';
import { Modal } from '@/components/organisms/Modal';
import { PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { FileUploadModel } from '@/models';
import { useCreateCustomer } from '@/modules/customer/hooks/useCreateCustomer';
import { CustomerStatus, FormCustomerModel } from '@/modules/customer/models';
import { getCustomerFormSchema } from '@/modules/customer/services/validation';

interface IProps {
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const defaultValues: FormCustomerModel = {
  address: '',
  avatar: '',
  description: '',
  email: '',
  name: '',
  phone: '',
  shift_work: [{ end_time: '17:30', start_time: '08:00' }],
  status: CustomerStatus.active,
  tax_code: '',
};

const CustomerModal: FC<IProps> = ({ show, onHide, onSaved }) => {
  const { mutateAsync: createCustomer } = useCreateCustomer();

  const resolver = yupResolver(getCustomerFormSchema());
  const formMethods = useForm<FormCustomerModel>({ defaultValues, resolver });
  const { mutateAsync } = useMutation(createCustomer);
  const onSubmit: SubmitHandler<FormCustomerModel> = async (formData) => {
    const avatar = formData.avatar as FileUploadModel;
    const res = await mutateAsync({
      ...formData,
      avatar: avatar.url,
    });
    if (!res) return;
    onSaved?.();
    formMethods.reset();
  };

  const watchProvinceId = formMethods.watch('province_id');
  const watchDistrictId = formMethods.watch('district_id');

  function handleHide() {
    onHide?.();
    formMethods.reset();
  }

  return (
    <Modal
      backdrop="static"
      bodyClassName="scroll-y"
      dialogClassName="mw-1000px"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="fw-bolder w-100 text-center">Tạo khách hàng mới</h3>}
      centered
    >
      <FormField className="form w-100" methods={formMethods} onSubmit={onSubmit}>
        <InputField
          classNameInputHint="col-10"
          control={formMethods.control}
          groupClass="row mb-5"
          label={<b>Tên khách hàng</b>}
          labelClass="col-2 mt-3"
          name="name"
          required
        />

        <InputField
          autoComplete={false}
          classNameInputHint="col-10"
          control={formMethods.control}
          groupClass="row mb-5"
          label={<b>Mã số thuế</b>}
          labelClass="col-2 mt-3"
          name="tax_code"
          required
        />

        <InputField
          classNameInputHint="col-10"
          control={formMethods.control}
          groupClass="row mb-5"
          label={<b>Số điện thoại</b>}
          labelClass="col-2 mt-3"
          name="phone"
          pattern={`${PHONE_RULE_REGEX_NULLABLE}`}
          type="tel"
          required
        />

        <InputField
          classNameInputHint="col-10"
          control={formMethods.control}
          groupClass="row mb-5"
          label={<b>Email</b>}
          labelClass="col-2 mt-3"
          name="email"
          type="email"
          required
        />

        <div className="row mb-5">
          <div className="col-2 mt-3">
            <b>Địa chỉ</b>
          </div>
          <div className="col-10">
            <div className="row">
              <SelectProvince
                control={formMethods.control}
                getOptionValue={(option) => option.code}
                groupClass="col-4 p-0 pe-3"
                name="province_id"
                onChange={() => formMethods.resetField('district_id')}
                placeholder="Tỉnh thành"
                required
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
              />

              <SelectWard
                key={`districtValue${watchDistrictId}`}
                control={formMethods.control}
                districtCode={watchDistrictId}
                getOptionValue={(option) => option.code}
                groupClass="col-4 p-0 pe-3"
                name="ward_id"
                placeholder="Phường xã"
                required
              />
            </div>
            <div className="row">
              <InputField
                control={formMethods.control}
                groupClass="mt-5 p-0"
                name="address"
                placeholder="Địa chỉ chi tiết"
                required
              />
            </div>
          </div>
        </div>

        <SelectEmployee
          classNameInputHint="col-10"
          groupClass="row mb-5"
          label="QL nhà máy"
          labelClass="col-2 mt-3"
          onChange={(newValue: unknown, _) => {
            const a: { value: string } = newValue as { value: string };
            formMethods.setValue('factory_manager', a.value);
          }}
          required
        />

        <div>
          <h3 className="mt-8">Thông tin công việc</h3>
        </div>

        <InputShiftWorkFieldArray formMethods={formMethods} />

        <UploadField
          accept={{ 'image/*': [] }}
          classNameInputHint="col-10"
          control={formMethods.control}
          groupClass="row mb-5"
          label={<b>Logo công ty</b>}
          labelClass="col-2"
          name={'avatar'}
          type="avatar"
          isCircleAvatar
          isOutlineAvatar
        />

        <InputField
          classNameInputHint="col-10"
          control={formMethods.control}
          groupClass="row mb-5"
          label={<b>Mô tả về công ty</b>}
          labelClass="col-2 mt-3"
          maxLength={500}
          name="description"
          style={{ height: 120 }}
          type="textarea"
          required
          showCount
        />

        <div className="text-center pt-10">
          <Button className="rounded-pill py-2" type="submit" variant="primary">
            Tạo khách hàng
          </Button>
        </div>
      </FormField>
    </Modal>
  );
};

export { CustomerModal };
