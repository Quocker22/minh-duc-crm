import { SelectField, SelectFieldProps } from '@/components/molecules/SelectField';
import { useGetwardList } from '@/hooks/useGetwardList';
import { WardModel } from '@/models';

type Props<IForm extends object> = SelectFieldProps<IForm, WardModel> & {
  readonly districtCode?: string;
};

export const SelectWard = <IForm extends object>(props: Props<IForm>) => {
  const {
    data: wardList,
    isFetching,
    isLoading,
  } = useGetwardList(String(props.districtCode) || '');

  function convertCodeToString(wards?: WardModel[]) {
    return wards?.map((ward) => ({
      ...ward, // copy the other properties
      code: ward.code.toString(), // convert the code to string
    }));
  }

  const selectProps = {
    autoFocus: props.autoFocus,
    className: props.className,
    clearable: props.clearable,
    control: props.control,
    disabled: props.disabled || isFetching,
    emptyOptionText: props.emptyOptionText,
    emptySearchResultText: props.emptySearchResultText,
    errorClass: props.errorClass,
    getOptionLabel: (option: WardModel) => option.name,
    groupClass: props.groupClass,
    hint: props.hint,
    hintClass: props.hintClass,
    id: props.id,
    isLoading: props.isLoading || isLoading,
    label: props.label,
    labelClass: props.labelClass,
    name: props.name,
    options: convertCodeToString(wardList) || [],
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
