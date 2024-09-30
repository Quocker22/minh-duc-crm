import { Radio } from 'antd';
import { CheckboxChangeEvent, CheckboxOptionType } from 'antd/lib/checkbox';
import clsx from 'clsx';
import { MouseEventHandler, ReactNode, useId } from 'react';
import { Form } from 'react-bootstrap';
import { Control, Path, useController } from 'react-hook-form';

import { WithChildren } from '@/_metronic/helpers';

type Props<IForm extends object> = {
  readonly name: Path<IForm>;
  readonly options: Array<CheckboxOptionType | string | number>;
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
  readonly style?: React.CSSProperties;
};

const RadioField = <IForm extends object>(props: Props<IForm> & WithChildren) => {
  const controlId = useId();

  const { field, formState } = props.control
    ? useController({ control: props.control, name: props.name })
    : { field: undefined, formState: undefined };
  const errorMessage = (formState?.errors[props.name]?.message as string) || '';

  return (
    <Form.Group className={clsx(props.groupClass)} controlId={controlId}>
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>

      <Radio.Group
        className={props.className}
        disabled={props.disabled}
        id={props.id}
        {...field}
        onChange={(e) => {
          field?.onChange(e);
          props.onChange?.(e);
        }}
        options={props.options}
        style={props?.style}
      >
        {props.children}
      </Radio.Group>

      <Form.Text className={clsx('text-muted', props.hintClass)}>{props.hint}</Form.Text>
      <Form.Control.Feedback className={clsx(props.errorClass)} type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export { RadioField };
