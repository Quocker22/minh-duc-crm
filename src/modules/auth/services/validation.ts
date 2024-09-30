import * as Yup from 'yup';

import { useValidation } from '@/hooks/useValidation';
import { FormLoginModel, Shape } from '@/models';

const { stringRequired } = useValidation('VALIDATION.FIELD.AUTH.LOGIN');

function getLoginFormSchema() {
  return Yup.object<Shape<FormLoginModel>>({
    password: stringRequired('PASSWORD'),
    phone: stringRequired('USER_NAME'),
  }).required();
}

export { getLoginFormSchema };
