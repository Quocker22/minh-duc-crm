import { Progress } from 'antd';
import {
  ProgressGradient,
  ProgressSize,
  ProgressType,
  SuccessProps,
} from 'antd/es/progress/progress';
import React from 'react';

import { WithChildren } from '@/_metronic/helpers';
import { ProgressStatuses } from '@/models';

interface IProps extends WithChildren {
  status: ProgressStatuses;
  className?: string;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  percent?: number;
  prefixCls?: string;
  showInfo?: boolean;
  size?: ProgressSize;
  steps?: number;
  strokeColor?: string | string[] | ProgressGradient;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeWidth?: number;
  style?: React.CSSProperties;
  success?: SuccessProps;
  successPercent?: number;
  trailColor?: string;
  type?: ProgressType;
  width?: number;
}

const ProgressBar: React.FC<IProps> = (props) => {
  return (
    <Progress
      className={props.className}
      format={props.format}
      gapDegree={props.gapDegree}
      gapPosition={props.gapPosition}
      percent={props.percent}
      prefixCls={props.prefixCls}
      showInfo={props.showInfo}
      size={props.size}
      status={props.status}
      steps={props.steps}
      strokeColor={props.strokeColor}
      strokeLinecap={props.strokeLinecap}
      strokeWidth={props.strokeWidth}
      style={props.style}
      success={props.success}
      trailColor={props.trailColor}
      type={props.type}
      width={props.width}
    />
  );
};

export { ProgressBar };
