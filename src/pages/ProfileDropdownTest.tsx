import React, { useState } from 'react';
import ProfileDropdown from '@/components/ui/ProfileDropdown';
import { Button } from '@/components/ui/Button';
import { UserDuotone } from '@/icon/IconsAll';

const ProfileDropdownTest: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brown-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-h1 font-bold text-brown-600 mb-8">Profile Dropdown Test</h1>

        {/* Test Section */}
        <div className="bg-white rounded-[16px] p-8 shadow-md">
          <h2 className="text-h3 font-bold text-brown-600 mb-6">Dropdown Menu</h2>
          
          {/* Trigger Button */}
          <div className="flex justify-center">
            <div className="relative">
              <Button
                variant="secondary"
                size="default"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="gap-2"
              >
                <UserDuotone className="w-5 h-5" />
                Open Profile Menu
              </Button>

              <ProfileDropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-brown-100 rounded-[8px]">
            <h3 className="text-body-lg font-semibold text-brown-600 mb-2">Features:</h3>
            <ul className="space-y-2 text-body-md text-brown-600">
              <li>• Profile menu with 3 options</li>
              <li>• Icons for each menu item</li>
              <li>• Hover effects on items</li>
              <li>• Dividers between items</li>
              <li>• Click backdrop to close</li>
            </ul>
          </div>
        </div>

        {/* Second Test - In NavBar Style */}
        <div className="bg-white rounded-[16px] p-8 shadow-md mt-8">
          <h2 className="text-h3 font-bold text-brown-600 mb-6">NavBar Style</h2>
          
          {/* Mock NavBar */}
          <div className="bg-white border border-brown-300 rounded-[8px] p-4 flex justify-between items-center">
            <div className="text-h4 font-bold text-brown-600">hh.</div>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full bg-brown-300 flex items-center justify-center hover:bg-brown-400 transition-colors"
              >
                <UserDuotone className="w-5 h-5 text-brown-600" />
              </button>

              <ProfileDropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdownTest;
