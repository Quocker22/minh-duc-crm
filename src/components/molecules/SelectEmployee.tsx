// eslint-disable-next-line no-restricted-imports
import clsx from 'clsx';
import { debounce } from 'lodash';
import React, { CSSProperties, FC, useCallback, useId } from 'react';
import { Form } from 'react-bootstrap';
import { ActionMeta } from 'react-select';
import AsyncSelect from 'react-select/async';

import { axiosClient } from '@/api/axiosClient';
import { useCallApi } from '@/hooks/useCallApi';
import { PaginationResponse } from '@/models';
import { HRModel } from '@/modules/hr-management/models';

interface IProps {
  readonly className?: string;
  readonly classNameInputHint?: string;
  readonly groupClass?: string;
  readonly label?: string;
  readonly labelClass?: string;
  readonly onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
  readonly required?: boolean;
  readonly style?: CSSProperties;
}

function endpoint(query?: string) {
  return `/employee/filter?${query || ''}`;
}

export const SelectEmployee: FC<IProps> = (props: IProps) => {
  const controlId = useId();
  const { handleCallApi } = useCallApi();

  const loadOptions = async (inputValue: string) => {
    try {
      const response = await handleCallApi(() =>
        axiosClient.get<PaginationResponse<HRModel[]>>(
          endpoint(`page=1&limit=8&query=${inputValue}`)
        )
      );

      const options: {
        label: string;
        value: string;
      }[] =
        response?.rows?.map((employee) => ({
          label: employee.name,
          value: employee.id,
        })) || [];

      return options;
    } catch (error) {
      console.error('Error fetching employee data:', error);

      return [];
    }
  };

  const debouncedLoadOptions = useCallback(
    debounce((inputValue: string, callback) => {
      loadOptions(inputValue).then(callback);
    }, 700),
    []
  );

  return (
    <Form.Group className={clsx(props.groupClass)} controlId={controlId} style={props.style}>
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>
      <div className={clsx('p-0', props.classNameInputHint)}>
        <AsyncSelect
          className={clsx(props.className)}
          loadOptions={debouncedLoadOptions}
          onChange={props.onChange}
          placeholder="Người quản lý"
          defaultOptions
          isClearable
        />
      </div>
    </Form.Group>
  );
};
