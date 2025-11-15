import React from "react";
import Modal from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  backdropOpacity?: number;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  backdropOpacity = 50,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      message={message}
      backdropOpacity={backdropOpacity}
      buttons={[
        {
          label: cancelText,
          onClick: onClose,
          variant: "secondary",
          className: "!bg-white !border !border-brown-200 !text-brown-600 hover:!bg-brown-100 !rounded-full",
        },
        {
          label: confirmText,
          onClick: onConfirm,
          variant: "default",
          className: "!bg-brown-600 hover:!bg-brown-500 !text-white !rounded-full",
        },
      ]}
    />
  );
};

export default ConfirmModal;
