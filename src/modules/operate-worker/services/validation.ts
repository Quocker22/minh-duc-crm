import * as Yup from 'yup';

import { useValidation } from '@/hooks/useValidation';
import { Shape } from '@/models';
import { FormRecruitmentPlanModel } from '@/modules/recruitment-plan/models';

const { stringRequired, numberRequired } = useValidation('VALIDATION.FIELD.RECRUITMENT');

function getRecruitmentFormSchema() {
  return Yup.object<Shape<FormRecruitmentPlanModel>>({
    academic_level_id: stringRequired('ACADEMIC_LEVEL'),
    age_range: Yup.object<
      Shape<{
        max: number;
        min: number;
      }>
    >({
      max: numberRequired('AGE_RANGE_MAX'),
      min: numberRequired('AGE_RANGE_MIN'),
    }),
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
    other_requirement_id: stringRequired('OTHER_REQUIREMENT'),
    position_id: stringRequired('POSITION'),
    quantity: numberRequired('QUANTITY'),
    salary: numberRequired('SALARY'),
    start_date: stringRequired('START_DATE'),
  });
}

export { getRecruitmentFormSchema };
