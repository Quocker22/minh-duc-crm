import clsx from 'clsx';
import { CSSProperties, FC, useMemo } from 'react';

import { toAbsoluteUrl } from '@/_metronic/helpers';
import { Image } from '@/components/molecules/Image';
import { getRandomAppColor } from '@/utils';

interface IProps {
  readonly avatar?: string;
  readonly className?: string;
  readonly imageClassName?: string;
  readonly imageHeight?: number;
  readonly imageStyle?: CSSProperties;
  readonly imageWidth?: number;
  readonly isImageRoundedCircle?: boolean;
  readonly name?: string;
  readonly style?: CSSProperties;
}

const AtDefaultAvatar: FC<IProps> = (props) => {
  const color = useMemo(() => getRandomAppColor(), []);

  return (
    <div
      className={clsx('symbol', props.isImageRoundedCircle && 'symbol-circle', props.className)}
      data-testid="at-default-avatar-element"
      style={props.style}
    >
      <a href="#">
        {(() => {
          if (props.avatar) {
            return (
              <div className="symbol-label">
                <Image
                  alt="avatar"
                  className={clsx('border', props.imageClassName)}
                  height={props.imageHeight}
                  isImageRoundedCircle={props.isImageRoundedCircle}
                  src={props.avatar || toAbsoluteUrl('/media/avatars/300-1.jpg')}
                  style={props.imageStyle}
                  width={props.imageWidth}
                />
              </div>
            );
          }

          return (
            <div className={clsx('symbol-label fs-3', `bg-light-${color}`, `text-${color}`)}>
              {(props.name || '?').charAt(0)}
            </div>
          );
        })()}
      </a>
    </div>
  );
};

AtDefaultAvatar.defaultProps = { isImageRoundedCircle: true };

export { AtDefaultAvatar };
