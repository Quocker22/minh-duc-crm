import * as Yup from 'yup';

import { AvailableValidationType, vTrans } from '@/utils';

export function dateRules(fieldPrefix: string) {
  function dateRequired(field: string, min?: string, max?: string) {
    let rule = Yup.date()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.string))
      .required(vTrans.required(`${fieldPrefix}.${field}`));

    if (min) {
      rule = rule.min(min, vTrans.minDate(`${fieldPrefix}.${field}`, min));
    }
    if (max) {
      rule = rule.max(max, vTrans.maxDate(`${fieldPrefix}.${field}`, max));
    }

    return rule;
  }

  function dateRequiredIf(
    field: string,
    dependencyField: string,
    condition: unknown,
    min?: string,
    max?: string
  ) {
    const requiredMessage = vTrans.required(`${fieldPrefix}.${field}`);
    let rule = Yup.date()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.string))
      .when(dependencyField, { is: condition, then: (schema) => schema.required(requiredMessage) });
    if (min) {
      rule = rule.min(min, vTrans.minDate(`${fieldPrefix}.${field}`, min));
    }
    if (max) {
      rule = rule.max(max, vTrans.maxDate(`${fieldPrefix}.${field}`, max));
    }

    return rule;
  }

  return { dateRequired, dateRequiredIf };
}
