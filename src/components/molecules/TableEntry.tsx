import clsx from 'clsx';
import { FC } from 'react';
import { SingleValue } from 'react-select';

import { SelectField } from '@/components/molecules/SelectField';
import { LimitOption } from '@/models';
import { trans } from '@/utils';

interface IProps {
  readonly currentPage?: number;
  readonly limit?: number;
  readonly onChange?: (limit: LimitOption) => void;
  readonly total?: number;
}

const limitOptions: { label: string | number; value: LimitOption }[] = [
  { label: 20, value: 20 },
  { label: 50, value: 50 },
  { label: 100, value: 100 },
  { label: 500, value: 500 },
  { label: 1000, value: 1000 },
];

const TableEntry: FC<IProps> = (props) => {
  const limit = Number(props.limit);
  const from = (Number(props.currentPage) - 1) * limit;
  const to = from + limit;
  const selected = limitOptions.find((o) => o.value === limit);

  function handleOnChange(e: SingleValue<{ label: string | number; value: LimitOption }>) {
    const value = e?.value;
    value && props.onChange?.(value);
  }

  return (
    <div className="d-flex align-items-center">
      <div className="dataTables_length">
        <SelectField
          name="limit"
          onChange={handleOnChange}
          options={limitOptions}
          searchable={false}
          value={selected}
        />
      </div>
      <div
        aria-live="polite"
        className={clsx('dataTables_info text-gray-700', {
          'd-none': !props.currentPage || !props.limit || !props.total,
        })}
        id="kt_datatable_zero_configuration_info"
        role="status"
        style={{ fontWeight: 500 }}
      >
        {trans('TABLE.ENTRY', { from: from + 1, to, total: props.total })}
      </div>
    </div>
  );
};

export { TableEntry };
