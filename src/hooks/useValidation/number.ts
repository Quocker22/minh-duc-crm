import * as Yup from 'yup';

import { AvailableValidationType, vTrans } from '@/utils';

export function numberRules(fieldPrefix: string) {
  function numberRequired(field: string, min?: number, max?: number) {
    let rule = Yup.number()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.number))
      .required(vTrans.required(`${fieldPrefix}.${field}`));

    if (min) {
      rule = rule.min(min, vTrans.min(`${fieldPrefix}.${field}`, min));
    }
    if (max) {
      rule = rule.max(max, vTrans.min(`${fieldPrefix}.${field}`, max));
    }

    return rule;
  }

  function numberRequiredIf(
    field: string,
    dependencyField: string,
    condition: unknown,
    min?: number,
    max?: number
  ) {
    const requiredMessage = vTrans.required(`${fieldPrefix}.${field}`);
    let rule = Yup.number()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.number))
      .when(dependencyField, { is: condition, then: (schema) => schema.required(requiredMessage) });

    if (min) {
      rule = rule.min(min, vTrans.min(`${fieldPrefix}.${field}`, min));
    }
    if (max) {
      rule = rule.max(max, vTrans.min(`${fieldPrefix}.${field}`, max));
    }

    return rule;
  }

  return { numberRequired, numberRequiredIf };
}
