import { FC, Key, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { Modal } from '@/components/organisms/Modal';
import { ListHRTable } from '@/modules/hr-management/components/form/ListHRTable';
import { FormRecruitmentTeamsModel, HRModel } from '@/modules/hr-management/models';

interface IProps {
  onSelectedRows: (newSelectedRows?: HRModel[]) => void;
  formMethods?: UseFormReturn<FormRecruitmentTeamsModel, object>;
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const HRGroupModal: FC<IProps> = ({ show, onHide, formMethods, onSelectedRows }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<{
    newSelectedRowKeys: { id: React.Key }[];
    newSelectedRows: HRModel[];
  }>({ newSelectedRowKeys: [], newSelectedRows: [] });

  const handleSubmit = () => {
    onHide?.();
    onSelectedRows(selectedRowKeys.newSelectedRows || []);
  };

  function handleHide() {
    onHide?.();
  }

  return (
    <Modal
      backdrop="static"
      bodyClassName="scroll-y"
      dialogClassName="mw-1000px"
      headerClassName="py-3"
      onHide={handleHide}
      show={show}
      title={<h3 className="text-muted">Thêm nhân sự tuyển dụng vào nhóm</h3>}
      centered
    >
      <ListHRTable
        formMethods={formMethods}
        onSelectedRowKeys={(newSelectedRowKeys: { id: Key }[], newSelectedRows: HRModel[]) => {
          setSelectedRowKeys({ newSelectedRowKeys, newSelectedRows });
        }}
      />

      <div className="text-end pt-10">
        <Button className="rounded-pill py-2 me-3" onClick={() => handleHide()} variant="outline">
          Hủy
        </Button>
        <Button className="rounded-pill py-2" onClick={handleSubmit} variant="primary">
          Thêm
        </Button>
      </div>
    </Modal>
  );
};

export { HRGroupModal };
