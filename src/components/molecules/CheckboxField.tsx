import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import clsx from 'clsx';
import { MouseEventHandler, ReactNode, useId } from 'react';
import { Form } from 'react-bootstrap';
import { Control, Path, useController } from 'react-hook-form';

import { WithChildren } from '@/_metronic/helpers';

type Props<IForm extends object> = {
  readonly name: Path<IForm>;
  readonly autofocus?: boolean;
  readonly checked?: boolean;
  readonly className?: string;
  readonly control?: Control<IForm, object>;
  readonly disabled?: boolean;
  readonly errorClass?: string;
  readonly groupClass?: string;
  readonly hint?: ReactNode;
  readonly hintClass?: string;
  readonly id?: string;
  readonly indeterminate?: boolean;
  readonly label?: ReactNode;
  readonly labelClass?: string;
  readonly onChange?: (e: CheckboxChangeEvent) => void;
  readonly onClick?: MouseEventHandler<HTMLElement>;
  readonly required?: boolean;
};

const CheckboxField = <IForm extends object>(props: Props<IForm> & WithChildren) => {
  const controlId = useId();

  const { field, formState } = props.control
    ? useController({ control: props.control, name: props.name })
    : { field: undefined, formState: undefined };
  const errorMessage = (formState?.errors[props.name]?.message as string) || '';

  return (
    <Form.Group
      className={clsx(props.groupClass)}
      controlId={controlId}
      data-testid="checkbox-field-element"
    >
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>

      <Checkbox
        {...field}
        autoFocus={props.autofocus}
        checked={field?.value || props.checked}
        className={clsx(!!errorMessage && 'is-invalid', props.className)}
        disabled={props.disabled}
        id={props.id}
        indeterminate={props.indeterminate}
        onChange={(e) => {
          field?.onChange(e);
          props.onChange?.(e);
        }}
        onClick={props.onClick}
      >
        {props.children}
      </Checkbox>

      <Form.Text className={clsx('text-muted', props.hintClass)}>{props.hint}</Form.Text>
      <Form.Control.Feedback className={clsx(props.errorClass)} type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export { CheckboxField };
