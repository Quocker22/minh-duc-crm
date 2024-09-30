import * as Yup from 'yup';
import { ref } from 'yup';

import { PASSWORD_REGEX_NULLABLE, PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { useValidation } from '@/hooks/useValidation';
import { Shape } from '@/models';
import {
  FormChangePasswordModel,
  FormHRModel,
  FormRecruitmentTeamsModel,
} from '@/modules/hr-management/models';
import { trans, vTrans } from '@/utils';

const { stringRequired } = useValidation('VALIDATION.FIELD.HR');

function getHRForm1Schema() {
  return Yup.object<Shape<FormHRModel>>({
    email: stringRequired('EMAIL').email('Vui lòng nhập đúng định dạng email'),
    name: stringRequired('FULL_NAME'),
    phone: stringRequired('PHONE_NUMBER').matches(
      PHONE_RULE_REGEX_NULLABLE,
      vTrans.matches('VALIDATION.FIELD.HR.PHONE_NUMBER')
    ),
  });
}

function getRecruitmentTeamsFormSchema() {
  return Yup.object<Shape<FormRecruitmentTeamsModel>>({
    name: stringRequired('FULL_NAME'),
  });
}

function getHRForm2Schema() {
  return Yup.object<Shape<FormHRModel>>({
    account_type: stringRequired('OLD_PASS_WORD'),
  });
}

export function getAuthUpdatePasswordFormSchema() {
  return Yup.object<Shape<FormChangePasswordModel>>({
    current_pwd: stringRequired('OLD_PASS_WORD'),
    new_password_confirmation: stringRequired('CONFIRM_NEW_PASS_WORD').oneOf(
      [ref('new_pwd'), null],
      trans('VALIDATION.RULES.CHANGE_PASS_WORD')
    ),
    new_pwd: stringRequired('NEW_PASS_WORD').matches(
      PASSWORD_REGEX_NULLABLE,
      'Mật khẩu phải có ít nhất 8 kí tự bao gồm chữ số và kí tự đặc biệt'
    ),
  });
}

export { getHRForm1Schema, getHRForm2Schema, getRecruitmentTeamsFormSchema };
