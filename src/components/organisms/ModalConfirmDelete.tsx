import clsx from 'clsx';
import { map } from 'lodash-es';
import { ReactNode, useMemo } from 'react';

import { Button } from '@/components/molecules/Button';
import { Modal } from '@/components/organisms/Modal';
import { trans } from '@/utils';

interface IProps<T> {
  readonly keyText: string;
  readonly className?: string;
  readonly isLoading?: boolean;
  readonly items?: T[];
  readonly keyIndex?: string;
  readonly onConfirmDelete?: () => void;
  readonly onHide?: () => void;
  readonly onShow?: () => void;
  readonly show?: boolean;
  readonly title?: ReactNode;
}

const defaultProps: IProps<unknown> = {
  items: [],
  keyText: '',
};

const ModalConfirmDelete = <T,>(props: IProps<T>) => {
  const values = useMemo<string[]>(
    () => map(props.items, props.keyText).map((i) => i?.toString()),
    [props.items, props.keyText]
  );
  const keys = useMemo<string[]>(
    () => (!props.keyIndex ? [] : map(props.items, props.keyIndex)).map((i) => i?.toString()),
    [props.items, props.keyIndex]
  );

  return (
    <div className="modal-confirm-delete" data-testid="modal-confirm-delete">
      <Modal
        backdrop={!props.isLoading || 'static'}
        bodyClassName="scroll-y overflow-x-hidden"
        className={clsx(props.className)}
        footer={
          <>
            <Button
              className="me-3"
              disabled={props.isLoading}
              onClick={props.onHide}
              variant="light"
            >
              {trans('GENERAL.ACTION.CANCEL')}
            </Button>
            <Button
              isLoading={props.isLoading}
              onClick={() => props.onConfirmDelete?.()}
              variant="danger"
            >
              {trans('GENERAL.ACTION.CONFIRM')}
            </Button>
          </>
        }
        onHide={props.onHide}
        onShow={props.onShow}
        show={props.show}
        title={props.title || <h2 className="fw-bolder">{trans('MODAL.DELETE.CONFIRM_TITLE')}</h2>}
        centered
      >
        <div className="row">
          <div className="col-12 text-gray-600 text-center">
            {trans('MODAL.DELETE.CONFIRM_SUBTITLE_TITLE_1')}
          </div>
          <div className="col-12 text-gray-600 text-center mb-2">
            {trans('MODAL.DELETE.CONFIRM_SUBTITLE_TITLE_2')}
          </div>

          {values.map((item, index) => {
            return (
              <div key={index} className="col-12 text-gray-600 px-20 my-1">
                <p className="mb-0">
                  {keys[index] || index + 1}: {item}?
                </p>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

ModalConfirmDelete.defaultProps = defaultProps;

export { ModalConfirmDelete };
