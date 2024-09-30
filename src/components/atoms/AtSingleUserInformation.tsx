import clsx from 'clsx';
import { FC } from 'react';

import { toAbsoluteUrl } from '@/_metronic/helpers';
import { AtDefaultAvatar } from '@/components/atoms/AtDefaultAvatar';
import { HRModel } from '@/modules/hr-management/models';
import { formatPhoneNumber } from '@/utils';

interface IProps {
  readonly user: HRModel;
  readonly className?: string;
  readonly description?: string;
  readonly isHiddenDescription?: boolean;
  readonly isHiddenName?: boolean;
  readonly isImageRoundedCircle?: boolean;
}

const AtSingleUserInformation: FC<IProps> = ({
  user,
  isHiddenDescription,
  isHiddenName,
  className,
  isImageRoundedCircle,
  description,
}) => {
  return (
    <div className="d-flex align-items-center" data-testid="at-single-user-information-element">
      <AtDefaultAvatar
        avatar={user?.avatar || toAbsoluteUrl('/media/avatars/300-14.jpg')}
        className="symbol-50px me-3 fw-bold overflow-hidden"
        imageHeight={50}
        imageWidth={50}
        isImageRoundedCircle={isImageRoundedCircle}
        name={user?.name || user?.name}
      />
      <div className="d-flex  flex-column">
        <a
          className={clsx(
            'text-gray-800 fw-bold  text-hover-primary mb-1',
            isHiddenName && 'd-none',
            className
          )}
          href="#"
        >
          {user?.name}
        </a>
        <span className={clsx(isHiddenDescription && 'd-none')}>
          {description || formatPhoneNumber(user?.phone)}
        </span>
      </div>
    </div>
  );
};

export { AtSingleUserInformation };
