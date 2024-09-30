/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Button } from '@/components/molecules/Button';
import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { RadioField } from '@/components/molecules/RadioField';
import { DateTimeFormat } from '@/constants';
import CustomerOperated from '@/modules/communication/components/freeSurvey/CustomerOperated';
import ManagedWorker from '@/modules/communication/components/freeSurvey/ManagedWorker';
import RecipientOptionAll from '@/modules/communication/components/freeSurvey/RecipientOptionAll';
import QuestionListForUpdate from '@/modules/communication/components/question/QuestionListForUpdate';
import { statusSurvey } from '@/modules/communication/components/table/_columns';
import { RECIPIENT_OPTION, RecipientOptionType } from '@/modules/communication/constants';
import { FormSurveyModel, SurveyQuestion } from '@/modules/communication/models';
import { history, trans } from '@/utils';
import { Badge } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Moment } from 'moment';
import { Fragment, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  formMethods: UseFormReturn<FormSurveyModel, object>;
  setListQuestionIdDelete: React.Dispatch<React.SetStateAction<string[]>>;
  questionList?: SurveyQuestion[];
  setListQuestionUnSubmitted: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
  isLoadingUpdateSurvey: boolean;
  defaultValues?: FormSurveyModel;
}

function DetailStep1({
  formMethods,
  setListQuestionIdDelete,
  questionList,
  setListQuestionUnSubmitted,
  isLoadingUpdateSurvey,
  defaultValues,
}: Props) {
  const statusValue = formMethods.getValues('status');
  const disableForm = Boolean(statusValue === 'END' || statusValue === 'WORKING');
  const startDate = formMethods.watch('start_date');

  const [questionInfo, setQuestionInfo] = useState<
    undefined | { question: SurveyQuestion; indexQuestion: number }
  >();

  const handleEndDateChange = (date: string | undefined) => {
    if (date) {
      // Cập nhật giá trị của start_date khi end_date thay đổi
      formMethods.setValue('start_date', date);
      formMethods.setValue('end_date', undefined);
    }
  };
  const formType: RecipientOptionType | undefined = formMethods.watch('form_type');

  const handleChangeFormType = (e: CheckboxChangeEvent) => {
    const defaultFormType = defaultValues?.form_type;
    const defaultWorkers = defaultValues?.workers;
    if (defaultFormType === e.target.value) {
      formMethods.setValue('workers', defaultWorkers);
    } else {
      formMethods.setValue('workers', []);
    }
  };

  return (
    <Fragment>
      <div
        className="card"
        style={{ backgroundColor: '#FFFFFF', margin: '1.5rem 0', padding: '0 1.5rem' }}
      >
        <div className="card-body">
          <div className="pb-6" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 className="font-bold">Thông tin tổng quan</h3>

            <Badge
              className="site-badge-count-109"
              count={statusSurvey(statusValue)?.label}
              style={{
                backgroundColor: statusSurvey(statusValue)?.bgColor,
                color: statusSurvey(statusValue)?.textColor,
              }}
            />
          </div>

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            errorClass="ps-4"
            groupClass="row mb-5"
            label={<b>Tên đợt khảo sát</b>}
            labelClass="col-3 mt-3"
            name="name"
            placeholder="Nhập tên đợt khảo sát"
            required
            disabled={disableForm}
          />

          <InputField
            classNameInputHint="col-9"
            control={formMethods.control}
            errorClass="ps-4"
            groupClass="row mb-5"
            label={<b>Mô tả</b>}
            labelClass="col-3 mt-3"
            name="description"
            placeholder="Nhập mô tả"
            rows={2}
            type="textarea"
            disabled={disableForm}
          />

          <div className="row">
            <div className="col-3 mt-3 d-flex flex-column">
              <b>
                Thời gian diễn ra <span className="text-danger"> *</span>
              </b>
            </div>
            <div className="col-6 p-0">
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <InputDateField
                  control={formMethods.control}
                  format={DateTimeFormat.fe_date}
                  formatValue={DateTimeFormat.be_date}
                  groupClass="mb-7"
                  name="start_date"
                  onChange={(date) => {
                    handleEndDateChange(date);
                  }}
                  placeholder="DD/MM/YYYY"
                  disabled={disableForm}
                />
                <h6 className="mt-3 ps-2">Đến</h6>
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
                  groupClass="mb-7"
                  name="end_date"
                  placeholder="DD/MM/YYYY"
                  disabled={disableForm}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-3 mt-3 d-flex flex-column">
              <b>
                Người nhận <span className="text-danger"> *</span>
              </b>
            </div>
            <div className="col-9 p-0">
              <RadioField
                control={formMethods.control}
                name="form_type"
                options={RECIPIENT_OPTION}
                style={{ display: 'flex', gap: '3rem' }}
                required
                disabled={disableForm}
                onChange={handleChangeFormType}
              />

              {formType && formType === 'all_workers' ? (
                <RecipientOptionAll formMethods={formMethods} />
              ) : formType === 'worker_of_employees' ? (
                <ManagedWorker formMethods={formMethods} />
              ) : formType === 'worker_for_customers' ? (
                <CustomerOperated formMethods={formMethods} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <QuestionListForUpdate
        formMethods={formMethods}
        questionInfo={questionInfo}
        setListQuestionIdDelete={setListQuestionIdDelete}
        setListQuestionUnSubmitted={setListQuestionUnSubmitted}
        setQuestionInfo={setQuestionInfo}
        questionList={questionList}
      />

      <div className="d-flex justify-content-end">
        <Button
          className="me-3 rounded-pill py-1 px-6"
          onClick={() => history.push(`list`)}
          variant="outline"
          style={{
            color: 'red',
          }}
        >
          {trans('GENERAL.ACTION.CANCEL')}
        </Button>
        {!disableForm && (
          <Button
            disabled={isLoadingUpdateSurvey}
            className="rounded-pill py-1 px-6"
            type="submit"
            variant="primary"
          >
            Cập nhật
          </Button>
        )}
      </div>
    </Fragment>
  );
}

export default DetailStep1;
