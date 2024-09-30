import * as Yup from 'yup';

import { useValidation } from '@/hooks/useValidation';
import { Shape } from '@/models';
import { FormRecruitmentPlanModel } from '@/modules/recruitment-plan/models';
import { trans } from '@/utils';

const { stringRequired, numberRequired } = useValidation('VALIDATION.FIELD.RECRUITMENT');

function getRecruitmentFormSchema() {
  return Yup.object<Shape<FormRecruitmentPlanModel>>({
    academic_level_id: stringRequired('ACADEMIC_LEVEL'),
    age_range_max: numberRequired('AGE_RANGE_MAX').min(
      Yup.ref('age_range_min'),
      trans('VALIDATION.RULES.MIN', {
        field: trans('VALIDATION.FIELD.RECRUITMENT.AGE_RANGE_MAX'),
        min: trans('VALIDATION.FIELD.RECRUITMENT.AGE_RANGE_MIN'),
      })
    ),
    age_range_min: numberRequired('AGE_RANGE_MIN').test(
      'is-less-than-max',
      trans('VALIDATION.RULES.MAX', {
        field: trans('VALIDATION.FIELD.RECRUITMENT.AGE_RANGE_MIN'),
        max: trans('VALIDATION.FIELD.RECRUITMENT.AGE_RANGE_MAX'),
      }),
      function (value) {
        const ageRangeMax = this.parent.age_range_max;
        if (value !== undefined && ageRangeMax !== undefined) {
          return value < ageRangeMax;
        }

        return true; // Return true if either value or ageRangeMax is undefined
      }
    ),
    career_id: stringRequired('CAREER'),
    customer_id: stringRequired('CUSTOMER'),
    degree_id: stringRequired('DEGREE'),
    end_date: stringRequired('END_DATE'),
    experience: numberRequired('EXPERIENCE'),
    gender_percentage: Yup.object<
      Shape<{
        female: number;
        male: number;
      }>
    >({
      female: numberRequired('GENDER_PERCENTAGE_FEMALE'),
      male: numberRequired('GENDER_PERCENTAGE_MALE'),
    }),
    name: stringRequired('NAME'),
    position_id: stringRequired('POSITION'),
    quantity: numberRequired('QUANTITY'),
    salary: numberRequired('SALARY'),
    start_date: stringRequired('START_DATE'),
  });
}

export { getRecruitmentFormSchema };
