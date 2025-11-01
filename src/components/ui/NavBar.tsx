import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon, BellLight, ExpandDownLight } from "@/icon/IconsAll";
import { Button } from "@/components/ui/Button";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";
import { useAuth } from "@/context/authentication";
import { useNotifications } from "@/hooks/useNotifications";
import { Notification as NotificationType } from "@/services/api";

interface NavBarProps {
  isAdmin?: boolean; // Deprecated - will use role from auth state instead
}

const NavBar: React.FC<NavBarProps> = ({ 
  isAdmin: propIsAdmin = false // Keep for backward compatibility
}) => {
  const { isAuthenticated, state } = useAuth();
  const { notifications: apiNotifications, unreadCount } = useNotifications(isAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();

  // Get user info from auth state
  const userName = state.user?.name || state.user?.username || "User";
  const userAvatar = state.user?.avatar || "https://via.placeholder.com/40";
  
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
    if (isAuthenticated && state.user) {
      console.log('🔍 NavBar - User role check:', {
        userRole,
        rawRole: state.user?.role,
        isAdmin,
        userData: state.user,
        isAuthenticated,
      });
    }
  }, [state.user, isAuthenticated, userRole, isAdmin]);

  // Convert API notifications to NotificationData format
  const notifications = apiNotifications.map((notif: NotificationType) => ({
    id: notif.id,
    userName: notif.userName,
    userAvatar: notif.userAvatar,
    message: notif.message,
    timestamp: notif.timestamp,
    isRead: notif.isRead,
    postId: notif.postId,
  }));

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <nav className="bg-white border-b border-brown-300">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="text-xl font-semibold text-brown-500 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <LogoIcon className="w-[44px] h-[44px]" />
          </button>
          
          {/* Desktop Menu */}
          {!isAuthenticated ? (
            <div className="hidden md:flex space-x-2">
              <Button 
                onClick={handleLoginClick}
                variant="secondary"
                size="lg"
              >
                Log in
              </Button>
              <Button 
                onClick={handleSignUpClick}
                variant="default"
                size="lg"
                className="!text-white"
              >
                Sign up
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-2 hover:bg-brown-100 rounded-full transition-colors"
                >
                  <BellLight className="w-6 h-6 text-brown-400" />
                  {/* Notification Badge - only show if there are unread notifications */}
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                <NotificationDropdown
                  isOpen={isNotificationOpen}
                  onClose={() => setIsNotificationOpen(false)}
                  notifications={notifications}
                  onNotificationClick={(notification) => {
                    if (notification.postId) {
                      navigate(`/post/${notification.postId}`);
                    }
                    setIsNotificationOpen(false);
                  }}
                  onViewAll={() => {
                    if (isAdmin) {
                      navigate('/admin/notifications');
                    } else {
                      navigate('/notifications');
                    }
                  }}
                />
              </div>

              {/* Profile Section */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-3 hover:bg-brown-100 rounded-full py-1 pl-1 pr-3 transition-colors"
                >
                  <img 
                    src={userAvatar} 
                    alt={userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-body-lg text-brown-500 font-medium">{userName}</span>
                  <ExpandDownLight className="w-5 h-5 text-brown-400" />
                </button>

                <ProfileDropdown
                  isOpen={isProfileDropdownOpen}
                  onClose={() => setIsProfileDropdownOpen(false)}
                  isAdmin={isAdmin}
                />
              </div>
            </div>
          )}

          {/* Mobile Hamburger Menu */}
          <button 
            className="md:hidden flex flex-col space-y-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="w-6 h-0.5 bg-brown-600"></span>
            <span className="w-6 h-0.5 bg-brown-600"></span>
            <span className="w-6 h-0.5 bg-brown-600"></span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-brown-300 bg-white px-4 py-4 space-y-3">
            {!isAuthenticated ? (
              <>
                <Button 
                  onClick={handleLoginClick}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  Log in
                </Button>
                <Button 
                  onClick={handleSignUpClick}
                  variant="default"
                  size="lg"
                  className="w-full !text-white"
                >
                  Sign up
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                {/* Profile Info */}
                <div className="flex items-center gap-3 p-2">
                  <img 
                    src={userAvatar} 
                    alt={userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="text-body-lg text-brown-500 font-medium">{userName}</span>
                </div>
                
                {/* Notification */}
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brown-100 rounded-lg transition-colors">
                  <BellLight className="w-6 h-6 text-brown-400" />
                  <span className="text-body-lg text-brown-500">Notifications</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

