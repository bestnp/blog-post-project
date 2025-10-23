import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { CloseRoundLight } from '@/icon/IconsAll';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-brown-600 opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Dialog */}
      <div className="relative bg-white rounded-2xl p-[40px] max-w-xl w-full mx-4 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[16px] right-[24px] text-brown-400 hover:text-brown-600 transition-colors"
        >
          <CloseRoundLight className="w-[24px] h-[24px]" />
        </button>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-h2 font-bold text-brown-600 mt-[24px]">
            Create an account to continue
          </h2>
          
          <Button
            variant="default"
            size="lg"
            onClick={handleCreateAccount}
            className="mx-auto !text-white my-[40px]"
          >
            Create account
          </Button>
          
          <p className="text-brown-400 text-body-lg">
            Already have an account?{' '}
            <button 
              onClick={handleLogin}
              className="ml-[12px] text-body-lg text-brown-600 font-semibold underline hover:text-brown-700 transition-colors"
            >
              Log in
            </button>
          </p>
        </div>
      </div>    
    </div>
  );
};

export default LoginDialog;

