import React from "react";
import { Button } from "./Button";
import { CloseRoundLight } from "@/icon/IconsAll";

export interface ModalButton {
  label: string;
  onClick: () => void;
  variant?: "default" | "secondary" | "ghost";
  className?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  children?: React.ReactNode;
  buttons?: ModalButton[];
  showCloseButton?: boolean;
  width?: string;
  closeOnBackdropClick?: boolean;
  backdropOpacity?: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  children,
  buttons = [],
  showCloseButton = true,
  width = "440px",
  closeOnBackdropClick = true,
  backdropOpacity = 50,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: `rgba(0, 0, 0, ${backdropOpacity / 100})` }}
        onClick={handleBackdropClick}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-[12px] shadow-xl max-w-[90vw] p-6 relative"
          style={{ width }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 hover:bg-brown-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <CloseRoundLight className="w-6 h-6 text-brown-400" />
            </button>
          )}

          {/* Title */}
          {title && (
            <h3 className="text-h4 font-bold text-brown-600 mb-3 pr-8">
              {title}
            </h3>
          )}

          {/* Message */}
          {message && (
            <p className="text-body-md text-brown-400 mb-6">
              {message}
            </p>
          )}

          {/* Custom Content */}
          {children}

          {/* Buttons */}
          {buttons.length > 0 && (
            <div className="flex justify-end gap-3 mt-6">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  onClick={button.onClick}
                  variant={button.variant || "default"}
                  size="default"
                  className={button.className}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;

