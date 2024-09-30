import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Moment } from 'moment';
import { FC, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { SelectAcademic } from '@/components/molecules/SelectAcademic';
import { SelectCareer } from '@/components/molecules/SelectCareer';
import { SelectCustomer } from '@/components/molecules/SelectCustomer';
import { SelectDegree } from '@/components/molecules/SelectDegree';
import { SelectOtherRequirements } from '@/components/molecules/SelectOtherRequirements';
import { SelectVacancies } from '@/components/molecules/SelectVacancies';
import { Modal } from '@/components/organisms/Modal';
import { DateTimeFormat } from '@/constants';
import { useCreateRecruitment } from '@/modules/recruitment-plan/hooks/useCreateRecruitment';
import { FormRecruitmentPlanModel } from '@/modules/recruitment-plan/models';
import { getRecruitmentFormSchema } from '@/modules/recruitment-plan/services/validation';

interface IProps {
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const defaultValues: FormRecruitmentPlanModel = {
  gender_percentage: {
    female: 50,
    male: 50,
  },
};

const RecruitmentModal: FC<IProps> = ({ show, onHide, onSaved }) => {
  const { mutateAsync: createRecruitment } = useCreateRecruitment();

  const resolver = yupResolver(getRecruitmentFormSchema());
  const formMethods = useForm<FormRecruitmentPlanModel>({
    defaultValues,
    resolver,
  });
  const { mutateAsync } = useMutation(createRecruitment);
  const onSubmit: SubmitHandler<FormRecruitmentPlanModel> = async (formData) => {
    const res = await mutateAsync(formData);
    if (!res) return;
    onSaved?.();
    formMethods.reset();
  };

  function handleHide() {
    onHide?.();
    formMethods.reset();
  }

  const male = formMethods.watch('gender_percentage.male');
  const female = formMethods.watch('gender_percentage.female');

  useEffect(() => {
    if (male < 0 || male > 100) return;
    formMethods.setValue('gender_percentage.female', 100 - male);
  }, [male]);
  useEffect(() => {
    if (female < 0 || female > 100) return;
    formMethods.setValue('gender_percentage.male', 100 - female);
  }, [female]);

  const startDate = formMethods.watch('start_date');
  const handleEndDateChange = (date: string | undefined) => {
    if (date) {
      // Cập nhật giá trị của start_date khi end_date thay đổi
      formMethods.setValue('start_date', date);
    }
  };

  return (
    <Modal
      bodyClassName="scroll-y"
      dialogClassName="mw-1000px"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="fw-bolder w-100 text-center">Tạo chính dịch mới</h3>}
      centered
    >
      <FormField className="form w-100" methods={formMethods} onSubmit={onSubmit}>
        <h4 className="mb-4">Thông tin tổng quan</h4>
        <div className="ps-3">
          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            groupClass="row mb-5"
            label={<b>Tên chiến dịch tuyển dụng</b>}
            labelClass="col-3 mt-3"
            maxLength={300}
            name="name"
            placeholder="Nhập tên chiến dịch tuyển dụng"
            rows={2}
            type="textarea"
            required
          />

          <SelectCustomer
            classNameInputHint="col-9"
            control={formMethods.control}
            getOptionValue={(option) => option.id || ''}
            groupClass="row mb-5"
            label={<b>Thông tin khách hàng</b>}
            labelClass="col-3 mt-3"
            name="customer_id"
            placeholder="Chọn khách hàng cho chiến dịch tuyển dụng này"
            required
          />

          <div className="row">
            <div className="col-3 mt-3 d-flex flex-column">
              <b>
                Thời gian triển khai chiến dịch <span className="text-danger"> *</span>
              </b>
            </div>
            <div className="col-6 p-0">
              <div className="row">
                <InputDateField
                  control={formMethods.control}
                  format={DateTimeFormat.fe_date}
                  formatValue={DateTimeFormat.be_date}
                  groupClass="col-4 mb-7"
                  name="start_date"
                  onChange={(date) => {
                    handleEndDateChange(date);
                  }}
                  placeholder="dd/MM/YYYY"
                />
                <h6 className="col-1 mt-3 ps-2">Đến</h6>
                <InputDateField
                  control={formMethods.control}
                  disabledDate={(current: Moment | null) => {
                    // Logic disabledDate cho start_date
                    if (startDate && current) {
                      return current.isBefore(startDate, 'day');
                    }

                    return false;
                  }}
                  format={DateTimeFormat.fe_date}
                  formatValue={DateTimeFormat.be_date}
                  groupClass="col-4 mb-7"
                  name="end_date"
                  placeholder="dd/MM/YYYY"
                />
              </div>
            </div>
          </div>
        </div>

        <h4 className="mb-4">Thông tin tuyển dụng</h4>
        <div className="ps-3">
          <div className="row">
            <div className="col-6">
              <SelectCareer
                control={formMethods.control}
                getOptionValue={(option) => String(option.id)}
                groupClass="mb-5"
                label={<b>Ngành nghề</b>}
                name="career_id"
                placeholder="---Chọn ngành nghề---"
                required
              />
              <InputField
                allowClear={false}
                control={formMethods.control}
                groupClass="mb-5"
                label={<b>Số lượng tuyển</b>}
                name="quantity"
                placeholder="---Nhập số lượng cần tuyển---"
                type="number"
                required
              />

              <div className="row">
                <div className="col-12 mb-3">
                  <Form.Label style={{ fontWeight: 'bold' }}>
                    Độ tuổi <span className="text-danger"> *</span>
                  </Form.Label>
                </div>
                <div className="col-12 p-0">
                  <div className="row ps-3">
                    <InputField
                      allowClear={false}
                      control={formMethods.control}
                      groupClass="col-3 mb-5"
                      max={100}
                      min={0}
                      name="age_range_min"
                      type="number"
                      required
                    />
                    <h6 className="col-1 mt-3">Đến</h6>
                    <InputField
                      allowClear={false}
                      control={formMethods.control}
                      groupClass="col-3 mb-5"
                      max={100}
                      min={0}
                      name="age_range_max"
                      type="number"
                      required
                    />
                  </div>
                </div>
              </div>

              <SelectAcademic
                control={formMethods.control}
                getOptionValue={(option) => String(option.id)}
                groupClass="mb-5"
                label={<b>Trình độ học vấn</b>}
                name="academic_level_id"
                placeholder="---Chọn trình độ học vấn---"
                required
              />

              <InputField
                allowClear={false}
                control={formMethods.control}
                groupClass="mb-5"
                label={<b>Kinh nghiệm làm việc</b>}
                name="experience"
                placeholder="---Nhập kinh nghiệm làm việc tối thiểu---"
                suffix={<span className="text-muted">Năm</span>}
                type="number"
                required
              />
            </div>
            <div className="col-6">
              <SelectVacancies
                control={formMethods.control}
                getOptionValue={(option) => option.id || ''}
                groupClass="mb-5"
                label={<b>Vị trí tuyển dụng</b>}
                name="position_id"
                placeholder="---Chọn vị trí tuyển dụng---"
                required
              />
              <InputField
                allowClear={false}
                control={formMethods.control}
                groupClass="mb-5"
                label={<b>Mức lương</b>}
                name="salary"
                placeholder="---Nhập mức lương---"
                suffix={<span className="text-muted">VNĐ</span>}
                type="number"
                required
              />
              <div className="row">
                <div className="col-12 mb-3">
                  <b>
                    Tỷ lệ nam nữ <span className="text-danger"> *</span>
                  </b>
                </div>
                <div className="col-12 p-0">
                  <div className="row ps-3">
                    <InputField
                      allowClear={false}
                      classNameInputHint="col-6"
                      control={formMethods.control}
                      groupClass="row col-5 mb-5"
                      label={<b>Nam</b>}
                      labelClass="col-4 mt-3"
                      max={100}
                      min={0}
                      name="gender_percentage.male"
                      suffix={<span className="text-muted">%</span>}
                      type="number"
                      required
                    />
                    <InputField
                      allowClear={false}
                      classNameInputHint="col-6"
                      control={formMethods.control}
                      groupClass="row col-5 mb-5"
                      label={<b>Nữ</b>}
                      labelClass="col-4 mt-3"
                      max={100}
                      min={0}
                      name="gender_percentage.female"
                      suffix={<span className="text-muted">%</span>}
                      type="number"
                      required
                    />
                  </div>
                </div>
              </div>
              <SelectDegree
                control={formMethods.control}
                getOptionValue={(option) => option.id || ''}
                groupClass="mb-5"
                label={<b>Bằng cấp</b>}
                name="degree_id"
                placeholder="---Chọn bằng cấp---"
                required
              />
              <SelectOtherRequirements
                control={formMethods.control}
                getOptionValue={(option) => option.id || ''}
                groupClass="mb-5"
                label={<b>Yêu cầu khác</b>}
                name="other_requirement_id"
                placeholder="---Chọn yêu cầu khác---"
                clearable
              />
            </div>
          </div>
        </div>

        <div className="text-center pt-10">
          <Button className="rounded-pill py-2" type="submit" variant="primary">
            Tạo chiến dịch
          </Button>
        </div>
      </FormField>
    </Modal>
  );
};

export { RecruitmentModal };
