/* eslint-disable lines-around-comment */
import clsx from 'clsx';
import { isArray, isFunction, isNil } from 'lodash-es';
import { FocusEvent, FocusEventHandler, ReactNode, useId, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { Control, Path, useController } from 'react-hook-form';
import Select, {
  ActionMeta,
  FormatOptionLabelMeta,
  GetOptionLabel,
  GetOptionValue,
  GroupBase,
  InputActionMeta,
  MultiValue,
  PropsValue,
  SingleValue,
  StylesConfig,
} from 'react-select';
import { SelectComponents } from 'react-select/dist/declarations/src/components';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';

import { fuzzyFilter, trans } from '@/utils';

export type SelectFieldProps<IForm extends object, Option> = {
  readonly name: Path<IForm>;
  readonly autoFocus?: boolean;
  readonly className?: string;
  readonly classNameInputHint?: string;
  readonly clearable?: boolean;
  readonly components?: Partial<SelectComponents<Option, boolean, GroupBase<Option>>>;
  readonly control?: Control<IForm, object>;
  readonly defaultValue?: PropsValue<Option>;
  readonly disabled?: boolean;
  readonly emptyOptionText?: string;
  readonly emptySearchResultText?: string;
  readonly errorClass?: string;
  readonly formatOptionLabel?: (
    data: Option,
    formatOptionLabelMeta: FormatOptionLabelMeta<Option>
  ) => ReactNode;
  readonly getOptionLabel?: any;
  readonly groupClass?: string;
  readonly hint?: ReactNode;
  readonly hintClass?: string;
  readonly id?: string;
  readonly isLoading?: boolean;
  readonly isOptionDisabled?: (option: Option) => boolean;
  readonly label?: ReactNode;
  readonly labelClass?: string;
  readonly onBlur?: FocusEventHandler<HTMLInputElement>;
  readonly onFocus?: FocusEventHandler<HTMLInputElement>;
  readonly onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  readonly options?: Option[];
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly rtl?: boolean;

  // right to left
  readonly searchable?: boolean;
  readonly size?: string;
  readonly solid?: boolean;
} & (
  | {
      readonly getOptionValue: GetOptionValue<Option>;
      readonly multiple: true;
      readonly onChange?: (newValue: string[], actionMeta: ActionMeta<Option>) => void;
      readonly value?: string[];
    }
  | {
      readonly getOptionValue: GetOptionValue<Option>;
      readonly multiple?: false;
      readonly onChange?: (newValue: string | null, actionMeta: ActionMeta<Option>) => void;
      readonly value?: string;
    }
  | {
      readonly multiple: true;
      readonly getOptionValue?: undefined;
      readonly onChange?: (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
      readonly value?: MultiValue<Option>;
    }
  | {
      readonly getOptionValue?: undefined;
      readonly multiple?: false;
      readonly onChange?: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
      readonly value?: SingleValue<Option>;
    }
);

const SelectField = <IForm extends object, Option>(props: SelectFieldProps<IForm, Option>) => {
  const controlId = useId();
  const styles = useMemo(() => getStyles<Option>(props.solid), [props.solid]);
  const { field, formState } = props.control
    ? useController({ control: props.control, name: props.name })
    : { field: undefined, formState: undefined };
  const errorMessage = (formState?.errors[props.name]?.message as string) || '';
  const value = useMemo(
    () =>
      maskValue(
        !isNil(field?.value) ? field?.value : props.value,
        props.options,
        props.getOptionValue
      ),
    [field?.value, props.value, props.options, props.getOptionValue]
  );

  const placeholder = props.placeholder || trans('AT_SELECT.PLACEHOLDER');
  const emptyOptionText = props.emptyOptionText || trans('AT_SELECT.EMPTY_OPTION_TEXT');
  const emptySearchResultText =
    props.emptySearchResultText || trans('AT_SELECT.EMPTY_SEARCH_RESULT_TEXT');

  function handleOnChange(
    newValue: MultiValue<Option> | SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) {
    const value = formatValue(newValue, props.options, props.getOptionValue);
    field?.onChange(value, actionMeta);

    // @ts-expect-error: TS2345 because the value has been calculated by formatValue
    props.onChange?.(value, actionMeta);
  }

  function handleOnBlur(e: FocusEvent<HTMLInputElement, Element>) {
    field?.onBlur();
    props.onBlur?.(e);
  }

  return (
    <Form.Group className={clsx(props.groupClass)} controlId={controlId}>
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>
      <div className={clsx('p-0', props.classNameInputHint)}>
        <Select
          {...field}
          autoFocus={props.autoFocus}
          className={clsx(
            props.solid && 'solid',
            { 'is-invalid': !!errorMessage },
            props.className
          )}
          classNamePrefix="_select"
          closeMenuOnSelect={!props.multiple}
          components={props.components}
          defaultValue={props.defaultValue}
          filterOption={(option, input) => filterOption(option, input, props.getOptionLabel)}
          formatOptionLabel={props.formatOptionLabel}
          getOptionLabel={props.getOptionLabel}
          getOptionValue={props.getOptionValue}
          id={props.id}
          isClearable={props.clearable}
          isDisabled={props.disabled}
          isLoading={props.isLoading}
          isMulti={props.multiple}
          isOptionDisabled={props.isOptionDisabled}
          isRtl={props.rtl}
          isSearchable={props.searchable}
          noOptionsMessage={(obj) => (obj.inputValue ? emptySearchResultText : emptyOptionText)}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onFocus={props.onFocus}
          onInputChange={props.onInputChange}
          options={props.options}
          placeholder={placeholder}
          styles={styles}
          value={value}
        />
        <Form.Text className={clsx('text-muted', props.hintClass)}>{props.hint}</Form.Text>
        <Form.Control.Feedback
          className={clsx(errorMessage && 'd-block', 'ps-4', props.errorClass)}
          type="invalid"
        >
          {errorMessage}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
};

SelectField.defaultProps = {
  allowClear: true,
  size: 'middle',
};

export { SelectField };

function filterOption<Option>(
  option: FilterOptionOption<Option>,
  input: string,
  mask?: GetOptionLabel<Option>
) {
  const label = isFunction(mask) ? mask(option.data) : option.label;

  return fuzzyFilter(input, label);
}

function formatValue<Option>(
  newValue: MultiValue<Option> | SingleValue<Option>,
  options?: Option[],
  getOptionValue?: GetOptionValue<Option>
) {
  if (!newValue || !getOptionValue) return newValue;

  const newOptions = options?.map((o) => getOptionValue(o)).filter((o) => !isNil(o)) || [];

  if (!isArray(newValue)) {
    return newOptions?.find((o) => o === getOptionValue(newValue as NonNullable<Option>)) || null;
  }

  const values = newValue.map((o) => getOptionValue(o)).filter((o) => !isNil(o));

  return newOptions?.filter((o) => values.includes(o));
}

function maskValue<Option>(
  value?: string | string[] | SingleValue<Option> | MultiValue<Option>,
  options?: Option[],
  getOptionValue?: GetOptionValue<Option>
): SingleValue<Option> | MultiValue<Option> {
  if (!getOptionValue || !value || !options) {
    return value as SingleValue<Option> | MultiValue<Option>;
  }

  if (isArray(value)) {
    return options.filter((o) => value.includes(getOptionValue(o))) || [];
  }

  return options.find((o) => getOptionValue(o) === value) || null;
}

function getStyles<Option>(solid?: boolean): StylesConfig<Option, boolean, GroupBase<Option>> {
  const color = {
    normal: {
      backgroundColor: 'var(--kt-input-bg)',
      borderColor: 'var(--kt-input-border-color)',
      color: 'var(--kt-input-color)',
      focus: {
        backgroundColor: 'var(--kt-input-focus-bg)',
        borderColor: 'var(--kt-input-focus-border-color)',
        color: 'var(--kt-input-focus-color)',
      },
    },
    solid: {
      backgroundColor: 'var(--kt-input-solid-bg)',
      borderColor: 'var(--kt-input-solid-bg)',
      color: 'var(--kt-input-solid-color)',
      focus: {
        backgroundColor: 'var(--kt-input-solid-bg-focus)',
        borderColor: 'var(--kt-input-solid-bg-focus)',
        color: 'var(--kt-input-solid-color)',
      },
    },
  };

  return {
    control: (styles) => ({
      ...styles,
      ':hover': {
        borderColor: color[solid ? 'solid' : 'normal'].focus.borderColor,
        borderWidth: '0.5px',
        boxShadow: '0 0 0 0.5px var(--kt-input-focus-border-color)',
      },
      //   backgroundColor: color[solid ? 'solid' : 'normal'].backgroundColor,
      borderColor: color[solid ? 'solid' : 'normal'].borderColor,
      borderRadius: '0.475rem',
      borderWidth: '0.5px',
      boxShadow: `0 0 0 0.5px ${color[solid ? 'solid' : 'normal'].borderColor}`,
      color: color[solid ? 'solid' : 'normal'].color,
      minHeight: 'calc(0.610rem * 2 + 1.1rem * 1.5 + 1px * 2)',
    }),
    input: (styles) => ({
      ...styles,
      color: color[solid ? 'solid' : 'normal'].color,
      fontSize: '1.1rem',
      fontWeight: '500',
    }),
    menu: (styles) => ({
      ...styles,
      zIndex: 9999, // Giá trị z-index tùy chọn, bạn có thể điều chỉnh theo nhu cầu
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: 'var(--kt-primary-light)',
      color: 'var(--kt-primary)',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--kt-primary)',
      fontWeight: '500',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      ':hover': { backgroundColor: 'var(--kt-primary)', color: '#fff' },
    }),
    noOptionsMessage: (styles) => ({
      ...styles,
      color: color[solid ? 'solid' : 'normal'].color,
      fontSize: '1.1rem',
      fontWeight: '500',
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      ':hover': { backgroundColor: 'var(--kt-primary)', color: '#fff' },
      backgroundColor: isDisabled
        ? color[solid ? 'solid' : 'normal'].backgroundColor
        : isSelected
        ? 'var(--kt-primary-light)'
        : isFocused
        ? 'var(--kt-primary)'
        : undefined,
      color: isDisabled
        ? 'var(--kt-input-solid-color)'
        : isSelected
        ? 'var(--kt-primary)'
        : isFocused
        ? '#fff'
        : color[solid ? 'solid' : 'normal'].color,
      fontSize: '1.1rem',
      fontWeight: '500',
    }),
    placeholder: (styles) => ({
      ...styles,
      color: '#A1A5B7',
      fontSize: '1.1rem',
      fontWeight: '500',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: color[solid ? 'solid' : 'normal'].color,
      fontSize: '1.1rem',
      fontWeight: '500',
    }),
  };
}
