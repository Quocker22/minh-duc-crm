import { CSSProperties, FC, ReactNode } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

import { KTSVG, WithChildren } from '@/_metronic/helpers';

interface IProps extends WithChildren {
  readonly backdrop?: boolean | 'static';
  readonly bodyClassName?: string;
  readonly centered?: boolean;
  readonly className?: string;
  readonly dialogClassName?: string;
  readonly footer?: ReactNode;
  readonly footerClassName?: string;
  readonly headerClassName?: string;
  readonly isHeaderButtonClose?: boolean;
  readonly isVisibleHeader?: boolean;
  readonly onHide?: () => void;
  readonly onShow?: () => void;
  readonly requireHeaderButtonClose?: boolean;
  readonly show?: boolean;
  readonly size?: 'sm' | 'lg' | 'xl';
  readonly style?: CSSProperties;
  readonly title?: ReactNode;
}

const defaultProps: IProps = {
  isHeaderButtonClose: true,
  isVisibleHeader: true,
};

const Modal: FC<IProps> = (props) => {
  return (
    <BootstrapModal
      backdrop={props.backdrop}
      centered={props.centered}
      className={props.className}
      dialogClassName={props.dialogClassName}
      onHide={props.onHide}
      onShow={props.onShow}
      show={props.show}
      size={props.size}
      style={props.style}
    >
      {props.isVisibleHeader && (
        <BootstrapModal.Header className={props.headerClassName}>
          {props.title}

          {props.isHeaderButtonClose && (
            <div
              className="btn btn-icon btn-sm btn-active-icon-primary"
              data-kt-users-modal-action="close"
              onClick={props.onHide}
              style={{ cursor: 'pointer' }}
            >
              <KTSVG className="svg-icon-1" path="/media/icons/duotune/arrows/arr061.svg" />
            </div>
          )}
        </BootstrapModal.Header>
      )}

      <BootstrapModal.Body className={props.bodyClassName}>{props.children}</BootstrapModal.Body>

      {props.footer && (
        <BootstrapModal.Footer className={props.footerClassName}>
          {props.footer}
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
};

Modal.defaultProps = defaultProps;

export { Modal };
