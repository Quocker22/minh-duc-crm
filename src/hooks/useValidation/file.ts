import { isObject } from 'lodash-es';
import moment from 'moment';
import * as Yup from 'yup';

import { AvailableValidationType, trans, vTrans } from '@/utils';

export function fileRules(fieldPrefix: string) {
  function fileUploadRequired(field: string) {
    return Yup.object()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.object))
      .required(vTrans.fileRequired(`${fieldPrefix}.${field}`))
      .transform((value) => (!isObject(value) || !(value as any).full_path ? undefined : value));
  }

  function fileRequired(field: string) {
    return Yup.object().required(vTrans.fileRequired(`${fieldPrefix}.${field}`));
  }

  function fileUpload(field: string) {
    return Yup.object()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.object))
      .transform((value) => (!isObject(value) || !(value as any).full_path ? undefined : value));
  }

  function fileUploadRequiredIf(field: string, dependencyField: string, condition: unknown) {
    const requiredMessage = vTrans.required(`${fieldPrefix}.${field}`);

    return Yup.object()
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.object))
      .when(dependencyField, { is: condition, then: (schema) => schema.required(requiredMessage) })
      .transform((value) => (!isObject(value) || !(value as any).full_path ? undefined : value));
  }

  function arrayFileUploadRequired(field: string, min?: number) {
    const rule = Yup.array()
      .of(fileUploadRequired(field))
      .typeError(vTrans.typeError(`${fieldPrefix}.${field}`, AvailableValidationType.array))
      .required(vTrans.required(`${fieldPrefix}.${field}`));

    return !min ? rule : rule.min(min, vTrans.min(`${fieldPrefix}.${field}`, min));
  }

  function isBeforeToday(field: string, name: string) {
    return Yup.string().test({
      message: vTrans.min(field, trans('GENERAL.TODAY')),
      name,
      test: (value) => moment().isBefore(value),
    });
  }

  function isAfterToday(field: string, name: string) {
    return Yup.string().test({
      message: vTrans.max(field, trans('GENERAL.TODAY')),
      name,
      test: (value) => moment().isAfter(value),
    });
  }

  return {
    arrayFileUploadRequired,
    fileRequired,
    fileUpload,
    fileUploadRequired,
    fileUploadRequiredIf,
    isAfterToday,
    isBeforeToday,
  };
}
