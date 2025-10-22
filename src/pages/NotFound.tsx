import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/ui/Footer';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brown-100 flex flex-col">
      <NavBar />
      
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          {/* Alert Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-brown-600 flex items-center justify-center">
              <span className="text-brown-600 text-5xl font-bold">!</span>
            </div>
          </div>

          {/* Page Not Found Text */}
          <h1 className="text-h2 font-bold text-brown-600 mb-8">
            Page Not Found
          </h1>

          {/* Go To Homepage Button */}
          <button
            onClick={handleGoHome}
            className="px-8 py-3 bg-brown-600 text-white rounded-full hover:bg-brown-700 transition-colors text-body-lg font-medium"
          >
            Go To Homepage
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;

