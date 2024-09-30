import { SelectField, SelectFieldProps } from '@/components/molecules/SelectField';
import { useGetCustomerList } from '@/modules/customer/hooks/useGetCustomerList';
import { CustomerModel } from '@/modules/customer/models';

type Props<IForm extends object> = SelectFieldProps<IForm, CustomerModel> & {
  queryFilter?: string;
};
export const SelectCustomer = <IForm extends object>(props: Props<IForm>) => {
  const { data: customerList, isLoading, isFetching } = useGetCustomerList(props.queryFilter || '');

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
    getOptionLabel: (option: CustomerModel) => option.name,
    groupClass: props.groupClass,
    hint: props.hint,
    hintClass: props.hintClass,
    id: props.id,
    isLoading: props.isLoading || isLoading,
    label: props.label,
    labelClass: props.labelClass,
    name: props.name,
    options: customerList?.rows || [],
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
