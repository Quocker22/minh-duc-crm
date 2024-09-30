/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable lines-around-comment */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';

import { PASSWORD_REGEX_NULLABLE, PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { useValidation } from '@/hooks/useValidation';
import { Shape } from '@/models';
import { FormWorkerModel } from '@/modules/worker/models';
import { vTrans } from '@/utils';

const { stringRequired, numberRequired } = useValidation('VALIDATION.FIELD.WORKER');

function getWorkerFormSchema() {
  return Yup.object<Shape<FormWorkerModel>>({
    full_name: stringRequired('FULL_NAME'),
    gender: stringRequired('FULL_NAME'),
    // password: stringRequired('PASSWORD').matches(
    //   PASSWORD_REGEX_NULLABLE,
    //   'Mật khẩu phải có ít nhất 8 kí tự bao gồm chữ số và kí tự đặc biệt'
    // ),
    password: stringRequired('PASSWORD'),
    phone: stringRequired('PHONE').matches(
      PHONE_RULE_REGEX_NULLABLE,
      vTrans.matches('VALIDATION.FIELD.HR.PHONE_NUMBER')
    ),
    birthday: stringRequired('BIRTHDAY'),
  });
}

function getWorkerUpdateFormSchema() {
  return Yup.object<Shape<FormWorkerModel>>({
    full_name: stringRequired('FULL_NAME'),
    gender: stringRequired('FULL_NAME'),
    num_experience: numberRequired('NUM_EXPERIENCE'),
    phone: stringRequired('PHONE'),
  });
}

export { getWorkerFormSchema, getWorkerUpdateFormSchema };
