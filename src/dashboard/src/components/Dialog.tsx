import { ReactNode } from 'react';
import { Modal as AntdModal } from 'antd';

interface DialogProps {
  title?: string;
  visible?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  okButtonDisabled?: boolean;
  cancelButtonDisabled?: boolean;
  showCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  destroyOnClose?: boolean;
  children?: ReactNode;
  width?: number;
  className?: string;
}

export function Dialog({
  okButtonDisabled = false,
  cancelButtonDisabled = false,
  closeOnClickOutside = true,
  showCloseButton = true,
  children,
  ...props
}: DialogProps) {
  return (
    <AntdModal
      okButtonProps={{ disabled: okButtonDisabled }}
      cancelButtonProps={{ disabled: cancelButtonDisabled }}
      maskClosable={closeOnClickOutside}
      closable={showCloseButton}
      {...props}
    >
      {children}
    </AntdModal>
  );
}
