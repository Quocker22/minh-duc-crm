import { DatePicker } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import clsx from 'clsx';
import { isNil } from 'lodash-es';
import moment, { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import { FocusEventHandler, MouseEventHandler, ReactNode, useId, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { Control, Path, useController } from 'react-hook-form';

import { DateTimeFormat } from '@/constants';
import { DatePickerType } from '@/models';

type Props<IForm extends object> = {
  readonly name: Path<IForm>;
  readonly autofocus?: boolean;
  readonly className?: string;
  readonly control?: Control<IForm, object>;
  readonly disabled?: boolean;
  readonly errorClass?: string;
  readonly format?: string;
  readonly formatValue?: DateTimeFormat;
  readonly groupClass?: string;
  readonly hint?: ReactNode;
  readonly hintClass?: string;
  readonly id?: string;
  readonly label?: ReactNode;
  readonly labelClass?: string;
  readonly onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onChange?: (values: RangeValue<string>, formatString: [string, string]) => void;
  readonly onClick?: MouseEventHandler<HTMLDivElement>;
  readonly onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly picker?: DatePickerType;
  readonly placeholder?: [string, string];
  readonly required?: boolean;
  readonly showTime?: boolean;
  readonly size?: SizeType;
  readonly value?: RangeValue<string>;
};

const InputDateRangeField = <IForm extends object>(props: Props<IForm>) => {
  const controlId = useId();

  const { field, formState } = props.control
    ? useController({ control: props.control, name: props.name })
    : { field: undefined, formState: undefined };

  const errorMessage = (formState?.errors[props.name]?.message as string) || '';

  // convert to Moment
  const value: RangeValue<Moment> = useMemo(() => {
    const dateRange = !isNil(field?.value) ? field?.value : props.value;
    const from = dateRange?.[0] as moment.MomentInput;
    const to = dateRange?.[1] as moment.MomentInput;

    return [
      from ? moment(from, props.formatValue) : null,
      to ? moment(to, props.formatValue) : null,
    ];
  }, [field?.value, props.value, props.formatValue]);

  // convert to string
  function handleOnChange(values: RangeValue<Moment>, formatString: [string, string]) {
    const from = values?.[0];
    const to = values?.[1];
    const dateRange: RangeValue<string> = [
      from ? moment(from).format(props.formatValue) : null,
      to ? moment(to).format(props.formatValue) : null,
    ];
    field?.onChange(dateRange, formatString);
    props.onChange?.(dateRange, formatString);
  }

  return (
    <Form.Group className={clsx('input-date-range-field', props.groupClass)} controlId={controlId}>
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>
      <DatePicker.RangePicker
        {...field}
        allowEmpty={[true, true]}
        autoFocus={props.autofocus}
        className={clsx(!!errorMessage && 'is-invalid', props.className)}
        disabled={props.disabled}
        format={props.format}
        id={props.id}
        onBlur={(e) => {
          field?.onBlur();
          props.onBlur?.(e);
        }}
        onChange={handleOnChange}
        onClick={props.onClick}
        onFocus={props.onFocus}
        picker={props.picker}
        placeholder={props.placeholder}
        showTime={props.showTime}
        size={props.size}
        status={errorMessage ? 'error' : ''}
        value={value}
      />
      <Form.Text className={clsx('text-muted', props.hintClass)}>{props.hint}</Form.Text>
      <Form.Control.Feedback className={clsx(props.errorClass)} type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

InputDateRangeField.defaultProps = { size: 'large' };

export { InputDateRangeField };
