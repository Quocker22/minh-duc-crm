import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';

import { KTSVG } from '@/_metronic/helpers';

export type Props = {
  handleClose: () => void;
  show: boolean;
};

const InboxCompose: React.FC<Props> = ({ show, handleClose }) => {
  const composeToRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [composeCC, setComposeCC] = useState('');
  const [composeBCC, setComposeBCC] = useState('');
  const [subject, setSubject] = useState('');

  return (
    <Modal
      animation={false}
      aria-hidden="true"
      className="modal-sticky modal-sticky-lg modal-sticky-bottom-right"
      data-backdrop="false"
      id="kt_inbox_compose"
      role="dialog"
      show={show}
      tabIndex="-1"
    >
      <div className="modal-content">
        {/* begin::Form */}
        <form ref={formRef} id="kt_inbox_compose_form" onSubmit={() => console.log('submit')}>
          {/*begin::Header*/}
          <div className="d-flex align-items-center justify-content-between py-5 ps-8 pe-5 border-bottom">
            <h5 className="fw-bold m-0">Compose</h5>
            <div className="d-flex ms-2">
              {/*begin::Close*/}
              <div
                className="btn btn-icon btn-sm btn-light-primary ms-2"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                <KTSVG className="svg-icon-1" path="/media/icons/duotune/arrows/arr061.svg" />
              </div>
              {/*end::Close*/}
            </div>
          </div>
          {/*end::Header*/}

          {/*begin::Body*/}
          <div className="d-block">
            {/*begin::To*/}
            <div className="d-flex align-items-center border-bottom inbox-to px-8 min-h-45px">
              <div className="text-gray-600 w-75px">To:</div>
              <div className="d-flex align-items-center flex-grow-1">
                <input
                  ref={composeToRef}
                  className="form-control border-0"
                  name="compose_to"
                  type="text"
                />
              </div>
              <div className="ms-2">
                <span
                  className="text-muted fw-bold cursor-pointer text-hover-primary me-2"
                  data-inbox="cc-show"
                >
                  Cc
                </span>
                <span
                  className="text-muted fw-bold cursor-pointer text-hover-primary"
                  data-inbox="bcc-show"
                >
                  Bcc
                </span>
              </div>
            </div>
            {/*end::To*/}

            {/*begin::CC*/}
            <div className="d-none align-items-center border-bottom inbox-to-cc ps-8 pe-5 min-h-45px">
              <div className="text-gray-600 w-75px">Cc:</div>
              <div className="flex-grow-1">
                <input
                  className="form-control border-0"
                  name="compose_cc"
                  onChange={(e) => setComposeCC(e.target.value)}
                  type="text"
                  value={composeCC}
                />
              </div>
              <span className="btn btn-active-light-primary btn-sm btn-icon" data-inbox="cc-hide">
                <i className="la la-close " />
              </span>
            </div>
            {/*end::CC*/}

            {/*begin::BCC*/}
            <div className="d-none align-items-center border-bottom inbox-to-bcc ps-8 pe-5 min-h-45px">
              <div className="text-gray-600 w-75px">Bcc:</div>
              <div className="flex-grow-1">
                <input
                  className="form-control border-0"
                  name="compose_bcc"
                  onChange={(e) => setComposeBCC(e.target.value)}
                  type="text"
                  value={composeBCC}
                />
              </div>
              <span className="btn btn-active-light-primary btn-sm btn-icon" data-inbox="bcc-hide">
                <i className="la la-close " />
              </span>
            </div>
            {/*end::BCC*/}

            {/*begin::Subject*/}
            <div className="border-bottom">
              <input
                className="form-control border-0 px-8 min-h-45px"
                name="compose_subject"
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                value={subject}
              />
            </div>
            {/*end::Subject*/}

            {/*begin::Message*/}
            <div className="border-0 h-125px h-lg-250px" id="kt_inbox_compose_editor" />
            {/*end::Message*/}

            {/*begin::Attachments*/}
            <div className="dropzone dropzone-multi px-8 py-4" id="kt_inbox_compose_attachments">
              <div className="dropzone-items">
                <div className="dropzone-item" style={{ display: 'none' }}>
                  <div className="dropzone-file">
                    <div className="dropzone-filename" title="some_image_file_name.jpg">
                      <span data-dz-name>some_image_file_name.jpg</span>{' '}
                      <strong>
                        (<span data-dz-size>340kb</span>)
                      </strong>
                    </div>
                    <div className="dropzone-error" data-dz-errormessage />
                  </div>
                  <div className="dropzone-progress">
                    <div className="progress">
                      <div
                        aria-valuemax={100}
                        aria-valuemin={0}
                        aria-valuenow={0}
                        className="progress-bar bg-primary"
                        role="progressbar"
                        data-dz-uploadprogress
                      />
                    </div>
                  </div>
                  <div className="dropzone-toolbar">
                    <span className="dropzone-delete" data-dz-remove>
                      {/*begin::Close*/}
                      <span
                        className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                        data-bs-dismiss="modal"
                      >
                        <KTSVG
                          className="svg-icon-1"
                          path="/media/icons/duotune/arrows/arr061.svg"
                        />
                      </span>
                      {/*end::Close*/}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/*end::Attachments*/}
          </div>
          {/*end::Body*/}

          {/*begin::Footer*/}
          <div className="d-flex align-items-center justify-content-between py-5 ps-8 pe-5 border-top">
            {/*begin::Actions*/}
            <div className="d-flex align-items-center me-3">
              {/*begin::Send*/}
              <button className="btn btn-primary me-4 px-6">Send</button>
              {/*end::Send*/}

              {/*begin::Other*/}
              <a
                className="btn btn-icon btn-active-light-primary me-2"
                href="#"
                id="kt_inbox_compose_attachments_select"
              >
                <KTSVG className="svg-icon-1" path="/media/icons/duotune/files/fil022.svg" />
              </a>
              <a className="btn btn-icon btn-active-light-primary" href="#">
                <KTSVG className="svg-icon-1" path="/media/icons/duotune/general/gen018.svg" />
              </a>
              {/*end::Other*/}
            </div>
            {/*end::Actions*/}

            {/*begin::Toolbar*/}
            <div className="d-flex align-items-center">
              <button
                className="btn btn-icon btn-active-light-primary me-2"
                data-bs-toggle="tooltip"
                title="More actions"
              >
                <KTSVG className="svg-icon-1" path="/media/icons/duotune/coding/cod001.svg" />
              </button>
            </div>
            {/*end::Toolbar*/}
          </div>
          {/*end::Footer*/}
        </form>
        {/*end::Form*/}
      </div>
    </Modal>
  );
};

export { InboxCompose };
