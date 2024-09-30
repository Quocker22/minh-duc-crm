/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Button } from '@/components/molecules/Button';
import { FormField } from '@/components/molecules/FormField';
import { InputDateField } from '@/components/molecules/InputDateField';
import { InputField } from '@/components/molecules/InputField';
import { UploadField } from '@/components/molecules/UploadField';
import { DateTimeFormat } from '@/constants';
import QuestionList from '@/modules/communication/components/question/QuestionList';
import { useCreateManyQuestion } from '@/modules/communication/hooks/useCreateManyQuestion';
import { useCreateSurvey } from '@/modules/communication/hooks/useCreateSurvey';
import { FormSurveyModel, SurveyModel, SurveyQuestion } from '@/modules/communication/models';
import { getSurveyFormSalarySchema } from '@/modules/communication/services/validation';
import { history } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Spin } from 'antd';
import { cloneDeep } from 'lodash-es';
import moment, { Moment } from 'moment';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateFileWorker } from '@/modules/communication/hooks/useUpdateFileWorker';
import { useToast } from '@/hooks/useToast';
import { ALLOWED_EXTENSIONS } from '@/modules/communication/CommunicationPage';

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
};

function CreateSalarySurvey() {
  const formTypeEnpoint = 'form-salary';
  const { toastError } = useToast();
  const { mutateAsync: createManyQuestion, isLoading: isLoadingCreateManyQuestion } =
    useCreateManyQuestion();

  const { mutateAsync: updateFileWorker, isLoading: isLoadingUpdateFileWorker } =
    useUpdateFileWorker();

  const { mutateAsync: mutateAsyncCreateManyQuestion } = useMutation(createManyQuestion);
  const { mutateAsync: mutateAsyncUpdateFileWorker } = useMutation(updateFileWorker);
  const { mutateAsync: createSurvey, isLoading } = useCreateSurvey(formTypeEnpoint);
  const { mutateAsync } = useMutation(createSurvey);

  const resolver = yupResolver(getSurveyFormSalarySchema());

  const formMethods = useForm<FormSurveyModel>({
    defaultValues,
    resolver,
  });

  const onSubmit: SubmitHandler<FormSurveyModel> = async (formData) => {
    const surveyQuestions = cloneDeep(formData.surveyQuestions);

    delete formData.surveyQuestions;

    const file = formData.file?.url;

    if (file && !ALLOWED_EXTENSIONS.exec(file)) {
      return toastError({
        title: 'Lỗi',
        subtitle: 'File tải lên không đúng định dạng',
      });
    }

    const res = await mutateAsync({
      ...formData,
      form_category: 'salary_survey',
    });
    if (!res) return;

    const formId = (res as unknown as SurveyModel).id;

    const resUpdateFile = await mutateAsyncUpdateFileWorker({
      formId,
      uploadFormFileReq: { file },
    });

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

            <UploadField
              accept={{ 'excel/*': [] }}
              classNameInputHint="col-9"
              control={formMethods.control}
              groupClass="row mb-5"
              label={<b>File trả lương</b>}
              labelClass="col-3"
              name={'file'}
              type="file"
              required
              multiple={false}
              messageErrors="File phải nhỏ hơn 1MB"
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
                    disabledDate={(current: Moment | null) => {
                      return current ? current.isBefore(moment(new Date()), 'day') : false;
                    }}
                    format={DateTimeFormat.fe_date}
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
                <span style={{ fontStyle: 'italic', marginTop: 'auto' }}>
                  Theo danh sách người lao động trong file ở trên
                </span>
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

export default CreateSalarySurvey;
