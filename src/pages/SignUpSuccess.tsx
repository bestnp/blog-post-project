import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import NavBar from '@/components/ui/NavBar';
import { DoneRoundLight } from '@/icon/IconsAll';

const SignUpSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-brown-100 flex flex-col">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {/* Registration Success Modal */}
        <div className="bg-brown-200 rounded-[12px] shadow-xl w-full max-w-[440px] p-8 relative">
          <div className="flex flex-col items-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-green flex items-center justify-center mb-6">
              <DoneRoundLight className="w-12 h-12 text-white stroke-[3]" />
            </div>

            {/* Success Title */}
            <h3 className="text-h3 font-bold text-brown-600 mb-8 text-center">
              Registration success
            </h3>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              variant="default"
              size="default"
              className="!bg-brown-600 hover:!bg-brown-500 !text-white px-8"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSuccess;

