import clsx from 'clsx';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { KTSVG } from '@/_metronic/helpers';
import { Button } from '@/components/molecules/Button';
import { InputTimeField } from '@/components/molecules/InputTimeField';
import { DateTimeFormat } from '@/constants';
import { FormCustomerModel } from '@/modules/customer/models';

type IProps = {
  readonly formMethods: UseFormReturn<FormCustomerModel>;
  readonly btnClass?: string;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly groupClass?: string;
};

const InputShiftWorkFieldArray = ({
  formMethods,
  btnClass,
  className,
  groupClass,
  disabled,
}: IProps) => {
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'shift_work',
  });

  return (
    <>
      <div className={clsx('col-8 d-flex flex-column mb-7', groupClass)}>
        <Button
          className={clsx('w-25 d-flex text-mute', btnClass)}
          disabled={disabled}
          onClick={() => {
            append({
              end_time: '',
              start_time: '',
            });
          }}
          variant="link rounded-pill"
        >
          <KTSVG className="svg-icon-1 fs-2" path="/media/icons/duotune/general/add_task.svg" />
          Ca làm việc
        </Button>
        {fields.map((valueGroups, index) => {
          return (
            <div key={valueGroups.id} className={clsx('mt-4', className)}>
              <div className="rounded">
                <div className="row">
                  <div className="col-3 mt-3 d-flex flex-column">
                    <b>Ca làm việc {index + 1}</b>
                  </div>
                  <div className="col-8 p-0">
                    <div className="row">
                      <InputTimeField
                        control={formMethods.control}
                        format={DateTimeFormat.time}
                        formatValue={DateTimeFormat.time}
                        groupClass="col-4"
                        name={`shift_work[${index}].start_time` as any}
                      />
                      <h6 className="col-1 mt-3 p-0">Đến</h6>
                      <InputTimeField
                        control={formMethods.control}
                        format={DateTimeFormat.time}
                        formatValue={DateTimeFormat.time}
                        groupClass="col-4"
                        name={`shift_work[${index}].end_time` as any}
                      />
                    </div>
                  </div>
                  <div className="col-1">
                    <div
                      className={clsx(
                        'btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle',
                        index === 0 && 'd-none'
                      )}
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { InputShiftWorkFieldArray };
