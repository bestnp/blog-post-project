import React from "react";
import { cn } from "@/lib/utils";

export interface CommentCardProps {
  // User profile data
  userProfile: {
    name: string;
    avatar?: string;
    avatarAlt?: string;
  };
  
  // Comment data
  comment: {
    id: string;
    text: string;
    createdAt: string | Date;
  };
  
  // Optional styling
  className?: string;
  containerClassName?: string;
  avatarClassName?: string;
  nameClassName?: string;
  timestampClassName?: string;
  textClassName?: string;
  
  // Optional click handlers
  onUserClick?: (userId: string) => void;
  onCommentClick?: (commentId: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  userProfile,
  comment,
  className,
  containerClassName,
  avatarClassName,
  nameClassName,
  timestampClassName,
  textClassName,
  onUserClick,
  onCommentClick,
}) => {
  // Format timestamp
  const formatTimestamp = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleUserClick = () => {
    if (onUserClick) {
      onUserClick(userProfile.name);
    }
  };

  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick(comment.id);
    }
  };

  return (
    <div 
      className={cn(
        "w-full bg-white p-4 space-y-3",
        containerClassName
      )}
    >
      {/* User Profile Section */}
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div 
          className={cn(
            "w-[44px] h-[44px] rounded-full overflow-hidden flex-shrink-0 cursor-pointer",
            avatarClassName
          )}
          onClick={handleUserClick}
        >
          {userProfile.avatar ? (
            <img
              src={userProfile.avatar}
              alt={userProfile.avatarAlt || userProfile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-brown-200 flex items-center justify-center">
              <span className="text-brown-600 font-medium text-lg">
                {userProfile.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="space-y-1">
            {/* User Name */}
            <h4 
              className={cn(
                "font-bold text-h4 text-brown-500 cursor-pointer hover:text-brown-500 transition-colors",
                nameClassName
              )}
              onClick={handleUserClick}
            >
              {userProfile.name}
            </h4>
            
            {/* Timestamp */}
            <p 
              className={cn(
                "text-brown-400 text-body-sm",
                timestampClassName
              )}
            >
              {formatTimestamp(comment.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Comment Text */}
      <div 
        className={cn(
          "text-body-md text-brown-400 leading-relaxed cursor-pointer hover:text-brown-600 transition-colors",
          textClassName
        )}
        onClick={handleCommentClick}
      >
        {comment.text}
      </div>
    </div>
  );
};

export default CommentCard;
