import clsx from 'clsx';
import { isBoolean } from 'lodash-es';
import { FC, FormEventHandler, useEffect, useRef } from 'react';

interface IProps {
  readonly checked?: boolean;
  readonly className?: string;
  readonly indeterminate?: boolean;
  readonly onChange?: FormEventHandler<HTMLInputElement>;
}

const TableSelectionCel: FC<IProps> = ({ checked, indeterminate, onChange, className }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isBoolean(indeterminate) && ref.current) {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <div className={clsx('form-check form-check-sm form-check-custom form-check-solid', className)}>
      <input
        ref={ref}
        checked={checked}
        className="form-check-input"
        onChange={onChange}
        type="checkbox"
      />
    </div>
  );
};

export { TableSelectionCel };
