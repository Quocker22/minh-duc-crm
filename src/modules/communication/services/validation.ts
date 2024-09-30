/* eslint-disable simple-import-sort/exports */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import * as Yup from 'yup';

import { useValidation } from '@/hooks/useValidation';
import { Shape } from '@/models';
import { FormSurveyModel, SupportMessage } from '@/modules/communication/models';

const { stringRequired } = useValidation('VALIDATION.FIELD.RECRUITMENT');
const { fileRequired } = useValidation('VALIDATION.FIELD.SURVEY');

function getSurveyFormSalarySchema() {
  return Yup.object<Shape<FormSurveyModel>>({
    name: stringRequired('NAME'),
    start_date: stringRequired('START_DATE'),
    end_date: stringRequired('END_DATE'),
    file: fileRequired('FILE_WORKER'),
  });
}
function getSurveyFormFreeSchema() {
  return Yup.object<Shape<FormSurveyModel>>({
    name: stringRequired('NAME'),
    start_date: stringRequired('START_DATE'),
    end_date: stringRequired('END_DATE'),
  });
}

function getMessageFormSchema() {
  return Yup.object<Shape<SupportMessage>>({
    message: stringRequired('MESSAGE'),
  });
}

export { getSurveyFormSalarySchema, getMessageFormSchema, getSurveyFormFreeSchema };
