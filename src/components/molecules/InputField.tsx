import { Input } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import clsx from 'clsx';
import { isNil } from 'lodash-es';
import {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  FocusEvent,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useId,
  useMemo,
} from 'react';
import { Form } from 'react-bootstrap';
import { Control, Path, useController } from 'react-hook-form';

type IProps<IForm extends object> = {
  readonly name: Path<IForm>;
  readonly addonAfter?: ReactNode;
  readonly allowClear?: boolean;
  readonly autoComplete?: boolean;
  readonly autofocus?: boolean;
  readonly className?: string;
  readonly classNameInputHint?: string;
  readonly control?: Control<IForm, object>;
  readonly disabled?: boolean;
  readonly errorClass?: string;
  readonly groupClass?: string;
  readonly hint?: ReactNode;
  readonly hintClass?: string;
  readonly id?: string;
  readonly isHideRoundedPill?: boolean;
  readonly label?: ReactNode;
  readonly labelClass?: string;
  readonly max?: number;
  readonly maxLength?: number;
  readonly min?: number;
  readonly objectValidation?: string;
  readonly onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onClick?: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onInput?: FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onPressEnter?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly pattern?: string;
  readonly placeholder?: string;
  readonly readOnly?: boolean;
  readonly required?: boolean;
  readonly rows?: number;
  readonly showCount?: boolean;
  readonly size?: SizeType;
  readonly style?: CSSProperties;
  readonly suffix?: ReactNode;
  readonly value?: string | number | string[] | undefined;
} & (
  | {
      readonly type: 'textarea';
      readonly autoSize?: boolean;
      readonly onResize?: (dimension: { height: number; width: number }) => void;
      readonly prefix?: string;
    }
  | { readonly type: 'password'; readonly prefix?: ReactNode; readonly visibilityToggle?: boolean }
  | {
      readonly type: 'search';
      readonly enterButton?: ReactNode;
      readonly loading?: boolean;
      readonly onSearch?: (
        value: string,
        event?:
          | React.ChangeEvent<HTMLInputElement>
          | React.MouseEvent<HTMLElement>
          | React.KeyboardEvent<HTMLInputElement>
      ) => void;
      readonly prefix?: ReactNode;
    }
  | {
      readonly prefix?: ReactNode;
      readonly type?:
        | 'button'
        | 'checkbox'
        | 'color'
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'file'
        | 'hidden'
        | 'image'
        | 'month'
        | 'number'
        | 'radio'
        | 'range'
        | 'reset'
        | 'submit'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week'
        | 'datetime';
    }
);

const InputField = <IForm extends object>(props: IProps<IForm>) => {
  const controlId = useId();
  const { field, formState } = props.control
    ? useController({ control: props.control, name: props.name })
    : { field: undefined, formState: undefined };
  const errorMessage = (formState?.errors[props.name]?.message as string) || '';

  const value = useMemo(
    () => (!isNil(field?.value) ? field?.value : props.value || ''),
    [field?.value, props.value]
  );

  const inputProps = {
    ...field,
    addonAfter: props.addonAfter,
    autoComplete: props.autoComplete ? 'on' : 'off',
    autoFocus: props.autofocus,
    className: clsx(
      !!errorMessage && 'is-invalid',
      !props.isHideRoundedPill && 'rounded-pill',
      props.className
    ),
    disabled: props.disabled,
    id: props.id,
    max: props.max,
    maxLength: props.maxLength,
    min: props.min,
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      field?.onBlur();
      props.onBlur?.(e);
    },
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      field?.onChange(e);
      props.onChange?.(e);
    },
    onClick: props.onClick,
    onFocus: props.onFocus,
    onInput: props.onInput,
    onPressEnter: props.onPressEnter,
    pattern: props.pattern,
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    showCount: props.showCount,
    size: props.size,
    style: props.style,
    suffix: props.suffix,
    type: props.type,
    value,
  };

  return (
    <Form.Group className={clsx(props.groupClass)} controlId={controlId}>
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>
      <div className={clsx('p-0', props.classNameInputHint)}>
        {(() => {
          switch (props.type) {
            case 'textarea':
              return (
                <Input.TextArea
                  {...inputProps}
                  autoSize={props.autoSize}
                  className="rounded-3"
                  onResize={props.onResize}
                  prefix={props.prefix}
                  rows={props.rows}
                  status={errorMessage ? 'error' : ''}
                />
              );

            case 'password':
              return (
                <Input.Password
                  {...inputProps}
                  allowClear={props.allowClear}
                  prefix={props.prefix}
                  status={errorMessage ? 'error' : ''}
                  visibilityToggle={props.visibilityToggle}
                />
              );

            case 'search':
              return (
                <Input.Search
                  {...inputProps}
                  allowClear={props.allowClear}
                  enterButton={props.enterButton}
                  loading={props.loading}
                  onSearch={props.onSearch}
                  prefix={props.prefix}
                  status={errorMessage ? 'error' : ''}
                />
              );

            default:
              return (
                <Input
                  {...inputProps}
                  allowClear={props.allowClear}
                  prefix={props.prefix}
                  status={errorMessage ? 'error' : ''}
                />
              );
          }
        })()}
        <Form.Text className={clsx('text-muted', props.hintClass)}>{props.hint}</Form.Text>
        {props.type === 'textarea' && <div className="ps-5 text-danger">{errorMessage}</div>}{' '}
        <Form.Control.Feedback className={clsx('ps-5', props.errorClass)} type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
};

InputField.defaultProps = {
  allowClear: true,
  autoComplete: true,
  size: 'large',
  type: 'text',
  visibilityToggle: true,
};

export { InputField };
