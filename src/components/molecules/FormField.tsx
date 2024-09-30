import clsx from 'clsx';
import { KeyboardEventHandler } from 'react';
import { Form } from 'react-bootstrap';
import { FieldErrors, FormProvider, SubmitErrorHandler, UseFormReturn } from 'react-hook-form';

import { WithChildren } from '@/_metronic/helpers';
import { IS_PRODUCTION_MODE } from '@/constants';

interface IProps<IForm extends object> extends WithChildren {
  readonly methods: UseFormReturn<IForm, object>;
  readonly onSubmit: (data: IForm, event?: React.BaseSyntheticEvent) => void;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly onInvalid?: (errors: FieldErrors<IForm>, event?: React.BaseSyntheticEvent) => void;
  readonly onKeyDown?: KeyboardEventHandler<HTMLFormElement>;
}

const FormField = <IForm extends object>(props: IProps<IForm>) => {
  const handleOnInvalid: SubmitErrorHandler<IForm> = (errors, event) => {
    !IS_PRODUCTION_MODE && console.log(errors);
    props.onInvalid?.(errors, event);
  };

  return (
    <FormProvider {...props.methods}>
      <Form
        className={clsx(props.className)}
        onKeyDown={props.onKeyDown}
        onSubmit={props.methods.handleSubmit(props.onSubmit, handleOnInvalid)}
        noValidate
      >
        <fieldset disabled={props.disabled}>{props.children}</fieldset>
      </Form>
    </FormProvider>
  );
};

export { FormField };
