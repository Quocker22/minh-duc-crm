/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable newline-before-return */
/* eslint-disable simple-import-sort/imports */
import { HistoryOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, PopconfirmProps, Space } from 'antd';
import moment, { Moment } from 'moment';
import { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/molecules/Button';
import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { SelectAcademic } from '@/components/molecules/SelectAcademic';
import { SelectCareer } from '@/components/molecules/SelectCareer';
import { SelectCustomer } from '@/components/molecules/SelectCustomer';
import { SelectDegree } from '@/components/molecules/SelectDegree';
import { SelectOtherRequirements } from '@/components/molecules/SelectOtherRequirements';
import { SelectVacancies } from '@/components/molecules/SelectVacancies';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { DateTimeFormat } from '@/constants';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { ChangePasswordModal } from '@/modules/hr-management/components/form/ChangePasswordModal';
import { useGetRecruitmentUpdateHistoryList } from '@/modules/recruitment-plan/hooks/useGetRecruitmentUpdateHistoryList';
import {
  FormRecruitmentPlanModel,
  RecruitmentPlanModel,
  CampaignOptions,
} from '@/modules/recruitment-plan/models';
import { getRecruitmentStatus } from '@/modules/recruitment-plan/utils';
import { getClientDateTime, history } from '@/utils';
import HistoryModal from '@/modules/recruitment-plan/components/form/HistoryModal';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { useDeleteRecruitmentPlan } from '@/modules/recruitment-plan/hooks/useDeleteRecruitmentPlan';
import { InputMoneyField } from '@/components/molecules/InputMoneyField';
import { getRoleEmployee } from '@/roles';
import { ReOrganizationRole } from '@/modules/recruitment-organization/models';
import { ProtectedComponent } from '@/components/molecules/ProtectedComponent';

interface IProps {
  formMethods: UseFormReturn<FormRecruitmentPlanModel, object>;
  readonly isViewOnly?: boolean;
  readonly recruitmentDetail?: RecruitmentPlanModel;
}

const InformationCampaign: FC<IProps> = ({ formMethods, recruitmentDetail, isViewOnly }) => {
  const { id } = useParams();
  const { updateFiltersState } = useQueryRequest<{
    id: string;
  }>({ limit: 3 as any }, () => undefined, false);
  const [isVisibleFormModal, setIsVisibleFormModal] = useState(false);
  const [visibleHistoryModal, setVisibleHistoryModal] = useState(false);
  const isDisable = Boolean(
    (recruitmentDetail?.status === CampaignOptions.pending ||
      recruitmentDetail?.status === CampaignOptions.done) &&
      !isViewOnly
  );

  const isDone = Boolean(recruitmentDetail?.status === CampaignOptions.done);

  const { data: historyList } = useGetRecruitmentUpdateHistoryList(`page=1&limit=3&id=${id}`);
  const { mutateAsync: deleteRecruitmentPlan } = useDeleteRecruitmentPlan();

  useEffect(() => {
    updateFiltersState({ id });
  }, [id, historyList]);

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
      formMethods.setValue('end_date', '');
    }
  };

  const confirm: PopconfirmProps['onConfirm'] = async () => {
    const res = await deleteRecruitmentPlan(id || '');
    if (!res) return;

    history.push(`/`);
  };

  const tctdXemChiTietChienDich = getRoleEmployee(ReOrganizationRole.tctd_xem_chi_tiet_chien_dich);

  return (
    <ProtectedComponent hasAccess={tctdXemChiTietChienDich}>
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
              disabled={!isDisable}
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
              disabled={!isDisable}
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
                    disabledDate={(current: Moment | null) => {
                      return current ? current.isBefore(moment(new Date()), 'day') : false;
                    }}
                    format={DateTimeFormat.fe_date}
                    formatValue={DateTimeFormat.be_date}
                    groupClass="col-5 mb-7"
                    name="start_date"
                    onChange={(date) => {
                      handleEndDateChange(date);
                    }}
                    placeholder="dd/MM/YYYY"
                    disabled={!isDisable}
                  />
                  <h6 className="col-2 mt-3 ps-3">Đến</h6>
                  <InputDateField
                    control={formMethods.control}
                    disabledDate={(current: Moment | null) => {
                      // Logic disabledDate cho start_date
                      if (startDate && current) {
                        return current.isSameOrBefore(startDate, 'day');
                      }

                      return false;
                    }}
                    format={DateTimeFormat.fe_date}
                    formatValue={DateTimeFormat.be_date}
                    groupClass="col-5 mb-7"
                    name="end_date"
                    placeholder="dd/MM/YYYY"
                    disabled={!isDisable}
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
                  disabled={!isDisable}
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
                  disabled={!isDisable}
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
                        disabled={!isDisable}
                      />
                      <h6 className="col-2 mt-3">Đến</h6>
                      <InputField
                        allowClear={false}
                        control={formMethods.control}
                        groupClass="col-3 mb-5"
                        max={100}
                        min={0}
                        name="age_range_max"
                        type="number"
                        required
                        disabled={!isDisable}
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
                  disabled={!isDisable}
                  solid={false}
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
                  disabled={!isDisable}
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
                  disabled={!isDisable}
                />
                <InputMoneyField
                  allowClear={false}
                  control={formMethods.control}
                  controlUpAndDown={false}
                  groupClass="mb-5"
                  label={<b>Mức lương (VNĐ)</b>}
                  name="salary"
                  placeholder="---Nhập mức lương---"
                  className="rounded-pill"
                  required
                  disabled={!isDisable}
                  min={0}
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
                        disabled={!isDisable}
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
                        disabled={!isDisable}
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
                  disabled={!isDisable}
                />
                <SelectOtherRequirements
                  control={formMethods.control}
                  getOptionValue={(option) => option.id || ''}
                  groupClass="mb-5"
                  label={<b>Yêu cầu khác</b>}
                  name="other_requirement_id"
                  placeholder="---Chọn yêu cầu khác---"
                  disabled={!isDisable}
                  clearable
                />
              </div>
            </div>
          </div>
          <div className="pt-5 w-100 d-flex justify-content-between">
            {isDisable ? (
              <>
                {!isDone ? (
                  <Popconfirm
                    cancelText="Hủy"
                    okText="Xóa"
                    onConfirm={confirm}
                    title="Bạn có chắc muốn xóa vai trò này không ?"
                  >
                    <a className="text-danger">Xóa chiến dịch</a>
                  </Popconfirm>
                ) : (
                  <div />
                )}
                <Button className="rounded-pill py-2" type="submit" variant="primary">
                  {isDone ? 'Sử dụng lại' : 'Cập nhật'}
                </Button>
              </>
            ) : null}
          </div>
        </div>
        <div className="col-4">
          <div className="ms-5">
            <Space className="pb-2 border-bottom border-2 w-100">
              <HistoryOutlined className="fs-3" rev="HistoryOutlined" />
              <span className="fs-5">lịch sử thao tác</span>
            </Space>

            {historyList?.rows.map((i) => {
              const avatar = i.updated_by?.avatar || defaultAvatar;
              return (
                <div key={i.id} className="row mt-5 border-bottom border-2 w-100">
                  <div className="col-3">
                    <div className="d-flex items-center gap-3">
                      <Avatar src={avatar} style={{ flexShrink: 0 }} />
                      <div style={{ flexGrow: 1 }}>{i.updated_by?.name}</div>
                    </div>
                  </div>
                  <div className="col-5">
                    <p className="text-start" style={{ paddingLeft: '5px' }}>
                      {i.message}
                    </p>
                  </div>
                  <div className="col-4">
                    <span>Lúc</span> <span>{getClientDateTime(i.updated_at)}</span>
                  </div>
                </div>
              );
            })}
            <div className="mt-2 w-100 text-end">
              <div className="mt-2 w-100 text-end">
                {(historyList?.rows.length || 0) === 3 && (
                  <span
                    className="fs-4 text-primary cursor-pointer"
                    onClick={() => setVisibleHistoryModal(true)}
                  >
                    xem thêm
                  </span>
                )}
              </div>
            </div>
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
      {visibleHistoryModal && (
        <HistoryModal onHide={() => setVisibleHistoryModal(false)} show={visibleHistoryModal} />
      )}
    </ProtectedComponent>
  );
};

export { InformationCampaign };
