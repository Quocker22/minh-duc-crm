import { FC } from 'react';

import { FileItem } from '@/components/molecules/FileItem';
import { FileUploadModel } from '@/models';

interface IProps {
  readonly disabled?: boolean;
  readonly files?: FileUploadModel[];
  readonly onRemove?: (index: number) => void;
}

const UploadFilePreview: FC<IProps> = ({ files, onRemove, disabled }) => {
  return (
    <>
      {files?.map(
        (file, index) =>
          file.url && (
            <FileItem
              key={index}
              disabled={disabled}
              file={file}
              onRemove={() => onRemove?.(index)}
            />
          )
      )}
    </>
  );
};

export { UploadFilePreview };
