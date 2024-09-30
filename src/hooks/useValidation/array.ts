import * as Yup from 'yup';

import { stringRules } from '@/hooks/useValidation/string';
import { AvailableValidationType, vTrans } from '@/utils';

export function arrayRules(fieldPrefix: string) {
  const { stringRequired } = stringRules(fieldPrefix);

  function arrayStringRequired(field: string, min?: number) {
    const rule = Yup.array()
      .of(stringRequired(field))
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.array))
      .required(vTrans.required(`${fieldPrefix}.${field}`));

    return !min ? rule : rule.min(min, vTrans.min(`${fieldPrefix}.${field}`, min));
  }

  function arrayRequired(field: string, min?: number) {
    const rule = Yup.array()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.array))
      .required(vTrans.required(`${fieldPrefix}.${field}`));

    return !min ? rule : rule.min(min, vTrans.min(`${fieldPrefix}.${field}`, min));
  }

  return { arrayRequired, arrayStringRequired };
}
