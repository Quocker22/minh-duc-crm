import { Popconfirm } from 'antd';
import clsx from 'clsx';
import { useEffect } from 'react';

import { MenuComponent } from '@/_metronic/assets/ts/components';
import { KTSVG, WithChildren } from '@/_metronic/helpers';
import { Button } from '@/components/molecules/Button';
import { trans } from '@/utils';

interface IProps<TData> extends WithChildren {
  readonly data: TData;
  readonly editButtonClassName?: string;
  readonly isShowEditButton?: boolean;
  readonly isShowRemoveButton?: boolean;
  readonly isShowViewButton?: boolean;
  readonly onClickEdit?: (data: TData) => void;
  readonly onClickRemove?: (data: TData) => void;
  readonly onClickView?: (data: TData) => void;
  readonly removeButtonClassName?: string;
  readonly viewButtonClassName?: string;
}

const TableActionCellFlatStyle = <TData,>(props: IProps<TData>) => {
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  return (
    <div className="d-flex justify-content-end">
      {props.isShowEditButton && (
        <div className="menu-item px-3">
          <Button
            className={clsx('mb-1 p-0')}
            onClick={(e: { stopPropagation: () => void }) => {
              e.stopPropagation();
              props.onClickEdit?.(props.data);
            }}
            variant="link"
          >
            <KTSVG className="svg-icon-2 m-0" path="/media/icons/duotune/art/art005.svg" />
          </Button>
        </div>
      )}

      {props.isShowRemoveButton && (
        <div className="menu-item px-3">
          <Popconfirm
            cancelText={trans('GENERAL.ACTION.CANCEL')}
            okButtonProps={{ danger: true }}
            okText={trans('GENERAL.ACTION.CONFIRM')}
            onConfirm={(e) => {
              e?.stopPropagation();
              props.onClickRemove?.(props.data);
            }}
            title={trans('MODAL.DELETE.CONFIRM_SUBTITLE_TITLE_1')}
          >
            <Button className={clsx('p-0')} onClick={(e) => e.stopPropagation()} variant="link">
              <KTSVG className="svg-icon-2 m-0" path="/media/icons/duotune/general/gen027.svg" />
            </Button>
          </Popconfirm>
        </div>
      )}

      {props.isShowViewButton && (
        <div className="menu-item px-3">
          <Button
            className={clsx('mb-1 p-0', props.viewButtonClassName)}
            onClick={(e) => {
              e.stopPropagation();
              props.onClickView?.(props.data);
            }}
            variant="link"
          >
            <KTSVG className="svg-icon-2 m-0" path="/media/icons/duotune/general/gen004.svg" />
          </Button>
        </div>
      )}
    </div>
  );
};

TableActionCellFlatStyle.defaultProps = {
  isShowEditButton: true,
  isShowRemoveButton: true,
  isShowViewButton: true,
};

export { TableActionCellFlatStyle };
