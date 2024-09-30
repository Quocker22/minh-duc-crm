import { getClientDateTime, transCFL } from '@/utils';

export enum AvailableValidationType {
  array = 'array',
  boolean = 'boolean',
  number = 'number',
  object = 'object',
  string = 'string',
}

interface IValidationTranslator {
  confirm: (field: string, isTranslateField: boolean) => string;
  matches: (field: string, isTranslateField: boolean) => string;
  max: (field: string, max: number, isTranslateField: boolean) => string;
  min: (field: string, min: number, isTranslateField: boolean) => string;
  required: (field: string, isTranslateField: boolean) => string;
  typeError: (
    field: string,
    type: AvailableValidationType,
    isTranslateField: boolean,
    isTranslateType: boolean
  ) => string;
}

class ValidationTranslator implements IValidationTranslator {
  public confirm(field: string, isTranslateField = true): string {
    if (isTranslateField) field = transCFL(field);

    return transCFL('VALIDATION.RULES.CONFIRM', { field });
  }

  public matches(field: string, isTranslateField = true): string {
    if (isTranslateField) field = transCFL(field);

    return transCFL('VALIDATION.RULES.MATCHES', { field });
  }

  public email(field: string, isTranslateField = true): string {
    if (isTranslateField) field = transCFL(field);

    return transCFL('VALIDATION.RULES.MATCHES', { field });
  }

  public max(field: string, max: number | string, isTranslateField = true): string {
    if (isTranslateField) field = transCFL(field);

    return transCFL('VALIDATION.RULES.MAX', { field, max });
  }

  public min(field: string, min: number | string, isTranslateField = true): string {
    if (isTranslateField) field = transCFL(field);

    return transCFL('VALIDATION.RULES.MIN', { field, min });
  }

  public minDate(field: string, min: string, isTranslateField = true): string {
    if (isTranslateField) field = transCFL(field);

    return transCFL('VALIDATION.RULES.MIN', { field, min: getClientDateTime(min) });
  }

  public maxDate(field: string, max: string, isTranslateField = true): string {
    if (isTranslateField) field = transCFL(field);

    return transCFL('VALIDATION.RULES.MAX', { field, max: getClientDateTime(max) });
  }

  public required(field: string, isTranslateField = true): string {
    if (isTranslateField) field = transCFL(field);

    return transCFL('VALIDATION.RULES.REQUIRED', { field });
  }

  public fileRequired(field: string, isTranslateField = true): string {
    if (isTranslateField) field = transCFL(field);

    return transCFL('VALIDATION.RULES.REQUIRED.FILE', { field });
  }

  public typeError(field: string, type: AvailableValidationType, isTranslateField = true): string {
    const types = {
      array: 'VALIDATION.RULES.TYPE.ARRAY',
      boolean: 'VALIDATION.RULES.TYPE.BOOLEAN',
      number: 'VALIDATION.RULES.TYPE.NUMBER',
      object: 'VALIDATION.RULES.TYPE.OBJECT',
      string: 'VALIDATION.RULES.TYPE.STRING',
    };

    if (isTranslateField) field = transCFL(field);

    return transCFL('VALIDATION.RULES.TYPE_ERROR', { field, type: transCFL(types[type]) });
  }
}

export const vTrans = new ValidationTranslator();
