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

const TableActionCellDropdownStyle = <TData,>(props: IProps<TData>) => {
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  return (
    <>
      <Button
        className="p-0"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-trigger="click"
        variant="link"
      >
        <KTSVG className="svg-icon-5 m-0 d-flex" path="/media/icons/duotune/general/gen053.svg" />
      </Button>

      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-fit-content py-4"
        data-kt-menu="true"
      >
        {props.isShowViewButton && (
          <div className="menu-item px-3">
            {props.onClickView ? (
              <Button
                className={clsx('mb-1 p-0', props.viewButtonClassName)}
                onClick={(e) => {
                  e.stopPropagation();
                  props.onClickView?.(props.data);
                }}
                variant="link"
              >
                <KTSVG className="svg-icon-2 m-0" path="/media/icons/duotune/art/art011.svg" />
              </Button>
            ) : (
              <a className={clsx('me-2 p-0', props.viewButtonClassName)} href="#">
                <KTSVG className="svg-icon-2 m-0" path="/media/icons/duotune/general/gen004.svg" />
              </a>
            )}
          </div>
        )}

        {props.isShowEditButton && (
          <div className="menu-item px-3">
            <Button
              className={clsx('mb-1 p-0', props.removeButtonClassName)}
              onClick={(e) => {
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
              onConfirm={() => props.onClickRemove?.(props.data)}
              title={trans('MODAL.DELETE.CONFIRM_SUBTITLE_TITLE_1')}
            >
              <Button
                className={clsx('p-0', props.editButtonClassName)}
                onClick={(e) => e.stopPropagation()}
                variant="link"
              >
                <KTSVG className="svg-icon-2 m-0" path="/media/icons/duotune/general/gen027.svg" />
              </Button>
            </Popconfirm>
          </div>
        )}

        {props.children}
      </div>
    </>
  );
};

TableActionCellDropdownStyle.defaultProps = {
  isShowEditButton: true,
  isShowRemoveButton: true,
  isShowViewButton: true,
};

export { TableActionCellDropdownStyle };
