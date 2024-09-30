import { FC } from 'react';

import { KTSVG } from '@/_metronic/helpers';
import { Button } from '@/components/molecules/Button';

interface IProps {
  onClickCreateButton?: () => void;
}

const RecruitmentListToolbar: FC<IProps> = (props) => {
  return (
    <div
      className="d-flex justify-content-end"
      data-kt-user-table-toolbar="base"
      data-testid="customer-list-toolbar"
    >
      {/* begin::Add user */}
      <Button
        className="rounded-pill"
        onClick={props.onClickCreateButton}
        title="button-add-customer"
        variant="primary"
      >
        <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr075.svg" />
        Tạo chiến dịch
      </Button>
      {/* end::Add user */}
    </div>
  );
};

export { RecruitmentListToolbar };
