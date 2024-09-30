import clsx from 'clsx';
import { CSSProperties, FC } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { Button } from '@/components/molecules/Button';
import { UploadButtonRemoveAll } from '@/components/molecules/UploadButtonRemoveAll';
import { UploadFilePreview } from '@/components/molecules/UploadFilePreview';
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

const UploadFileTemplate: FC<IProps> = (props) => {
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

      <UploadFilePreview disabled={props.disabled} files={props.files} onRemove={props.onRemove} />
    </div>
  );
};

export { UploadFileTemplate };
