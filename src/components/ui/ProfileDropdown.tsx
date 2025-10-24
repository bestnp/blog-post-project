import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDuotone, SignOutSquareLight, OutLight } from '@/icon/IconsAll';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleProfileClick = () => {
    navigate('/profile');
    onClose();
  };

  const handleResetPasswordClick = () => {
    navigate('/reset-password');
    onClose();
  };

  const handleLogoutClick = () => {
    // Handle logout logic here
    console.log('Logging out...');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-[12px] shadow-lg border border-brown-300 overflow-hidden z-50">
        {/* Profile */}
        <button
          onClick={handleProfileClick}
          className="w-full flex items-center gap-3 px-6 py-4 hover:bg-brown-100 transition-colors text-left"
        >
          <UserDuotone className="w-6 h-6 text-brown-400" />
          <span className="text-body-lg text-brown-500">Profile</span>
        </button>

        {/* Divider */}
        <div className="h-[1px] bg-brown-300"></div>

        {/* Reset Password */}
        <button
          onClick={handleResetPasswordClick}
          className="w-full flex items-center gap-3 px-6 py-4 hover:bg-brown-100 transition-colors text-left"
        >
        <OutLight className="w-6 h-6 text-brown-400" />
          <span className="text-body-lg text-brown-500">Reset password</span>
        </button>

        {/* Divider */}
        <div className="h-[1px] bg-brown-300"></div>

        {/* Log out */}
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center gap-3 px-6 py-4 hover:bg-brown-100 transition-colors text-left"
        >
          <SignOutSquareLight className="w-6 h-6 text-brown-400" />
          <span className="text-body-lg text-brown-500">Log out</span>
        </button>
      </div>
    </>
  );
};

export default ProfileDropdown;
