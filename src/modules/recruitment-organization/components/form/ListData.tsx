import { Moment } from 'moment';
import { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { RecruitmentUpdateHistoryList } from '@/components/molecules/RecruitmentUpdateHistoryList';
import { SelectAcademic } from '@/components/molecules/SelectAcademic';
import { SelectCareer } from '@/components/molecules/SelectCareer';
import { SelectCustomer } from '@/components/molecules/SelectCustomer';
import { SelectDegree } from '@/components/molecules/SelectDegree';
import { SelectOtherRequirements } from '@/components/molecules/SelectOtherRequirements';
import { SelectVacancies } from '@/components/molecules/SelectVacancies';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { DateTimeFormat } from '@/constants';
import { ChangePasswordModal } from '@/modules/hr-management/components/form/ChangePasswordModal';
import { FormRecruitmentPlanModel, RecruitmentPlanModel } from '@/modules/recruitment-plan/models';
import { getRecruitmentStatus } from '@/modules/recruitment-plan/utils';

interface IProps {
  formMethods: UseFormReturn<FormRecruitmentPlanModel, object>;
  readonly isSubmit?: boolean;
  readonly recruitmentDetail?: RecruitmentPlanModel;
}

const ListData: FC<IProps> = ({ formMethods, recruitmentDetail }) => {
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);

  function handleSaved() {
    setIsVisibleFormModal(false);
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
    <>
      <div className="row">
        <div className="col-8">
          <div className="d-flex justify-content-between">
            <h4 className="mb-4">Thông tin tổng quan</h4>
            <div>
              trạng thái
              <TableTagCell
                className=" ms-3 py-2 px-5 rounded-pill fs-6"
                color={getRecruitmentStatus(recruitmentDetail?.status)?.color}
              >
                {getRecruitmentStatus(recruitmentDetail?.status)?.status}
              </TableTagCell>
            </div>
          </div>
          <div className="ps-3 mb-5">
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
                <Form.Label className="fw-bold">
                  Thời gian triển khai chiến dịch <span className="text-danger"> *</span>
                </Form.Label>
              </div>
              <div className="col-6 p-0">
                <div className="row">
                  <InputDateField
                    control={formMethods.control}
                    format={DateTimeFormat.fe_date}
                    formatValue={DateTimeFormat.be_date}
                    groupClass="col-5 mb-7"
                    name="start_date"
                    onChange={(date) => {
                      handleEndDateChange(date);
                    }}
                    placeholder="dd/MM/YYYY"
                  />
                  <h6 className="col-2 mt-3 ps-3">Đến</h6>
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
                    groupClass="col-5 mb-7"
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
                        name="age_range.min"
                        type="number"
                        required
                      />
                      <h6 className="col-2 mt-3">Đến</h6>
                      <InputField
                        allowClear={false}
                        control={formMethods.control}
                        groupClass="col-3 mb-5"
                        max={100}
                        min={0}
                        name="age_range.max"
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
                    <Form.Label className="fw-bold">
                      Tỷ lệ nam nữ <span className="text-danger"> *</span>
                    </Form.Label>
                  </div>
                  <div className="col-12 p-0">
                    <div className="row ps-3">
                      <InputField
                        allowClear={false}
                        classNameInputHint="col-6"
                        control={formMethods.control}
                        groupClass="row col-5 mb-5"
                        label={<b>Nam</b>}
                        labelClass="col-6 mt-3"
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
                        labelClass="col-5 mt-3"
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
          <div className="pt-5 w-100 text-end">
            <Button className="rounded-pill py-2" type="submit" variant="primary">
              Cập nhật
            </Button>
          </div>
        </div>
        <div className="col-4">
          <RecruitmentUpdateHistoryList />
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
    </>
  );
};

export { ListData };
