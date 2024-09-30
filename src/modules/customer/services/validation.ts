import { message } from 'antd';
import * as Yup from 'yup';

import { PHONE_RULE_REGEX_NULLABLE } from '@/constants';
import { useValidation } from '@/hooks/useValidation';
import { Shape } from '@/models';
import { FormCustomerModel } from '@/modules/customer/models';
import { FormRecruitmentTeamsModel, FormRoleModel } from '@/modules/hr-management/models';
import { vTrans } from '@/utils';

const { stringRequired, arrayRequired } = useValidation('VALIDATION.FIELD.CUSTOMER');

const { stringRequired: stringRequired1 } = useValidation('VALIDATION.FIELD.ROLE');

const { stringRequired: stringRequired2 } = useValidation('VALIDATION.FIELD.RECRUITMENT_TEAM');

function getCustomerFormSchema() {
  return Yup.object<Shape<FormCustomerModel>>({
    address: stringRequired('DETAIL_ADDRESS'),
    district_id: stringRequired('DISTRICT'),
    email: stringRequired('EMAIL').email('Vui lòng nhập đúng định dạng email'),
    name: stringRequired('NAME'),
    phone: stringRequired('PHONE_NUMBER').matches(
      PHONE_RULE_REGEX_NULLABLE,
      vTrans.matches('VALIDATION.FIELD.CUSTOMER.PHONE_NUMBER')
    ),
    province_id: stringRequired('PROVINCE'),
    shift_work: arrayRequired('SHIFT_WORK'),
    tax_code: stringRequired('TAX_CODE'),
    ward_id: stringRequired('WARD'),
  });
}
function getRoleFormSchema() {
  return Yup.object<Shape<FormRoleModel>>({
    name: stringRequired1('NAME'),
  });
}

function getRecruitmentTeamsFormSchema() {
  return Yup.object<Shape<FormRecruitmentTeamsModel>>({
    leader_id: stringRequired2('LEADER_ID').test(
      'leader_id-required',
      'Vui lòng chọn trưởng nhóm',
      (value) => {
        if (!value) {
          message.error('Vui lòng chọn trưởng nhóm');

          return false;
        }

        return true;
      }
    ),
    name: stringRequired2('NAME'),
  });
}

export { getCustomerFormSchema, getRecruitmentTeamsFormSchema, getRoleFormSchema };
