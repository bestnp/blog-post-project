import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { CloseRoundLight } from '@/icon/IconsAll';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCreateAccount = () => {
    navigate('/signup');
    onClose();
  };

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-[16px] w-full max-w-[600px] p-12 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-brown-400 hover:text-brown-600 transition-colors"
          >
            <CloseRoundLight className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="flex flex-col items-center">
            {/* Title */}
            <h2 className="text-h2 font-bold text-brown-600 text-center mb-8">
              Create an account to continue
            </h2>

            {/* Create Account Button */}
            <Button
              variant="default"
              size="lg"
              onClick={handleCreateAccount}
              className="w-full max-w-[380px] !text-white mb-8"
            >
              Create account
            </Button>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-body-lg text-brown-400">Already have an account? </span>
              <button
                onClick={handleLogin}
                className="text-body-lg text-brown-600 underline hover:no-underline font-medium"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
