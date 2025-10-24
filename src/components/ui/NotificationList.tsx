import React from 'react';
import NotificationCard, { NotificationData } from './NotificationCard';

interface NotificationListProps {
  notifications: NotificationData[];
  onNotificationClick?: (notification: NotificationData) => void;
  emptyMessage?: string;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  onNotificationClick,
  emptyMessage = "No notifications yet"
}) => {
  if (notifications.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-body-md text-brown-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-brown-200">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClick={() => onNotificationClick?.(notification)}
        />
      ))}
    </div>
  );
};

export default NotificationList;
