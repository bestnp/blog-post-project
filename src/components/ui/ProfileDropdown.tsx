import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDuotone, SignOutSquareLight, RefreshLight, NotebookLight } from '@/icon/IconsAll';
import { useAuth } from '@/context/authentication';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
  isAdmin?: boolean; // Deprecated - will use role from auth state instead
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  isOpen, 
  onClose, 
  isAdmin: propIsAdmin = false // Keep for backward compatibility
}) => {
  const navigate = useNavigate();
  const { logout, state } = useAuth();
  
  // Determine if user is admin based on role from auth state
  // Backend should return role from database (admin/user) via /auth/me endpoint
  // Check multiple possible role fields
  const rawRole = state.user?.role;
  const userRole = rawRole?.toLowerCase();
  
  // Admin can be identified by role === 'admin'
  // Also check if role is explicitly 'admin' (case-insensitive)
  const isAdmin = propIsAdmin || 
    userRole === 'admin' ||
    rawRole === 'admin' ||
    (state.user as any)?.role === 'admin';
  
  // Debug logging and force re-render when user changes
  useEffect(() => {
    if (state.user) {
      console.log('🔍 ProfileDropdown - User role check:', {
        userRole,
        rawRole: state.user?.role,
        isAdmin,
        userData: state.user,
        isOpen,
      });
    }
  }, [state.user, userRole, isAdmin, isOpen]);

  if (!isOpen) return null;

  const handleProfileClick = () => {
    if (isAdmin) {
      navigate('/admin/profile');
    } else {
      navigate('/profile?tab=profile');
    }
    onClose();
  };

  const handleResetPasswordClick = () => {
    if (isAdmin) {
      navigate('/admin/reset-password');
    } else {
      navigate('/profile?tab=reset-password');
    }
    onClose();
  };

  const handleAdminPanelClick = () => {
    navigate('/admin/articles');
    onClose();
  };

  const handleLogoutClick = () => {
    logout();
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
              <NotebookLight className="w-6 h-6 text-brown-400" />
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
          <SignOutSquareLight className="w-6 h-6 text-brown-400" />
          <span className="text-body-lg text-brown-500">Log out</span>
        </button>
      </div>
    </>
  );
};

export default ProfileDropdown;
