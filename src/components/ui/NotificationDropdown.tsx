import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationList from './NotificationList';
import { NotificationData } from './NotificationCard';
import { Button } from './Button';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationData[];
  onNotificationClick?: (notification: NotificationData) => void;
  onViewAll?: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ 
  isOpen, 
  onClose, 
  notifications,
  onNotificationClick,
  onViewAll
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNotificationClick = (notification: NotificationData) => {
    onNotificationClick?.(notification);
    // You can navigate to specific notification or article here
    // navigate(`/notification/${notification.id}`);
  };

  const handleViewAll = () => {
    onViewAll?.();
    navigate('/notifications');
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
      <div className="absolute right-0 top-full mt-2 w-[400px] bg-white rounded-[12px] shadow-lg border border-brown-300 overflow-hidden z-50 max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-brown-300">
          <h3 className="text-h4 font-bold text-brown-600">Notifications</h3>
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto flex-1">
          <NotificationList
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            emptyMessage="No new notifications"
          />
        </div>

        {/* Footer - View All Button */}
        {notifications.length > 0 && (
          <div className="px-6 py-4 border-t border-brown-300">
            <Button
              onClick={handleViewAll}
              variant="text"
              size="default"
              className="w-full"
            >
              View all notifications
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationDropdown;
