import clsx from 'clsx';

import { SelectField, SelectFieldProps } from '@/components/molecules/SelectField';
import { useGetDistrictList } from '@/hooks/useGetDistrictList';
import { DistrictModel } from '@/models';

type Props<IForm extends object> = SelectFieldProps<IForm, DistrictModel> & {
  readonly provinceCode?: string;
};

export const SelectDistrict = <IForm extends object>(props: Props<IForm>) => {
  const {
    data: districtList,
    isFetching,
    isLoading,
  } = useGetDistrictList(String(props.provinceCode) || '');

  function convertCodeToString(wards?: DistrictModel[]) {
    return wards?.map((ward) => ({
      ...ward, // copy the other properties
      code: ward.code.toString(), // convert the code to string
    }));
  }

  const selectProps = {
    autoFocus: props.autoFocus,
    className: clsx('rounded-pill', props.className),
    clearable: props.clearable,
    control: props.control,
    disabled: props.disabled || isFetching,
    emptyOptionText: props.emptyOptionText,
    emptySearchResultText: props.emptySearchResultText,
    errorClass: props.errorClass,
    getOptionLabel: (option: DistrictModel) => option.name,
    groupClass: props.groupClass,
    hint: props.hint,
    hintClass: props.hintClass,
    id: props.id,
    isLoading: props.isLoading || isLoading,
    label: props.label,
    labelClass: props.labelClass,
    name: props.name,
    options: convertCodeToString(districtList) || [],
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
