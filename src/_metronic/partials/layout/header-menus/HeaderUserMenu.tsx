import { FC } from 'react';
import { Link } from 'react-router-dom';

import { AtDefaultAvatar } from '@/components/atoms/AtDefaultAvatar';
import { useAuth } from '@/hooks/useAuth';
import { formatPhoneNumber, trans } from '@/utils';

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-2 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <AtDefaultAvatar
            avatar={currentUser?.avatar}
            className="symbol-50px me-3 fw-bold overflow-hidden"
            imageHeight={50}
            imageWidth={50}
            name={currentUser?.name}
            isImageRoundedCircle
          />

          <Link className="d-flex flex-column text-hover-primary cursor-pointer" to={`/profile`}>
            <div className="fw-bolder d-flex align-items-center fs-5">{currentUser?.name}</div>
            <span className="fw-bold fs-7">
              {currentUser?.phone && formatPhoneNumber(currentUser?.phone)}
            </span>
          </Link>
        </div>
      </div>

      {/* <div className="separator my-2" /> */}

      {/* <Languages /> */}

      <div className="separator my-2" />

      <div className="menu-item px-2">
        <button className="menu-link px-5 fake-link" onClick={logout}>
          {trans('AUTH.LOGOUT')}
        </button>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
