import React from 'react';

const FontSizeTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Font Size Test</h1>
        
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-1">text-h1 (52px)</p>
            <p className="text-h1">Jacob Lash - H1</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-1">text-h2 (40px)</p>
            <p className="text-h2">Jacob Lash - H2</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-1">text-h3 (24px)</p>
            <p className="text-h3">Jacob Lash - H3</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-1">text-h4 (20px)</p>
            <p className="text-h4 font-bold">Jacob Lash - H4</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-1">text-body-lg (16px)</p>
            <p className="text-body-lg font-bold">Jacob Lash - Body LG</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-1">text-body-md (14px)</p>
            <p className="text-body-md font-bold">Jacob Lash - Body MD</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-1">text-body-sm (12px)</p>
            <p className="text-body-sm">Jacob Lash - Body SM</p>
          </div>

          <div className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-1">Inline style (20px)</p>
            <p style={{ fontSize: '20px' }} className="font-bold">Jacob Lash - Inline 20px</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-1">text-xl Tailwind default (20px)</p>
            <p className="text-xl font-bold">Jacob Lash - text-xl</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontSizeTest;
