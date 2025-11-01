import React from 'react';

export interface NotificationData {
  id: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
  postId?: number;
}

interface NotificationCardProps {
  notification: NotificationData;
  onClick?: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onClick }) => {
  const { userName, userAvatar, message, timestamp, isRead = false } = notification;

  // Parse message to highlight bold text
  const renderMessage = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-semibold">{boldText}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 px-4 py-3 hover:bg-brown-100 transition-colors cursor-pointer ${
        !isRead ? 'bg-brown-50' : ''
      }`}
    >
      {/* Avatar */}
      <img
        src={userAvatar}
        alt={userName}
        className="w-[48px] h-[48px] rounded-full object-cover flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Message */}
        <p className="text-body-md text-brown-400 mb-1">
          <span className="text-brown-500 font-semibold">{userName} </span>
          {renderMessage(message)}
        </p>

        {/* Timestamp */}
        <p className="text-body-sm text-orange">{timestamp}</p>
      </div>

      {/* Unread indicator */}
      {!isRead && (
        <div className="w-2 h-2 bg-brown-600 rounded-full flex-shrink-0 mt-2"></div>
      )}
    </div>
  );
};

export default NotificationCard;
