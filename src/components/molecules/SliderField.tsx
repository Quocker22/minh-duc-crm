import { Slider } from 'antd';
import { SliderRangeProps } from 'antd/lib/slider';
import { TooltipPlacement } from 'antd/lib/tooltip';
import clsx from 'clsx';
import { isNil } from 'lodash-es';
import { ReactNode, useId, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { Control, Path, useController } from 'react-hook-form';

type Props<IForm extends object> = SliderRangeProps & {
  readonly name: Path<IForm>;
  readonly TooltipPlacement?: TooltipPlacement;
  readonly autofocus?: boolean;
  readonly className?: string;
  readonly control?: Control<IForm, object>;
  readonly disabled?: boolean;
  readonly dots?: boolean;
  readonly draggableTrack?: boolean;
  readonly errorClass?: string;
  readonly formatRangeLabel?: (value: number) => string;
  readonly groupClass?: string;
  readonly hint?: ReactNode;
  readonly hintClass?: string;
  readonly included?: boolean;
  readonly isShowRangeLabel?: boolean;
  readonly label?: ReactNode;
  readonly labelClass?: string;
  readonly max?: number;
  readonly min?: number;
  readonly open?: boolean;
  readonly rangeLabelClass?: string;
  readonly required?: boolean;
  readonly reverse?: boolean;
  readonly step?: number;
  readonly tooltipPrefixCls?: string;
  readonly tooltipVisible?: boolean;
  readonly vertical?: boolean;
};

const SliderField = <IForm extends object>(props: Props<IForm>) => {
  const controlId = useId();

  const { field, formState } = props.control
    ? useController({ control: props.control, name: props.name })
    : { field: undefined, formState: undefined };
  const errorMessage = (formState?.errors[props.name]?.message as string) || '';

  const value = useMemo(
    () => (!isNil(field?.value) ? field?.value : props.value),
    [field?.value, props.value]
  );
  const from = useMemo(() => Number(value?.[0]), [value]);
  const to = useMemo(() => Number(value?.[1]), [value]);

  function handleOnchange(values: [number, number]) {
    field?.onChange(values);
    props.onChange?.(values);
  }

  return (
    <Form.Group className={clsx('input-slider-field', props.groupClass)} controlId={controlId}>
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>

      <Slider
        {...field}
        autoFocus={props.autofocus}
        disabled={props.disabled}
        dots={props.dots}
        handleStyle={props.handleStyle}
        included={props.included}
        max={props.max}
        min={props.min}
        onAfterChange={props.onAfterChange}
        onChange={handleOnchange}
        range={props.range}
        reverse={props.vertical}
        step={props.step}
        tooltipPlacement={props.TooltipPlacement}
        tooltipPrefixCls={props.tooltipPrefixCls}
        tooltipVisible={props.tooltipVisible}
        trackStyle={props.trackStyle}
        value={value}
      />

      {props.isShowRangeLabel && (
        <Form.Text
          className={clsx('d-flex justify-content-between text-primary', props.rangeLabelClass)}
        >
          <span className="fw-semibold">{from && (props.formatRangeLabel?.(from) || from)}</span>
          <span className="fw-semibold">{to && (props.formatRangeLabel?.(to) || to)}</span>
        </Form.Text>
      )}
      <Form.Text className={clsx('text-muted', props.hintClass)}>{props.hint}</Form.Text>
      <Form.Control.Feedback className={clsx(props.errorClass)} type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

SliderField.defaultProps = {
  handleStyle: [{ background: '#00002f' }, { background: '#00002f' }],
  isShowRangeLabel: false,
  range: false,
  tooltipVisible: false,
  trackStyle: [{ background: 'gray' }],
};

export { SliderField };
