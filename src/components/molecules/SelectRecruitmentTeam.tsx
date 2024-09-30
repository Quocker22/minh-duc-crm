import clsx from 'clsx';

import { SelectField, SelectFieldProps } from '@/components/molecules/SelectField';
import { useGetRecruitmentTeamsList } from '@/modules/hr-management/hooks/useGetRecruitmentTeamsList';
import { RecruitmentTeamsModel } from '@/modules/hr-management/models';

type Props<IForm extends object> = SelectFieldProps<IForm, RecruitmentTeamsModel>;

export const SelectRecruitmentTeam = <IForm extends object>(props: Props<IForm>) => {
  const { data: recruitmentTeamsList, isFetching, isLoading } = useGetRecruitmentTeamsList();

  const selectProps = {
    autoFocus: props.autoFocus,
    className: clsx('rounded-pill', props.className),
    clearable: props.clearable,
    control: props.control,
    disabled: props.disabled || isFetching,
    emptyOptionText: props.emptyOptionText,
    emptySearchResultText: props.emptySearchResultText,
    errorClass: props.errorClass,
    getOptionLabel: (option: RecruitmentTeamsModel) => option.name,
    groupClass: props.groupClass,
    hint: props.hint,
    hintClass: props.hintClass,
    id: props.id,
    isLoading: props.isLoading || isLoading,
    label: props.label,
    labelClass: props.labelClass,
    name: props.name,
    options: recruitmentTeamsList?.rows || [],
    placeholder: props.placeholder,
    required: props.required,
    rtl: props.rtl,
    searchable: props.searchable,
    solid: props.solid,
  };

  if (props.multiple && !props.getOptionValue) {
    return <SelectField {...selectProps} onChange={props.onChange} value={props.value} multiple />;
  }

  if (!props.multiple && !props.getOptionValue) {
    return <SelectField {...selectProps} onChange={props.onChange} value={props.value} />;
  }

  if (!props.multiple && props.getOptionValue) {
    return (
      <SelectField
        {...selectProps}
        getOptionValue={props.getOptionValue}
        onChange={props.onChange}
        value={props.value}
      />
    );
  }

  return (
    <SelectField
      {...selectProps}
      getOptionValue={props.getOptionValue}
      onChange={props.onChange}
      value={props.value}
      multiple
    />
  );
};
