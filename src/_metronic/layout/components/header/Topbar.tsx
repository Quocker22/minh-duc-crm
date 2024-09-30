import clsx from 'clsx';
import { FC } from 'react';

import { HeaderUserMenu } from '@/_metronic/partials';
import { AvatarGroup } from '@/components/molecules/AvatarGroup';
import { useAuth } from '@/hooks/useAuth';

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';

const Topbar: FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="d-flex align-items-stretch flex-shrink-0">
      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id="kt_header_user_menu_toggle"
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-attach="parent"
          data-kt-menu-flip="bottom"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-trigger="click"
        >
          {currentUser && (
            <div className={clsx('d-flex justify-content-center')}>
              <AvatarGroup
                user={currentUser}
                isHiddenDescription
                isHiddenName
                isImageRoundedCircle
              />
            </div>
          )}
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}
    </div>
  );
};

export { Topbar };
