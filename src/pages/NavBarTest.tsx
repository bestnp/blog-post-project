import React, { useState } from 'react';
import NavBar from '@/components/ui/NavBar';
import { Button } from '@/components/ui/Button';
import { useNotifications } from '@/hooks/useNotifications';

const NavBarTest: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Use notifications hook
  const { notifications, loading, error, unreadCount } = useNotifications(isLoggedIn);

  return (
    <div className="min-h-screen bg-brown-100">
      {/* NavBar */}
      <NavBar 
        isLoggedIn={isLoggedIn}
        userName="Moodeng ja"
        userAvatar="https://i.pravatar.cc/150?img=12"
        notifications={notifications}
        isAdmin={isAdmin}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-[16px] p-8 shadow-md">
          <h1 className="text-h1 font-bold text-brown-600 mb-8">NavBar Test</h1>

          {/* Toggle Button */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                variant="default"
                size="lg"
                className="!text-white"
              >
                Toggle Login State
              </Button>
              <span className="text-body-lg text-brown-600">
                Current State: <strong>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</strong>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsAdmin(!isAdmin)}
                variant="secondary"
                size="lg"
                disabled={!isLoggedIn}
              >
                Toggle Admin Role
              </Button>
              <span className="text-body-lg text-brown-600">
                Admin Role: <strong>{isAdmin ? 'Admin' : 'Regular User'}</strong>
              </span>
            </div>

            {/* Notification Status */}
            {isLoggedIn && (
              <div className="p-4 bg-brown-50 rounded-[8px] border border-brown-300">
                <h3 className="text-body-lg font-semibold text-brown-600 mb-2">Notification Status:</h3>
                <div className="space-y-1 text-body-md text-brown-600">
                  <p>📊 Total: <strong>{notifications.length}</strong></p>
                  <p>🔴 Unread: <strong>{unreadCount}</strong></p>
                  <p>📡 Status: <strong>{loading ? 'Loading...' : error ? 'Error' : 'Loaded'}</strong></p>
                  {error && <p className="text-red-500">⚠️ {error}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div className="p-4 bg-brown-100 rounded-[8px]">
              <h3 className="text-h4 font-semibold text-brown-600 mb-3">Not Logged In State:</h3>
              <ul className="space-y-2 text-body-md text-brown-600">
                <li>• Shows "Log in" and "Sign up" buttons</li>
                <li>• Desktop: Buttons in top right</li>
                <li>• Mobile: Hamburger menu with buttons</li>
              </ul>
            </div>

            <div className="p-4 bg-brown-200 rounded-[8px]">
              <h3 className="text-h4 font-semibold text-brown-600 mb-3">Logged In State:</h3>
              <ul className="space-y-2 text-body-md text-brown-600">
                <li>• Shows notification bell icon with red badge (if unread)</li>
                <li>• Click bell to open notification dropdown</li>
                <li>• Shows profile avatar + username</li>
                <li>• Shows dropdown arrow icon</li>
                <li>• Click profile to open profile dropdown menu</li>
                <li>• Profile dropdown has: Profile, Reset password, Log out</li>
                <li>• If Admin: Shows "Admin panel" option in dropdown</li>
                <li>• Mobile: Shows profile info in hamburger menu</li>
              </ul>
            </div>

            <div className="p-4 bg-brown-100 rounded-[8px]">
              <h3 className="text-h4 font-semibold text-brown-600 mb-3">Features:</h3>
              <ul className="space-y-2 text-body-md text-brown-600">
                <li>✅ Responsive design (Desktop + Mobile)</li>
                <li>✅ Profile avatar (40x40px, rounded)</li>
                <li>✅ Username display</li>
                <li>✅ Notification bell with badge (shows count of unread)</li>
                <li>✅ Notification dropdown (integrated!)</li>
                <li>✅ Profile dropdown menu (Profile, Reset password, Log out)</li>
                <li>✅ Admin panel option (only visible for admin users)</li>
                <li>✅ Hover effects on all interactive elements</li>
                <li>✅ Badge only shows when there are unread notifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarTest;
