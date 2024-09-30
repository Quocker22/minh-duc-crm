import React, { FC } from 'react';

import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';

const InviteUsers: FC = () => {
  const users = [
    {
      access: '1',
      avatar: '/media/avatars/300-6.jpg',
      email: 'e.smith@kpmg.com.au',
      name: 'Emma Smith',
    },
    {
      access: '1',
      email: 'melody@altbox.com',
      name: 'Melody Macy',
      state: 'danger',
    },
    {
      access: '3',
      avatar: '/media/avatars/300-1.jpg',
      email: 'max@kt.com',
      name: 'Max Smith',
    },
    {
      access: '2',
      avatar: '/media/avatars/300-1.jpg',
      email: 'sean@dellito.com',
      name: 'Sean Bean',
    },
    {
      access: '3',
      avatar: '/media/avatars/300-25.jpg',
      email: 'brian@exchange.com',
      name: 'Brian Cox',
    },
    {
      access: '2',
      email: 'mikaela@pexcom.com',
      name: 'Mikaela Collins',
      state: 'warning',
    },
    {
      access: '3',
      avatar: '/media/avatars/300-9.jpg',
      email: 'f.mitcham@kpmg.com.au',
      name: 'Francis Mitcham',
    },
    {
      access: '2',
      email: 'olivia@corpmail.com',
      name: 'Olivia Wild',
      state: 'danger',
    },
    {
      access: '1',
      email: 'owen.neil@gmail.com',
      name: 'Neil Owen',
      state: 'info',
    },
    {
      access: '3',
      avatar: '/media/avatars/300-23.jpg',
      email: 'dam@consilting.com',
      name: 'Dan Wilson',
    },
    {
      access: '2',
      email: 'emma@intenso.com',
      name: 'Emma Bold',
      state: 'danger',
    },
    {
      access: '1',
      avatar: '/media/avatars/300-12.jpg',
      email: 'ana.cf@limtel.com',
      name: 'Ana Crown',
    },
    {
      access: '3',
      email: 'robert@benko.com',
      name: 'Robert Doe',
      state: 'primary',
    },
    {
      access: '3',
      avatar: '/media/avatars/300-13.jpg',
      email: 'miller@mapple.com',
      name: 'John Miller',
    },
    {
      access: '2',
      email: 'lucy.m@fentech.com',
      name: 'Lucy Kunic',
      state: 'success',
    },
    {
      access: '1',
      avatar: '/media/avatars/300-21.jpg',
      email: 'ethan@loop.com.au',
      name: 'Ethan Wilder',
    },
    {
      access: '3',
      avatar: '/media/avatars/300-12.jpg',
      email: 'ana.cf@limtel.com',
      name: 'Ana Crown',
    },
  ];

  return (
    <div aria-hidden="true" className="modal fade" id="kt_modal_invite_friends">
      <div className="modal-dialog mw-650px">
        <div className="modal-content">
          <div className="modal-header pb-0 border-0 justify-content-end">
            <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
              <KTSVG className="svg-icon-1" path="/media/icons/duotune/arrows/arr061.svg" />
            </div>
          </div>

          <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
            <div className="text-center mb-13">
              <h1 className="mb-3">Invite a Friend</h1>

              <div className="text-muted fw-bold fs-5">
                If you need more info, please check out
                <a className="link-primary fw-bolder" href="#">
                  {' '}
                  FAQ Page
                </a>
                .
              </div>
            </div>

            <div className="btn btn-light-primary fw-bolder w-100 mb-8">
              <img
                alt="Logo"
                className="h-20px me-3"
                src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
              />
              Invite Gmail Contacts
            </div>

            <div className="separator d-flex flex-center mb-8">
              <span className="text-uppercase bg-body fs-7 fw-bold text-muted px-3">or</span>
            </div>

            <textarea
              className="form-control form-control-solid mb-8"
              placeholder="Type or paste emails here"
              rows={3}
            />

            <div className="mb-10">
              <div className="fs-6 fw-bold mb-2">Your Invitations</div>

              <div className="mh-300px scroll-y me-n7 pe-7">
                {users.map((user, i) => {
                  return (
                    <div
                      key={i}
                      className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed"
                    >
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-35px symbol-circle">
                          {user.avatar && <img alt="Pic" src={toAbsoluteUrl(user.avatar)} />}
                          {user.state && (
                            <div className="symbol symbol-35px symbol-circle">
                              <span
                                className={`symbol-label bg-light-${user.state} text-${user.state} fw-bold`}
                              >
                                {user.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="ms-5">
                          <a
                            className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2"
                            href="#"
                          >
                            {user.name}
                          </a>
                          <div className="fw-bold text-muted">{user.email}</div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm select2-hidden-accessible"
                          defaultValue={'2'}
                        >
                          <option value="1">Guest</option>
                          <option data-select2-id="select2-data-12-vz6w" value="2">
                            Owner
                          </option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="d-flex flex-stack">
              <div className="me-5 fw-bold">
                <label className="fs-6">Adding Users by Team Members</label>
                <div className="fs-7 text-muted">
                  If you need more info, please check budget planning
                </div>
              </div>

              <label className="form-check form-switch form-check-custom form-check-solid">
                <input className="form-check-input" type="checkbox" value="1" />

                <span className="form-check-label fw-bold text-muted">Allowed</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InviteUsers };
