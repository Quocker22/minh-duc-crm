/* eslint-disable lines-around-comment */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */ import { Button } from '@/components/molecules/Button';
import { InputField } from '@/components/molecules/InputField';
import { FormSurveyModel, SurveyQuestion } from '@/modules/communication/models';
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import { cloneDeep } from 'lodash-es';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  formMethods: UseFormReturn<FormSurveyModel, object>;
};

function QuestionList({ formMethods }: Props) {
  const surveyQuestions = formMethods.watch('surveyQuestions') || [];

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
      title: '',
      answers: [
        {
          content: '',
        },
      ],
    });

    formMethods.setValue('surveyQuestions', surveyQuestions);
  };

  const handleDeleteQuestion = (indexQuestion: number) => {
    const surveyQuestions = cloneDeep(formMethods.watch('surveyQuestions') || []);
    surveyQuestions.splice(indexQuestion, 1);

    formMethods.setValue('surveyQuestions', surveyQuestions);
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: 'white', marginBottom: '1.5rem', padding: '0 1.5rem' }}
    >
      <div className="card-body">
        <h3 className="my-4 font-bold">Tạo câu hỏi khảo sát</h3>
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
                />

                <CloseOutlined
                  rev={undefined}
                  onClick={() => handleDeleteQuestion(index)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                  }}
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
                      />

                      <DeleteOutlined
                        rev={undefined}
                        onClick={() => handleDeleteOption(index, indexOption)}
                        style={{ position: 'absolute', top: '1rem', right: '1rem' }}
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
                >
                  <PlusOutlined rev={undefined} /> Thêm tùy chọn
                </Button>
              </div>
            );
          })}
        </div>
        <div className="w-100 d-flex justify-content-end" style={{ marginTop: 24 }}>
          <Button className="rounded-pill py-1 px-10" onClick={handleAddQuestion}>
            <PlusOutlined rev={undefined} /> Thêm câu hỏi
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuestionList;
