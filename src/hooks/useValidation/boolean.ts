import * as Yup from 'yup';

import { AvailableValidationType, vTrans } from '@/utils';

export function booleanRules(fieldPrefix: string) {
  function booleanRequired(field: string) {
    return Yup.boolean()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.boolean))
      .required(vTrans.required(`${fieldPrefix}.${field}`));
  }

  function booleanRequiredIf(field: string, dependencyField: string, condition: unknown) {
    const requiredMessage = vTrans.required(`${fieldPrefix}.${field}`);

    return Yup.boolean()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.boolean))
      .when(dependencyField, { is: condition, then: (schema) => schema.required(requiredMessage) });
  }

  function mustConfirm(field: string) {
    return Yup.boolean()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.boolean))
      .required(vTrans.required(`${fieldPrefix}.${field}`))
      .oneOf([true], vTrans.confirm(`${fieldPrefix}.${field}`));
  }

  return { booleanRequired, booleanRequiredIf, mustConfirm };
}
