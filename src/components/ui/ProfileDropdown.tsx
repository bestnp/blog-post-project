import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDuotone, SignOutSquareLight, RefreshLight, DoneRoundLight } from '@/icon/IconsAll';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
  isAdmin?: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose, isAdmin = false }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleProfileClick = () => {
    navigate('/profile');
    onClose();
  };

  const handleResetPasswordClick = () => {
    navigate('/profile');
    onClose();
  };

  const handleAdminPanelClick = () => {
    navigate('/admin/articles');
    onClose();
  };

  const handleLogoutClick = () => {
    // Handle logout logic here
    console.log('Logging out...');
    navigate('/login');
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



        {/* Reset Password */}
        <button
          onClick={handleResetPasswordClick}
          className="w-full flex items-center gap-3 px-6 py-4 hover:bg-brown-100 transition-colors text-left"
        >
        <RefreshLight className="w-6 h-6 text-brown-400" />
          <span className="text-body-lg text-brown-500">Reset password</span>
        </button>

        {/* Admin Panel - Only show for admin users */}
        {isAdmin && (
          <>

            <button
              onClick={handleAdminPanelClick}
              className="w-full flex items-center gap-3 px-6 py-4 hover:bg-brown-100 transition-colors text-left"
            >
              <SignOutSquareLight className="w-6 h-6 text-brown-400" />
              <span className="text-body-lg text-brown-500">Admin panel</span>
            </button>
          </>
        )}

        {/* Divider */}
        <div className="h-[1px] bg-brown-300"></div>

        {/* Log out */}
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center gap-3 px-6 py-4 hover:bg-brown-100 transition-colors text-left"
        >
          <DoneRoundLight className="w-6 h-6 text-brown-400" />
          <span className="text-body-lg text-brown-500">Log out</span>
        </button>
      </div>
    </>
  );
};

export default ProfileDropdown;
