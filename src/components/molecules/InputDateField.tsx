import { DatePicker } from 'antd';
import clsx from 'clsx';
import { isNil } from 'lodash-es';
import moment, { Moment } from 'moment';
import { useId, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { Control, Path, useController } from 'react-hook-form';

import { DatePickerType } from '@/models';

type Props<IForm extends object> = {
  readonly name: Path<IForm>;
  readonly allowClear?: boolean;
  readonly autofocus?: boolean;
  readonly className?: string;
  readonly classNameInputHint?: string;
  readonly control?: Control<IForm, object>;
  readonly disabled?: boolean;
  readonly disabledDate?: (date: Moment) => boolean;
  readonly errorClass?: string;
  readonly format?: string;
  readonly formatValue?: string;
  readonly groupClass?: string;
  readonly hint?: React.ReactNode;
  readonly hintClass?: string;
  readonly id?: string;
  readonly isHideRoundedPill?: boolean;
  readonly label?: React.ReactNode;
  readonly labelClass?: string;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onChange?: (date: string | undefined, dateString: string) => void;
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly picker?: DatePickerType;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly showTime?: boolean;
  readonly size?: 'large' | 'middle' | 'small' | undefined;
  readonly value?: string;
};

const InputDateField = <IForm extends object>(props: Props<IForm>) => {
  const { field, formState } = props.control
    ? useController({ control: props.control, name: props.name })
    : { field: undefined, formState: undefined };

  const errorMessage = (formState?.errors[props.name]?.message as string) || '';

  // convert to Moment
  const value = useMemo(() => {
    const date = !isNil(field?.value) ? field?.value : props.value;

    return date ? moment(date, props.formatValue) : null;
  }, [field?.value, props.value]);

  // convert to string
  function handleOnChange(value: Moment | null, dateString: string) {
    const newDate = value?.format(props.formatValue);
    field?.onChange(newDate, dateString);
    props.onChange?.(newDate, dateString);
  }

  const controlId = useId();

  return (
    <Form.Group
      className={clsx(props.groupClass)}
      controlId={controlId}
      data-testid="input-date-field-element"
    >
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>
      <div className={clsx('p-0', props.classNameInputHint)}>
        <DatePicker
          {...field}
          allowClear={props.allowClear}
          autoFocus={props.autofocus}
          className={clsx(
            !!errorMessage && 'is-invalid',
            !props.isHideRoundedPill && 'rounded-pill',
            props.className
          )}
          disabled={props.disabled}
          disabledDate={props.disabledDate}
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
          status={errorMessage ? 'error' : undefined}
          value={value}
        />
        <Form.Text className={clsx('text-muted', props.hintClass)}>{props.hint}</Form.Text>
        <Form.Control.Feedback className={clsx(props.errorClass)} type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
};

InputDateField.defaultProps = { size: 'large' };

export { InputDateField };
