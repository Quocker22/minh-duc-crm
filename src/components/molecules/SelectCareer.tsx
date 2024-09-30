import { useMemo } from 'react';

import { SelectField, SelectFieldProps } from '@/components/molecules/SelectField';
import { useGetMasterList } from '@/hooks/useGetMasterList';

type Props<IForm extends object> = SelectFieldProps<
  IForm,
  {
    id: string;
    value: string;
  }
>;

export const SelectCareer = <IForm extends object>(props: Props<IForm>) => {
  const { data, isLoading, isFetching } = useGetMasterList();
  const careerList = useMemo(() => data?.find((i) => i.id === 'NGANH-NGHE'), [data]);

  const selectProps = {
    autoFocus: props.autoFocus,
    className: props.className,
    classNameInputHint: props.classNameInputHint,
    clearable: props.clearable,
    control: props.control,
    disabled: props.disabled || isFetching,
    emptyOptionText: props.emptyOptionText,
    emptySearchResultText: props.emptySearchResultText,
    errorClass: props.errorClass,
    getOptionLabel: (option: { id: string; value: string }) => option.value,
    groupClass: props.groupClass,
    hint: props.hint,
    hintClass: props.hintClass,
    id: props.id,
    isLoading: props.isLoading || isLoading,
    label: props.label,
    labelClass: props.labelClass,
    name: props.name,
    options: careerList?.data || [],
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
