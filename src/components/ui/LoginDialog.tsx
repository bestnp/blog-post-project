import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup");
    onClose();
  };

  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create an account to continue"
      width="600px"
    >
      <div className="flex flex-col items-center mt-4">
        {/* Create Account Button */}
        <button
          onClick={handleCreateAccount}
          className="w-full max-w-[380px] h-[48px] bg-brown-600 hover:bg-brown-500 text-white rounded-lg text-body-lg font-semibold transition-colors mb-6"
        >
          Create account
        </button>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-body-lg text-brown-400">
            Already have an account?{" "}
          </span>
          <button
            onClick={handleLogin}
            className="text-body-lg text-brown-600 underline hover:no-underline font-medium"
          >
            Log in
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginDialog;
