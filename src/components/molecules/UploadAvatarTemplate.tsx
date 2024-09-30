/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable prettier/prettier */
import clsx from 'clsx';
import { CSSProperties, FC, MouseEventHandler } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { BLANK_IMG } from '@/constants';

interface IProps {
  readonly getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  readonly getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  readonly id: string;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly isCircleAvatar?: boolean;
  readonly isLoading?: boolean;
  readonly isOutlineAvatar?: boolean;
  readonly onRemove?: () => void;
  readonly style?: CSSProperties;
  readonly url?: string;
  readonly imageClassName?: string;
}

const UploadAvatarTemplate: FC<IProps> = (props) => {
  const handleRemove: MouseEventHandler<HTMLSpanElement> = (e) => {
    if (props.disabled) return;
    e.stopPropagation();
    props.onRemove?.();
  };

  return (
    <div className="d-block" style={props.style}>
      <div
        className={clsx(
          'image-input',
          props.isOutlineAvatar && 'image-input-outline',
          props.isCircleAvatar && 'image-input-circle',
          !props.url && 'image-input-empty',
          props.className
        )}
        data-kt-image-input="true"
        style={{
          backgroundImage: `url(${BLANK_IMG})`,
          backgroundPosition: 'center',
          backgroundSize: '50px',
        }}
      >
        {/* Hiển thị spinner khi isLoading là true */}
        {props.isLoading && (
          <div className="image-input-wrapper w-125px h-125px d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Hiển thị ảnh khi không loading */}
        {!props.isLoading && (
          <div
            className={'image-input-wrapper ' + props.imageClassName || 'w-125px h-125px'}
            style={{ backgroundImage: `url(${props.url})` }}
          />
        )}

        <div
          {...props.getRootProps({
            className:
              'btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow',
          })}
          data-bs-dismiss="click"
          data-bs-toggle="tooltip"
          data-kt-image-input-action="change"
          title="Change avatar"
        >
          <i className="bi bi-pencil-fill fs-7" />

          <input {...props.getInputProps()} id={props.id} />
        </div>

        <span
          className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
          data-bs-dismiss="click"
          data-bs-toggle="tooltip"
          data-kt-image-input-action="remove"
          onClick={handleRemove}
          title="Remove avatar"
        >
          <i className="bi bi-x fs-2" />
        </span>
      </div>
    </div>
  );
};

export { UploadAvatarTemplate };
