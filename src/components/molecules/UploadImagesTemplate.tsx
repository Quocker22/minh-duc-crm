import { Image } from 'antd';
import clsx from 'clsx';
import { isNumber } from 'lodash-es';
import { CSSProperties, FC } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { toAbsoluteUrl } from '@/_metronic/helpers';
import { Button } from '@/components/molecules/Button';
import { UploadButtonRemoveAll } from '@/components/molecules/UploadButtonRemoveAll';
import { FileUploadModel } from '@/models';
import { trans } from '@/utils';

interface IProps {
  readonly getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  readonly getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  readonly id: string;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly files?: FileUploadModel[];
  readonly hideRemoveAll?: boolean;
  readonly onRemove?: (index: number) => void;
  readonly onRemoveAll?: () => void;
  readonly style?: CSSProperties;
}

const UploadImagesTemplate: FC<IProps> = (props) => {
  return (
    <div className="dropzone dropzone-queue mb-2" style={props.style}>
      <div className={clsx('dropzone-panel mb-lg-0 mb-2 cursor-auto', props.className)}>
        <Button {...props.getRootProps({ className: 'me-2' })} size="sm" variant="primary">
          {trans('GENERAL.ACTION.ATTACH_FILES')}
          <input {...props.getInputProps()} id={props.id} />
        </Button>

        <UploadButtonRemoveAll
          disabled={props.disabled || !props.files?.length}
          hide={props.hideRemoveAll}
          onClick={props.onRemoveAll}
        />
      </div>
      {props.files?.map((file, index) => (
        <div key={index} className="position-relative d-inline-block mt-12 ms-12">
          <Image
            className="rounded"
            fallback={toAbsoluteUrl('/media/icons/duotune/general/gen067.svg')}
            height={125}
            preview={!!file.url?.length}
            src={file.url}
            width={125}
          />

          <div>
            {file.url && (
              <a
                className={clsx(
                  'btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow position-absolute top-0 start-100 translate-middle',
                  { 'd-none': !file.url }
                )}
                href={file.url}
                rel="noreferrer"
                target="_blank"
                download
              >
                <i className="bi bi-download fs-5" />
              </a>
            )}
            <Button
              className={clsx(
                'btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow position-absolute top-100 start-100 translate-middle'
              )}
              disabled={isNumber(file.progress)}
              onClick={() => !props.disabled && props.onRemove?.(index)}
              variant="link"
            >
              <i className="bi bi-x fs-1" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { UploadImagesTemplate };
