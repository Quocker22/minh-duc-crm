import { arrayRules } from '@/hooks/useValidation/array';
import { booleanRules } from '@/hooks/useValidation/boolean';
import { dateRules } from '@/hooks/useValidation/date';
import { fileRules } from '@/hooks/useValidation/file';
import { numberRules } from '@/hooks/useValidation/number';
import { stringRules } from '@/hooks/useValidation/string';

export function useValidation(fieldPrefix: string) {
  return {
    ...stringRules(fieldPrefix),
    ...numberRules(fieldPrefix),
    ...booleanRules(fieldPrefix),
    ...arrayRules(fieldPrefix),
    ...fileRules(fieldPrefix),
    ...dateRules(fieldPrefix),
  };
}
