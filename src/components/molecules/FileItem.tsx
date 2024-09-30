import clsx from 'clsx';
import { isNumber } from 'lodash-es';
import { FC, MouseEventHandler } from 'react';

import { AtFileProgress } from '@/components/atoms/AtFileProgress';
import { Button } from '@/components/molecules/Button';
import { FileUploadModel } from '@/models';
import { trans } from '@/utils';

interface IProps {
  readonly file: FileUploadModel;
  readonly disabled?: boolean;
  readonly hideDownload?: boolean;
  readonly hideRemove?: boolean;
  readonly onRemove?: MouseEventHandler<HTMLButtonElement>;
}

const FileItem: FC<IProps> = ({ file, onRemove, hideDownload, hideRemove, disabled }) => {
  return (
    <div className="dropzone-items wm-200px">
      <div className="dropzone-item">
        <div className="dropzone-file">
          <div className="dropzone-filename" title="some_image_file_name.jpg">
            <span className="text-primary">{file.url || trans('GENERAL.LOADING')}</span>
            <strong className={clsx(!file.size && 'd-none')}>
              (<span>{file.size}</span>)
            </strong>
          </div>

          {file.errors?.length && (
            <div className="dropzone-error">{file.errors.map((e) => e.message).join(', ')}</div>
          )}
        </div>

        {isNumber(file.progress) && <AtFileProgress progress={file.progress} />}

        <div className="dropzone-toolbar">
          {file.url && (
            <a
              className={clsx('dropzone-start', { 'd-none': !file.url || hideDownload })}
              href={file.url}
              rel="noreferrer"
              target="_blank"
              download
            >
              <i className="bi bi-download fs-5" />
            </a>
          )}
          <Button
            className={clsx('dropzone-delete', hideRemove && 'd-none')}
            disabled={isNumber(file.progress)}
            onClick={(e) => !disabled && onRemove?.(e)}
            variant="link"
          >
            <i className="bi bi-x fs-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { FileItem };
