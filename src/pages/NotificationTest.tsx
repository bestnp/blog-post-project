import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { BellLight } from '@/icon/IconsAll';
import NotificationDropdown from '@/components/ui/NotificationDropdown';
import NotificationCard, { NotificationData } from '@/components/ui/NotificationCard';

const NotificationTest: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock notification data
  const mockNotifications: NotificationData[] = [
    {
      id: '1',
      userName: 'Thompson P.',
      userAvatar: 'https://i.pravatar.cc/150?img=33',
      message: 'Published new article.',
      timestamp: '2 hours ago',
      isRead: false,
    },
    {
      id: '2',
      userName: 'Jacob Lash',
      userAvatar: 'https://i.pravatar.cc/150?img=14',
      message: 'Comment on the article you have read.',
      timestamp: '4 hours ago',
      isRead: false,
    },
    {
      id: '3',
      userName: 'Sarah Chen',
      userAvatar: 'https://i.pravatar.cc/150?img=45',
      message: 'Liked your comment.',
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: '4',
      userName: 'Mike Johnson',
      userAvatar: 'https://i.pravatar.cc/150?img=52',
      message: 'Started following you.',
      timestamp: '2 days ago',
      isRead: true,
    },
  ];

  const handleNotificationClick = (notification: NotificationData) => {
    console.log('Notification clicked:', notification);
    setIsDropdownOpen(false);
  };

  const handleViewAll = () => {
    console.log('View all notifications');
  };

  return (
    <div className="min-h-screen bg-brown-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-h1 font-bold text-brown-600 mb-8">Notification Component Test</h1>

        {/* Dropdown Test */}
        <div className="bg-white rounded-[16px] p-8 shadow-md mb-8">
          <h2 className="text-h3 font-bold text-brown-600 mb-6">Notification Dropdown</h2>
          
          <div className="flex justify-center">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative p-3 hover:bg-brown-100 rounded-full transition-colors"
              >
                <BellLight className="w-6 h-6 text-brown-400" />
                {/* Badge */}
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <NotificationDropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                notifications={mockNotifications}
                onNotificationClick={handleNotificationClick}
                onViewAll={handleViewAll}
              />
            </div>
          </div>
        </div>

        {/* Individual Cards Test */}
        <div className="bg-white rounded-[16px] p-8 shadow-md mb-8">
          <h2 className="text-h3 font-bold text-brown-600 mb-6">Individual Notification Cards</h2>
          
          <div className="space-y-4">
            <div className="border border-brown-300 rounded-[8px] overflow-hidden">
              <h3 className="text-body-lg font-semibold text-brown-600 px-4 py-2 bg-brown-100">
                Unread Notification
              </h3>
              <NotificationCard
                notification={mockNotifications[0]}
                onClick={() => console.log('Clicked:', mockNotifications[0])}
              />
            </div>

            <div className="border border-brown-300 rounded-[8px] overflow-hidden">
              <h3 className="text-body-lg font-semibold text-brown-600 px-4 py-2 bg-brown-100">
                Read Notification
              </h3>
              <NotificationCard
                notification={mockNotifications[2]}
                onClick={() => console.log('Clicked:', mockNotifications[2])}
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-[16px] p-8 shadow-md">
          <h2 className="text-h3 font-bold text-brown-600 mb-6">Features</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-brown-100 rounded-[8px]">
              <h3 className="text-body-lg font-semibold text-brown-600 mb-3">Notification Card:</h3>
              <ul className="space-y-2 text-body-md text-brown-600">
                <li>✅ User avatar (48x48px, rounded)</li>
                <li>✅ Username (bold)</li>
                <li>✅ Message text</li>
                <li>✅ Timestamp (e.g., "2 hours ago", "4 hours ago")</li>
                <li>✅ Unread indicator (brown dot)</li>
                <li>✅ Hover effect (bg-brown-100)</li>
                <li>✅ Different background for unread (bg-brown-50)</li>
              </ul>
            </div>

            <div className="p-4 bg-brown-100 rounded-[8px]">
              <h3 className="text-body-lg font-semibold text-brown-600 mb-3">Notification Dropdown:</h3>
              <ul className="space-y-2 text-body-md text-brown-600">
                <li>✅ Width: 400px</li>
                <li>✅ Max height: 600px with scroll</li>
                <li>✅ Header: "Notifications" title</li>
                <li>✅ Dividers between items</li>
                <li>✅ "View all notifications" button in footer</li>
                <li>✅ Click backdrop to close</li>
                <li>✅ Empty state message</li>
              </ul>
            </div>

            <div className="p-4 bg-brown-100 rounded-[8px]">
              <h3 className="text-body-lg font-semibold text-brown-600 mb-3">Bell Icon:</h3>
              <ul className="space-y-2 text-body-md text-brown-600">
                <li>✅ Red badge indicator (8x8px)</li>
                <li>✅ Positioned at top-right of bell</li>
                <li>✅ Hover effect on bell button</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTest;
