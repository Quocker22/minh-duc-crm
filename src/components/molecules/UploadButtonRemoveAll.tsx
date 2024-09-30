import { FC, MouseEventHandler } from 'react';

import { Button } from '@/components/molecules/Button';
import { trans } from '@/utils';

interface IProps {
  readonly disabled?: boolean;
  readonly hide?: boolean;
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
}

const UploadButtonRemoveAll: FC<IProps> = ({ hide, disabled, onClick }) => {
  if (hide) return null;

  return (
    <Button className="btn-light-danger" disabled={disabled} onClick={onClick} size="sm">
      {trans('GENERAL.ACTION.REMOVE_ALL')}
    </Button>
  );
};

export { UploadButtonRemoveAll };
