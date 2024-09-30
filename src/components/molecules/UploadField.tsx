/* eslint-disable typescript-sort-keys/interface */
import { message as messageAntd } from 'antd';
import clsx from 'clsx';
import { cloneDeep, isEmpty } from 'lodash-es';
import { ReactNode, useId } from 'react';
import { Form } from 'react-bootstrap';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { Control, Path, useController } from 'react-hook-form';

import { UploadAvatarTemplate } from '@/components/molecules/UploadAvatarTemplate';
import { UploadFileTemplate } from '@/components/molecules/UploadFileTemplate';
import { UploadImagesTemplate } from '@/components/molecules/UploadImagesTemplate';
import { useUpload } from '@/hooks/useUpload';
import { FileUploadModel } from '@/models';
import { trans } from '@/utils';

type IProps<IForm extends object> = {
  readonly control: Control<IForm, object>;
  readonly name: Path<IForm>;
  readonly accept?: Accept;
  readonly autoFocus?: boolean;
  readonly className?: string;
  readonly classNameInputHint?: string;
  readonly disabled?: boolean;
  readonly errorClass?: string;
  readonly groupClass?: string;
  readonly hideRemoveAll?: boolean;
  readonly hint?: ReactNode;
  readonly hintClass?: string;
  readonly label?: ReactNode;
  readonly labelClass?: string;
  readonly maxFiles?: number;
  readonly maxSize?: number;
  readonly messageErrors?: string;
  readonly minSize?: number;
  readonly required?: boolean;
  readonly imageClassName?: string;
} & (
  | {
      readonly isCircleAvatar?: boolean;
      readonly isOutlineAvatar?: boolean;
      readonly multiple?: false;
      readonly onChange?: (file: FileUploadModel) => void;
      readonly type?: 'avatar' | 'file' | 'image';
    }
  | {
      readonly multiple: true;
      readonly onChange?: (files: FileUploadModel[]) => void;
      readonly type?: 'file' | 'image';
    }
);

const UploadField = <IForm extends object>(props: IProps<IForm>) => {
  const { upload, isLoading } = useUpload();

  const controlId = useId();
  const message = trans('GENERAL.ACTION.CANNOT_UPLOAD');

  const { field, formState } = useController({ control: props.control, name: props.name });
  const errorMessage = formState.errors[props.name]?.message as string;
  const fileList: FileUploadModel[] = getValue();
  const maxSize = 1048576;

  const { getRootProps, getInputProps } = useDropzone({
    accept: props.accept,
    autoFocus: props.autoFocus,
    disabled: props.disabled,
    maxFiles: props.maxFiles,
    maxSize,
    minSize: props.minSize,
    multiple: props.multiple,
    onDropAccepted: handleUploadMultiple,
    onDropRejected: handleReject,
  });

  function handleReject(fileRejections: FileRejection[]) {
    fileRejections.forEach(({ errors }) => {
      // Check if the rejection is due to exceeding the maxSize
      const isSizeTooLarge = errors.some((error) => error.code === 'file-too-large');
      if (isSizeTooLarge) {
        // Customize your error message for file size
        messageAntd.error(props.messageErrors || 'Ảnh phải nhỏ hơn 1MB');
      }
    });

    // Append rejected files with errors (optional, depending on your use case)
    appendFiles(fileRejections.map(({ file, errors }) => ({ ...file, errors, file })));
  }

  function handleRemoveFileAt(index: number) {
    replaceOrRemoveFileAt(fileList, index);
  }

  function handleRemoveAll() {
    setValue([]);
  }

  function handleUploadMultiple(files: File[]) {
    const lengthBeforeUpload = fileList.length;
    let newFiles = appendFiles(files.map((file) => ({ ...file, file, progress: 0 })));
    files.forEach(processUpload);

    async function processUpload(file: File, index: number) {
      const currentIndex = lengthBeforeUpload + index;

      const formData = new FormData();
      formData.append('file', file);
      const fileRes = await upload(formData, updateProgress, props.type);

      const errors = [{ code: 'SERVER_ERROR', message }];
      const f = fileRes || { ...file, errors, file };
      newFiles = replaceOrRemoveFileAt(newFiles, currentIndex, f);

      function updateProgress(progress: number) {
        newFiles = replaceOrRemoveFileAt(newFiles, currentIndex, { ...file, file, progress });
      }
    }
  }

  function getValue(): FileUploadModel[] {
    if (!field.value || isEmpty(field.value)) return [];

    return cloneDeep(props.multiple ? field.value : [field.value]);
  }

  function setValue(files: FileUploadModel[]) {
    const newFiles = cloneDeep(props.multiple ? files : files[files.length - 1]);
    field.onChange(newFiles);
    props.multiple
      ? props.onChange?.(newFiles as FileUploadModel[])
      : props.onChange?.(newFiles as FileUploadModel);
  }

  function replaceOrRemoveFileAt(files: FileUploadModel[], index: number, file?: FileUploadModel) {
    const newFiles = [...files];
    file ? newFiles.splice(index, 1, file) : newFiles.splice(index, 1);
    setValue(newFiles);

    return newFiles;
  }

  function appendFiles(files: FileUploadModel[]) {
    const newFiles = [...fileList, ...files];
    setValue(newFiles);

    return newFiles;
  }

  return (
    <Form.Group className={clsx(props.groupClass)} controlId={controlId}>
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>

      <div className={clsx('p-0', props.classNameInputHint)}>
        {props.type === 'avatar' && (
          <UploadAvatarTemplate
            className={props.className}
            getInputProps={getInputProps}
            getRootProps={getRootProps}
            id={controlId}
            imageClassName={props.imageClassName}
            isCircleAvatar={props.isCircleAvatar}
            isLoading={isLoading}
            isOutlineAvatar={props.isOutlineAvatar}
            onRemove={() => handleRemoveFileAt(0)}
            url={!fileList[0]?.url ? (fileList[0] as string) : fileList[0]?.url} // first file
          />
        )}

        {props.type === 'file' && (
          <UploadFileTemplate
            className={props.className}
            files={fileList}
            getInputProps={getInputProps}
            getRootProps={getRootProps}
            hideRemoveAll={props.hideRemoveAll}
            id={controlId}
            onRemove={handleRemoveFileAt}
            onRemoveAll={handleRemoveAll}
          />
        )}

        {props.type === 'image' && (
          <UploadImagesTemplate
            className={props.className}
            files={fileList}
            getInputProps={getInputProps}
            getRootProps={getRootProps}
            hideRemoveAll={props.hideRemoveAll}
            id={controlId}
            onRemove={handleRemoveFileAt}
            onRemoveAll={handleRemoveAll}
          />
        )}

        <Form.Text className={clsx('text-muted', props.hintClass)}>{props.hint}</Form.Text>
        <Form.Control.Feedback
          className={clsx(errorMessage && 'd-block', props.errorClass)}
          type="invalid"
        >
          {errorMessage}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
};

UploadField.defaultProps = { type: 'file' };

export { UploadField };
