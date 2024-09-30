/* eslint-disable lines-around-comment */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { RadioField } from '@/components/molecules/RadioField';
import { DateTimeFormat } from '@/constants';
import CustomerOperated from '@/modules/communication/components/freeSurvey/CustomerOperated';
import ManagedWorker from '@/modules/communication/components/freeSurvey/ManagedWorker';
import RecipientOptionAll from '@/modules/communication/components/freeSurvey/RecipientOptionAll';
import QuestionList from '@/modules/communication/components/question/QuestionList';
import { RECIPIENT_OPTION, RecipientOptionType } from '@/modules/communication/constants';
import { useCreateManyQuestion } from '@/modules/communication/hooks/useCreateManyQuestion';
import { useCreateSurvey } from '@/modules/communication/hooks/useCreateSurvey';
import { FormSurveyModel, SurveyModel, SurveyQuestion } from '@/modules/communication/models';
import { getSurveyFormFreeSchema } from '@/modules/communication/services/validation';
import { history } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Spin } from 'antd';
import { cloneDeep } from 'lodash-es';
import moment, { Moment } from 'moment';
import { SubmitHandler, useForm } from 'react-hook-form';

const defaultValues: FormSurveyModel = {
  surveyQuestions: [
    {
      title: 'Sản phẩm của bên em có đáp ứng được nhu cầu của anh/chị không?',
      answers: [
        {
          content: 'Có',
        },
        {
          content: 'Không',
        },
      ],
    },
  ],
  form_type: 'all_workers',
  workers: [],
};

function CreateFreeSurvey() {
  const formTypeEnpoint = 'form-survey';
  const { mutateAsync: createManyQuestion, isLoading: isLoadingCreateManyQuestion } =
    useCreateManyQuestion();
  const { mutateAsync: mutateAsyncCreateManyQuestion } = useMutation(createManyQuestion);

  const { mutateAsync: createSurvey, isLoading } = useCreateSurvey(formTypeEnpoint);

  const { mutateAsync } = useMutation(createSurvey);

  const resolver = yupResolver(getSurveyFormFreeSchema());

  const formMethods = useForm<FormSurveyModel>({
    defaultValues,
    resolver,
  });

  const onSubmit: SubmitHandler<FormSurveyModel> = async (formData) => {
    const surveyQuestions = cloneDeep(formData.surveyQuestions);

    delete formData.surveyQuestions;

    const res = await mutateAsync({
      ...formData,
      form_category: 'survey',
    });

    if (!res) return;

    const formId = (res as unknown as SurveyModel).id;

    const resQuestion = await mutateAsyncCreateManyQuestion({
      data: surveyQuestions?.map((question, index: number) => ({
        ...question,
        form_id: formId,
        order: index + 1,
      })) as SurveyQuestion[],
    });

    if (!resQuestion) return;
    formMethods.reset();
    history.push('list');
  };

  const startDate = formMethods.watch('start_date');
  const handleEndDateChange = (date: string | undefined) => {
    if (date) {
      // Cập nhật giá trị của start_date khi end_date thay đổi
      formMethods.setValue('start_date', date);
      formMethods.setValue('end_date', undefined);
    }
  };

  const formType: RecipientOptionType | undefined = formMethods.watch('form_type');

  const handleChangeFormType = () => {
    formMethods.setValue('workers', []);
  };

  return (
    <Spin spinning={isLoading}>
      <FormField className="form" methods={formMethods} onSubmit={onSubmit}>
        <div
          className="card"
          style={{ backgroundColor: '#FFFFFF', margin: '1.5rem 0', padding: '0 1.5rem' }}
        >
          <div className="card-body">
            <h3 className="pb-6 font-bold">Thông tin tổng quan</h3>

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
                    disabledDate={(current: Moment | null) => {
                      return current ? current.isBefore(moment(new Date()), 'day') : false;
                    }}
                    formatValue={DateTimeFormat.be_date}
                    groupClass="mb-7"
                    name="start_date"
                    onChange={(date) => {
                      handleEndDateChange(date);
                    }}
                    placeholder="DD/MM/YYYY"
                  />
                  <h6 className="mt-3 ps-2">Đến</h6>
                  <InputDateField
                    control={formMethods.control}
                    disabledDate={(current: Moment | null) => {
                      // Logic disabledDate cho start_date
                      if (startDate && current) {
                        return current.isSameOrBefore(startDate, 'day');
                      }

                      return current ? current.isBefore(moment(new Date()), 'day') : false;
                    }}
                    format={DateTimeFormat.fe_date}
                    formatValue={DateTimeFormat.be_date}
                    groupClass="mb-7"
                    name="end_date"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-3">
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
                  onChange={(e) => {
                    handleChangeFormType();
                  }}
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

        {/* Tạo câu hỏi khảo sát */}
        <QuestionList formMethods={formMethods} />

        <div className="w-100 d-flex justify-content-end" style={{ marginTop: 24 }}>
          <Button
            className="rounded-pill px-10 py-1 me-5"
            onClick={() => history.push('list')}
            variant="outline"
            style={{
              color: 'red',
            }}
          >
            Hủy
          </Button>

          <Button className="rounded-pill py-1 px-10" type="submit">
            Tạo khảo sát
          </Button>
        </div>
      </FormField>
    </Spin>
  );
}

export default CreateFreeSurvey;
