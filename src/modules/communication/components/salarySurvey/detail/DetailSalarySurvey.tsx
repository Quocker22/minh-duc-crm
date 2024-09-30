/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-imports */
import { FormField } from '@/components/molecules/FormField';
import { DateTimeFormat } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { ALLOWED_EXTENSIONS } from '@/modules/communication/CommunicationPage';
import DetailStep1 from '@/modules/communication/components/salarySurvey/detail/DetailStep1';
import TabWorkerSubmited from '@/modules/communication/components/TabWorkerSubmited';
import TabWorkerUnSubmited from '@/modules/communication/components/TabWorkerUnSubmited';
import { useDeleteQuestion } from '@/modules/communication/hooks/useDeleteQuestion';
import { useGetQuestionList } from '@/modules/communication/hooks/useGetQuestionList';
import { useGetSurveyDetail } from '@/modules/communication/hooks/useGetSurveyDetail';
import { useUpdateFileWorker } from '@/modules/communication/hooks/useUpdateFileWorker';
import { useUpdateManyQuestion } from '@/modules/communication/hooks/useUpdateManyQuestion';
import { useUpdateSurvey } from '@/modules/communication/hooks/useUpdateSurvey';
import { FormSurveyModel, SurveyQuestion } from '@/modules/communication/models';
import { getSurveyFormSalarySchema } from '@/modules/communication/services/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spin, Tabs, TabsProps } from 'antd';
import { cloneDeep } from 'lodash-es';
import moment from 'moment';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface Props {
  breadcrumbName: (value: string) => void;
}

function DetailSalarySurvey({ breadcrumbName }: Props) {
  const { id } = useParams();
  const formTypeEnpoint = 'form-salary';
  const queryClient = useQueryClient();
  const { toastError } = useToast();
  const resolver = yupResolver(getSurveyFormSalarySchema());
  const formMethods = useForm<FormSurveyModel>({ resolver });
  const [totalWorkers, setTotalWorkers] = useState<number>(0);
  const { mutateAsync: updateManyQuestion, isLoading: isLoadingUpdateManyQuestion } =
    useUpdateManyQuestion();
  const { mutateAsync: mutateAsyncUpdateManyQuestion } = useMutation(updateManyQuestion);

  const { mutateAsync: updateSurvey, isLoading: isLoadingUpdateSurvey } =
    useUpdateSurvey(formTypeEnpoint);
  const { mutateAsync } = useMutation(updateSurvey);

  const { mutateAsync: deleteQuestion, isLoading: isLoadingDeleteQuestion } = useDeleteQuestion();
  const { mutateAsync: mutateAsyncDeleteQuestion } = useMutation(deleteQuestion);

  const { mutateAsync: updateFileWorker, isLoading: isLoadingUpdateFileWorker } =
    useUpdateFileWorker();
  const { mutateAsync: mutateAsyncUpdateFileWorker } = useMutation(updateFileWorker);

  const [listQuestionIdDelete, setListQuestionIdDelete] = useState<string[]>([]);
  const [listQuestionUnSubmitted, setListQuestionUnSubmitted] = useState<SurveyQuestion[]>([]);

  const { isSuccess: isSuccessGetSurveyDetail } = useGetSurveyDetail(id || '', formTypeEnpoint, {
    enabled: !!id,
    onSuccess: (surveyData) => {
      if (!surveyData) return;

      breadcrumbName(surveyData.name);

      const formDefault: FormSurveyModel = {
        name: surveyData.name,
        description: surveyData.description,
        status: surveyData.status,
        form_type: surveyData.form_type,
        start_date: surveyData.start_date,
        end_date: surveyData.end_date,
        form_category: surveyData.form_category,
        id: surveyData.id,
        file: {
          url: surveyData.file,
        },
      };
      formMethods.reset(formDefault);

      setTotalWorkers(surveyData.total_workers || 0);
    },
  });

  const {
    isFetching,
    isLoading: isLoadingGetQuestionList,
    data: questionList,
  } = useGetQuestionList(`page=1&limit=500&form_id=${id}`, {
    enabled: isSuccessGetSurveyDetail,
    onSuccess(questionData) {
      formMethods.setValue('surveyQuestions', [
        ...(questionData?.rows || []),
        ...listQuestionUnSubmitted,
      ]);
    },
  });

  const onSubmit: SubmitHandler<FormSurveyModel> = async (formData) => {
    const surveyQuestions = cloneDeep(formData.surveyQuestions)?.map((item, index) => ({
      ...item,
      form_id: id as string,
      order: index,
    }));

    const isAllowSubmit = surveyQuestions?.every(
      (question) =>
        Boolean(question.title) &&
        Boolean(question.id) &&
        question.answers.every((answer) => Boolean(answer.content))
    );

    if (!isAllowSubmit) {
      toastError({
        title: 'Lỗi',
        subtitle: 'Vui lòng nhập đầy đủ thông tin câu hỏi và xác nhận các câu hỏi vừa được thêm!',
      });

      return;
    }

    delete formData.surveyQuestions;

    const file = formData.file?.url;

    if (file && !ALLOWED_EXTENSIONS.exec(file)) {
      return toastError({
        title: 'Lỗi',
        subtitle: 'File tải lên không đúng định dạng',
      });
    }

    if (file) {
      await mutateAsyncUpdateFileWorker({
        formId: id as string,
        uploadFormFileReq: { file },
      });
    }

    const res = await mutateAsync(
      {
        ...formData,
        start_date: moment(formData.start_date).format(DateTimeFormat.be_date),
        end_date: moment(formData.end_date).format(DateTimeFormat.be_date),
        id,
      },
      {
        onSuccess: async () => {
          const resUpdateManyQuestion = await mutateAsyncUpdateManyQuestion({
            data: surveyQuestions?.map((question, index) => ({
              ...question,
              order: index + 1,
            })) as SurveyQuestion[],
          });

          if (listQuestionIdDelete.length) {
            listQuestionIdDelete.forEach(async (id) => {
              await mutateAsyncDeleteQuestion(id);
            });
          }

          setListQuestionUnSubmitted([]);

          queryClient.invalidateQueries({ queryKey: ['question-list'] });
        },
      }
    );

    if (!res) return;
  };

  const items: TabsProps['items'] = [
    {
      children: (
        <DetailStep1
          formMethods={formMethods}
          setListQuestionIdDelete={setListQuestionIdDelete}
          questionList={questionList?.rows}
          setListQuestionUnSubmitted={setListQuestionUnSubmitted}
          isLoadingUpdateSurvey={isLoadingUpdateSurvey}
        />
      ),
      key: '1',
      label: 'Thông tin chiến dịch',
    },
    {
      children: <TabWorkerSubmited formMethods={formMethods} totalWorkers={totalWorkers} />,
      key: '2',
      label: 'Bảng kết quả trả lời',
    },
    {
      children: <TabWorkerUnSubmited formMethods={formMethods} totalWorkers={totalWorkers} />,
      key: '3',
      label: 'Danh sách người chưa nộp',
    },
  ];

  return (
    <Spin spinning={isLoadingUpdateSurvey}>
      <FormField className="form" methods={formMethods} onSubmit={onSubmit}>
        <div className="card card-body">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </FormField>
    </Spin>
  );
}

export default DetailSalarySurvey;
