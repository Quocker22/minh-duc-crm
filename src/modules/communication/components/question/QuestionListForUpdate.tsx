/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Button } from '@/components/molecules/Button';
import { InputField } from '@/components/molecules/InputField';
import { CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import React, { useState } from 'react';
import { FormSurveyModel, SurveyQuestion } from '@/modules/communication/models';
import { UseFormReturn } from 'react-hook-form';
import { cloneDeep } from 'lodash-es';
import { useParams } from 'react-router-dom';
import { ModalConfirmDelete } from '@/components/organisms/ModalConfirmDelete';
import { useToast } from '@/hooks/useToast';
import { useCreateQuestion } from '@/modules/communication/hooks/useCreateQuestion';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  formMethods: UseFormReturn<FormSurveyModel, object>;
  questionInfo: undefined | { question: SurveyQuestion; indexQuestion: number };
  setQuestionInfo: React.Dispatch<
    React.SetStateAction<
      | {
          question: SurveyQuestion;
          indexQuestion: number;
        }
      | undefined
    >
  >;
  setListQuestionIdDelete: React.Dispatch<React.SetStateAction<string[]>>;
  questionList?: SurveyQuestion[];
  setListQuestionUnSubmitted: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
};

function QuestionListForUpdate({
  formMethods,
  questionInfo,
  setQuestionInfo,
  setListQuestionIdDelete,
  questionList,
  setListQuestionUnSubmitted,
}: Props) {
  const { id } = useParams();
  const { toastError } = useToast();
  const queryClient = useQueryClient();

  const statusValue = formMethods.getValues('status');
  const disableForm = Boolean(statusValue === 'END' || statusValue === 'WORKING');

  const { mutateAsync: createQuestion, isLoading: isLoadingcreateQuestion } = useCreateQuestion();
  const { mutateAsync: mutateAsyncCreateQuestion } = useMutation(createQuestion, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['question-list'] });
    },
  });

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const surveyQuestions = formMethods.watch('surveyQuestions') || [];

  const handleOpenModalDelete = (question: SurveyQuestion, indexQuestion: number) => {
    setVisibleModalDelete(true);
    setQuestionInfo((prev) => ({
      question,
      indexQuestion,
    }));
  };

  const handleCloseModalDelete = () => {
    setVisibleModalDelete(false);
    setQuestionInfo(undefined);
  };

  const handleAddOption = (indexQuestion: number) => {
    const surveyQuestions = cloneDeep(formMethods.watch('surveyQuestions') || []);
    const question = cloneDeep(surveyQuestions[indexQuestion]);
    const newOptionList = cloneDeep(question.answers) || [];

    newOptionList.push({ content: '' });

    question.answers = newOptionList;

    surveyQuestions.splice(indexQuestion, 1, question);

    formMethods.setValue('surveyQuestions', surveyQuestions);
  };

  const handleDeleteOption = (indexQuestion: number, indexOption: number) => {
    const surveyQuestions = cloneDeep(formMethods.watch('surveyQuestions') || []);
    const question = cloneDeep(surveyQuestions[indexQuestion]);
    const newOptionList = cloneDeep(question.answers) || [];

    newOptionList.splice(indexOption, 1);

    question.answers = newOptionList;

    surveyQuestions.splice(indexQuestion, 1, question);

    formMethods.setValue('surveyQuestions', surveyQuestions);
  };

  const handleAddQuestion = () => {
    const surveyQuestions = cloneDeep(formMethods.watch('surveyQuestions') || []);
    surveyQuestions.push({
      form_id: id as string,
      title: '',
      answers: [
        {
          content: '',
        },
      ],
    });

    formMethods.setValue('surveyQuestions', surveyQuestions);
  };

  const handleDeleteQuestion = () => {
    if (!questionInfo) return;

    const { indexQuestion, question } = questionInfo;

    const surveyQuestions = cloneDeep(formMethods.watch('surveyQuestions') || []);
    surveyQuestions.splice(indexQuestion, 1);

    formMethods.setValue('surveyQuestions', surveyQuestions);

    if (question?.id) {
      setListQuestionIdDelete((prev) => [...prev, question.id as string]);
    }

    handleCloseModalDelete();
  };

  const handleCreateQuestion = async (question: SurveyQuestion, indexQuestion: number) => {
    const isAllowCreate =
      Boolean(question.title) && question.answers.every((answer) => Boolean(answer.content));

    if (!isAllowCreate) {
      toastError({ title: 'Lỗi', subtitle: 'Vui lòng nhập đầy đủ thông tin câu hỏi!' });

      return;
    }

    const res = await mutateAsyncCreateQuestion({
      ...question,
      order:
        questionList && questionList?.length
          ? (questionList[questionList?.length - 1]?.order as number) + 1
          : 1,
    });

    const listQuestionUnCreated = formMethods.getValues('surveyQuestions')?.length
      ? (cloneDeep(formMethods.getValues('surveyQuestions'))?.filter(
          (question, index) => !question.id && index !== indexQuestion
        ) as SurveyQuestion[])
      : [];

    setListQuestionUnSubmitted(listQuestionUnCreated);
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: 'white', marginBottom: '1.5rem', padding: '0 1.5rem' }}
    >
      {visibleModalDelete && (
        <ModalConfirmDelete
          show={visibleModalDelete}
          onHide={handleCloseModalDelete}
          onConfirmDelete={handleDeleteQuestion}
        />
      )}

      <div className="card-body">
        <h3 className="my-4 font-bold">Câu hỏi khảo sát</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {surveyQuestions.map((item: SurveyQuestion, index: number) => {
            return (
              <div
                className="p-4 rounded"
                style={{ backgroundColor: '#F4F6F8', width: '100%', position: 'relative' }}
                key={`${item.title}_${index}`}
              >
                <InputField
                  classNameInputHint="col-9"
                  control={formMethods.control}
                  errorClass="ps-4"
                  groupClass="mb-5 d-flex gap-4"
                  label={<label>{index + 1}.</label>}
                  labelClass="mt-3 shrink-0"
                  name={`surveyQuestions[${index}].title` as any}
                  placeholder="Nhập câu hỏi"
                  allowClear={false}
                  disabled={disableForm}
                />

                <Button
                  hidden={Boolean(item.id)}
                  onClick={() => handleCreateQuestion(item, index)}
                  variant="outline-primary"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '3rem',
                    padding: 0,
                  }}
                >
                  <CheckOutlined rev={undefined} /> Xác nhận câu hỏi
                </Button>

                <CloseOutlined
                  rev={undefined}
                  onClick={() => handleOpenModalDelete(item, index)}
                  style={{
                    position: 'absolute',
                    top: '1.2rem',
                    right: '1rem',
                  }}
                  hidden={disableForm}
                />

                {item.answers.map((option, indexOption: number) => {
                  return (
                    <div
                      key={`${option.content}_${indexOption}`}
                      style={{
                        position: 'relative',
                      }}
                    >
                      <InputField
                        classNameInputHint="col-9"
                        control={formMethods.control}
                        errorClass="ps-4"
                        groupClass="d-flex mb-5"
                        labelClass="shrink-0 mt-3"
                        name={`surveyQuestions[${index}].answers[${indexOption}].content` as any}
                        label={<Radio disabled />}
                        placeholder={`Tùy chọn ${indexOption + 1}`}
                        allowClear={false}
                        disabled={disableForm}
                      />

                      <DeleteOutlined
                        rev={undefined}
                        onClick={() => handleDeleteOption(index, indexOption)}
                        style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                        hidden={disableForm}
                      />
                    </div>
                  );
                })}

                <Button
                  className="rounded-pill py-1 px-10"
                  style={{
                    marginLeft: '1rem',
                  }}
                  variant="outline-primary"
                  onClick={() => handleAddOption(index)}
                  hidden={disableForm}
                >
                  <PlusOutlined rev={undefined} /> Thêm tùy chọn
                </Button>
              </div>
            );
          })}
        </div>
        <div className="w-100 d-flex justify-content-end" style={{ marginTop: 24 }}>
          <Button
            className="rounded-pill py-1 px-10"
            onClick={handleAddQuestion}
            hidden={disableForm}
          >
            <PlusOutlined rev={undefined} style={{ marginTop: 0 }} /> Thêm câu hỏi
          </Button>
        </div>
        {!surveyQuestions.length && disableForm && <span>Không có câu hỏi khảo sát</span>}
      </div>
    </div>
  );
}

export default QuestionListForUpdate;
