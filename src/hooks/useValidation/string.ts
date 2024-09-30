import * as Yup from 'yup';

import { AvailableValidationType, vTrans } from '@/utils';

export function stringRules(fieldPrefix: string) {
  function stringRequired(field: string) {
    return Yup.string()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.string))
      .required(vTrans.required(`${fieldPrefix}.${field}`));
  }

  function stringRequiredIf(field: string, dependencyField: string, condition: unknown) {
    const requiredMessage = vTrans.required(`${fieldPrefix}.${field}`);

    return Yup.string()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.string))
      .when(dependencyField, { is: condition, then: (schema) => schema.required(requiredMessage) });
  }

  return { stringRequired, stringRequiredIf };
}
