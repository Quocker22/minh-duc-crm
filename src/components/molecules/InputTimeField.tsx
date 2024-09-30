import { ConfigProvider, TimePicker } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import clsx from 'clsx';
import { isNil } from 'lodash-es';
import moment, { Moment } from 'moment';
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
  readonly disabledDate?: boolean;
  readonly errorClass?: string;
  readonly format?: string;
  readonly formatValue?: DateTimeFormat;
  readonly groupClass?: string;
  readonly hint?: ReactNode;
  readonly hintClass?: string;
  readonly id?: string;
  readonly isHideRoundedPill?: boolean;
  readonly label?: ReactNode;
  readonly labelClass?: string;
  readonly onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onChange?: (date: string | undefined, dateString: string) => void;
  readonly onClick?: MouseEventHandler<HTMLDivElement>;
  readonly onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly picker?: DatePickerType;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly showTime?: boolean;
  readonly size?: SizeType;
  readonly value?: string;
};

const InputTimeField = <IForm extends object>(props: Props<IForm>) => {
  const controlId = useId();

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
      <ConfigProvider>
        <TimePicker
          {...field}
          autoFocus={props.autofocus}
          className={clsx(!!errorMessage && 'is-invalid', 'rounded-pill', props.className)}
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
          placeholder={props.placeholder}
          showNow={false}
          size={props.size}
          status={errorMessage ? 'error' : ''}
          value={value}
        />
      </ConfigProvider>
      <Form.Text className={clsx('text-muted', props.hintClass)}>{props.hint}</Form.Text>
      <Form.Control.Feedback className={clsx(props.errorClass)} type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

InputTimeField.defaultProps = { size: 'large' };

export { InputTimeField };
