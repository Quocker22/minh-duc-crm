import clsx from 'clsx';
import { FC } from 'react';

interface IProps {
  readonly progress: number;
  readonly color?:
    | 'white'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'light'
    | 'dark';
  readonly onProgressChange?: (progress: number) => void;
}

const defaultProps: IProps = {
  color: 'primary',
  progress: 0,
};

const AtFileProgress: FC<IProps> = ({ onProgressChange, progress, color }) => {
  onProgressChange?.(progress);

  return (
    <div className="dropzone-progress" data-testid="at-file-progress-element">
      <div className="progress">
        <div
          className={clsx('progress-bar', `bg-${color}`)}
          role="progressbar"
          style={{ width: `${Math.ceil(progress)}px` }}
        />
      </div>
    </div>
  );
};

AtFileProgress.defaultProps = defaultProps;

export { AtFileProgress };
