import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  FormEventHandler,
  MouseEventHandler,
} from 'react';

import { KTSVG } from '@/_metronic/helpers';
import { InputField } from '@/components/molecules/InputField';
import { trans } from '@/utils';

interface IProps {
  readonly isSearch?: boolean;
  readonly onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onClick?: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onInput?: FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly placeholder?: string;
  readonly value?: string | number | string[] | undefined;
}

const TableGlobalSearch: FC<IProps> = (props) => {
  return (
    <div className="card-title">
      {/* begin::Search */}
      <InputField
        groupClass="w-100"
        name="search"
        onBlur={props.onBlur}
        onChange={props.onChange}
        onClick={props.onClick}
        onFocus={props.onFocus}
        onInput={props.onInput}
        placeholder={props.placeholder || trans('TABLE.GLOBAL_SEARCH')}
        prefix={<KTSVG className="svg-icon-1" path="/media/icons/duotune/general/gen021.svg" />}
        type={props.isSearch ? 'search' : undefined}
        value={props.value}
      />
      {/* end::Search */}
    </div>
  );
};

export { TableGlobalSearch };
