import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  anchorEl,
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
  
  // State for dropdown position
  const [position, setPosition] = useState<{ top: number | string; right: number | string }>({
    top: 'auto',
    right: 16,
  });

  // Calculate position for fixed dropdown
  const updatePosition = useCallback(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      
      // Calculate position and ensure dropdown stays within viewport
      let top = rect.bottom + 8;
      let right = window.innerWidth - rect.right;
      
      // Ensure dropdown doesn't go off-screen on the right
      if (right < 0) {
        right = 16; // Minimum padding from right edge
      }
      
      // Ensure dropdown doesn't go off-screen on the bottom
      const dropdownHeight = 300; // Approximate height
      if (top + dropdownHeight > window.innerHeight) {
        // Position above the anchor if not enough space below
        top = Math.max(16, rect.top - dropdownHeight - 8);
      }
      
      const newPosition = {
        top,
        right,
      };
      console.log('📍 ProfileDropdown position update:', { rect, newPosition, windowWidth: window.innerWidth, windowHeight: window.innerHeight });
      setPosition(newPosition);
    } else {
      console.log('⚠️ ProfileDropdown: anchorEl is null, using fallback position');
      setPosition({
        top: 80,
        right: 16,
      });
    }
  }, [anchorEl]);

  // Update position when dropdown opens or anchorEl changes
  useEffect(() => {
    if (isOpen) {
      // Use requestAnimationFrame to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        updatePosition();
      }, 0);
      
      // Update position on scroll and resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      // Reset position when closed
      setPosition({
        top: 'auto',
        right: 16,
      });
    }
  }, [isOpen, anchorEl, updatePosition]);

  // Debug logging and force re-render when user changes
  useEffect(() => {
    if (state.user) {
      console.log('🔍 ProfileDropdown - User role check:', {
        userRole,
        rawRole: state.user?.role,
        isAdmin,
        userData: state.user,
        isOpen,
        anchorEl: anchorEl ? 'exists' : 'null',
        position,
      });
    }
  }, [state.user, userRole, isAdmin, isOpen, anchorEl, position]);

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

  // Debug: Log when dropdown content is created
  console.log('🎨 ProfileDropdown rendering:', { isOpen, isAdmin, position });

  const dropdownContent = (
    <>
      {/* Backdrop - invisible overlay to catch clicks */}
      <div 
        className="fixed inset-0 z-[9998] bg-transparent"
        onClick={onClose}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Dropdown Menu */}
      <div 
        className="fixed w-[280px] bg-white rounded-[12px] shadow-lg border border-brown-300 z-[9999] overflow-y-auto max-h-[calc(100vh-100px)]"
        style={{
          position: 'fixed',
          top: typeof position.top === 'number' ? `${position.top}px` : position.top,
          right: typeof position.right === 'number' ? `${position.right}px` : position.right,
          left: 'auto',
          bottom: 'auto',
        }}
      >
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
          <button
            onClick={handleAdminPanelClick}
            className="w-full flex items-center gap-3 px-6 py-4 hover:bg-brown-100 transition-colors text-left"
          >
            <NotebookLight className="w-6 h-6 text-brown-400" />
            <span className="text-body-lg text-brown-500">Admin panel</span>
          </button>
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

  // Use portal to render outside parent container - this ensures fixed positioning works correctly
  if (!isOpen) return null;
  
  // Always render through portal to ensure it's outside any relative/absolute containers
  if (typeof document === 'undefined') return null;
  
  return createPortal(dropdownContent, document.body);
};

export default ProfileDropdown;
