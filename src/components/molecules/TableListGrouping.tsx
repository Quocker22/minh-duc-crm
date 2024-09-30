import { ReactNode, useState } from 'react';

import { Button } from '@/components/molecules/Button';
import { ModalConfirmDelete } from '@/components/organisms/ModalConfirmDelete';
import { trans } from '@/utils';

interface IProps<T> {
  readonly keyText: string;
  readonly isLoading?: boolean;
  readonly keyIndex?: string;
  readonly onConfirmDelete?: (selected: T[]) => void;
  readonly selected?: T[];
  readonly title?: ReactNode;
}

const TableListGrouping = <T,>(props: IProps<T>) => {
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);

  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="fw-bolder me-5">
        <span className="me-2">{props.selected?.length || 0}</span> {trans('GENERAL.SELECTED')}
      </div>

      <Button
        disabled={props.isLoading}
        onClick={() => setIsVisibleDeleteModal(true)}
        variant="danger"
      >
        {trans('GENERAL.ACTION.DELETE_SELECTED')}
      </Button>

      <ModalConfirmDelete
        isLoading={props.isLoading}
        items={props.selected}
        keyIndex={props.keyIndex}
        keyText={props.keyText}
        onConfirmDelete={() => props.selected && props.onConfirmDelete?.(props.selected)}
        onHide={() => setIsVisibleDeleteModal(false)}
        show={isVisibleDeleteModal}
        title={props.title}
      />
    </div>
  );
};

export { TableListGrouping };
