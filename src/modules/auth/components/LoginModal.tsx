import { FC } from 'react';

import { Modal } from '@/components/organisms/Modal';

interface IProps {
  readonly onHide?: () => void;
  readonly onSaved?: () => void;
  readonly show?: boolean;
}

const LoginModal: FC<IProps> = ({ show, onHide }) => {
  function handleHide() {
    onHide?.();
  }

  return (
    <Modal
      bodyClassName="scroll-y"
      dialogClassName="mw-450px"
      onHide={handleHide}
      show={show}
      title={<h2 className="fw-bolder text-center w-100 m-0 p-0">Quên mật khẩu</h2>}
      centered
    >
      <span>Vui lòng liên hệ admin để được hỗ trợ cấp lại mật khẩu. Hotline: 1900.xxx.xxx</span>
    </Modal>
  );
};

export { LoginModal };
