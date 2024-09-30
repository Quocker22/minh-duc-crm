import { Tooltip } from 'antd';
import clsx from 'clsx';
import { FC, useId, useMemo } from 'react';

import { toAbsoluteUrl } from '@/_metronic/helpers';
import { AtDefaultAvatar } from '@/components/atoms/AtDefaultAvatar';
import { HRModel } from '@/modules/hr-management/models';

interface IProps {
  readonly users: HRModel[];
  readonly isHiddenDescription?: boolean;
  readonly isHiddenName?: boolean;
  readonly limit?: number;
}

const AtMultipleUserInformation: FC<IProps> = (props) => {
  const limit = useMemo(() => props.limit || props.users.length, [props.users, props.limit]);
  const userListLimit = useMemo(() => props.users.slice(0, limit), [props.users, limit]);
  const uniqueId = useId();

  return (
    <div
      className="symbol-group fw-bold symbol-hover"
      data-testid="at-multiple-user-information-element"
    >
      {userListLimit.map((user, index) => {
        return (
          <Tooltip
            key={index}
            title={
              <>
                <a className={clsx('mb-1', props.isHiddenName && 'd-none')} href="#">
                  {user.name}
                </a>
                <br />
                <span className={clsx(props.isHiddenDescription && 'd-none')}>{user.name}</span>
              </>
            }
          >
            <div data-for={`${uniqueId}${index}`} data-tip>
              <AtDefaultAvatar
                avatar={user?.avatar || toAbsoluteUrl('/media/avatars/300-14.jpg')}
                className="symbol-circle symbol-35px"
                imageHeight={35}
                imageStyle={{ backgroundColor: 'var(--kt-symbol-label-bg)' }}
                imageWidth={35}
                name={user.name || user.name}
              />
            </div>
          </Tooltip>
        );
      })}

      <a
        className={clsx(
          'symbol symbol-35px symbol-circle',
          props.users.length <= limit && 'd-none'
        )}
        href="#"
      >
        <span className="symbol-label fs-8 fw-bolder">+{props.users.length - limit}</span>
      </a>
    </div>
  );
};

export { AtMultipleUserInformation };
