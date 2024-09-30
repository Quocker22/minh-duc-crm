import { isArray } from 'lodash-es';
import { FC } from 'react';

import { AtMultipleUserInformation } from '@/components/atoms/AtMultipleUserInformation';
import { AtSingleUserInformation } from '@/components/atoms/AtSingleUserInformation';
import { HRModel } from '@/modules/hr-management/models';

type Props = {
  readonly user: HRModel | HRModel[];
  readonly className?: string;
  readonly description?: string;
  readonly isHiddenDescription?: boolean;
  readonly isHiddenName?: boolean;
  readonly isImageRoundedCircle?: boolean;
  readonly limit?: number;
};

const AvatarGroup: FC<Props> = ({
  user,
  limit,
  isHiddenDescription,
  isHiddenName,
  className,
  isImageRoundedCircle,
  description,
}) => {
  if (!isArray(user) || user.length === 1) {
    return (
      <AtSingleUserInformation
        className={className}
        description={description}
        isHiddenDescription={isHiddenDescription}
        isHiddenName={isHiddenName}
        isImageRoundedCircle={isImageRoundedCircle}
        user={isArray(user) ? user[0] : user}
      />
    );
  }

  return (
    <AtMultipleUserInformation
      data-testid="avatar-group-element"
      isHiddenDescription={isHiddenDescription}
      isHiddenName={isHiddenName}
      limit={limit}
      users={user}
    />
  );
};

export { AvatarGroup };
