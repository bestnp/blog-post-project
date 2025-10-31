import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="inline-flex items-center space-x-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brown-600"></div>
        <p className="text-brown-600 text-body-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

