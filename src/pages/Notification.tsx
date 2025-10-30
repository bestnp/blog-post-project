import React, { useState } from "react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { Button } from "@/components/ui/Button";

interface NotificationItem {
  id: number;
  type: "comment" | "like";
  userName: string;
  userAvatar: string;
  articleTitle: string;
  commentText?: string;
  time: string;
}

const Notification: React.FC = () => {
  const [notifications] = useState<NotificationItem[]>([
    {
      id: 1,
      type: "comment",
      userName: "Jacob Lash",
      userAvatar: "https://i.pravatar.cc/150?img=12",
      articleTitle: "The Fascinating World of Cats: Why We Love Our Furry Friends",
      commentText: "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
      time: "4 hours ago",
    },
    {
      id: 2,
      type: "like",
      userName: "Jacob Lash",
      userAvatar: "https://i.pravatar.cc/150?img=12",
      articleTitle: "The Fascinating World of Cats: Why We Love Our Furry Friends",
      time: "6 hours ago",
    },
  ]);

  const handleView = (id: number) => {
    console.log("View notification:", id);
    // TODO: Navigate to article or comment
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Admin Sidebar */}
      <AdminSidebar userName="Admin" />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <h1 className="text-h3 font-bold text-brown-600 mb-6">Notification</h1>

          {/* Divider */}
          <div className="h-[1px] bg-brown-300 mb-6 -mx-8"></div>

          {/* Notifications List */}
          <div className="divide-y divide-brown-200">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-brown-400">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-6 hover:bg-brown-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <img
                      src={notification.userAvatar}
                      alt={notification.userName}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <span className="text-body-md font-semibold text-brown-600">
                          {notification.userName}
                        </span>
                        {notification.type === "comment" ? (
                          <span className="text-body-md text-brown-600">
                            {" "}Commented on your article:{" "}
                          </span>
                        ) : (
                          <span className="text-body-md text-brown-600">
                            {" "}liked your article:{" "}
                          </span>
                        )}
                        <span className="text-body-md text-brown-600">
                          {notification.articleTitle}
                        </span>
                      </div>

                      {/* Comment Text (if exists) */}
                      {notification.commentText && (
                        <p className="text-body-md text-brown-400 mb-2">
                          "{notification.commentText}"
                        </p>
                      )}

                      {/* Time */}
                      <p className="text-body-sm text-orange-500">
                        {notification.time}
                      </p>
                    </div>

                    {/* View Button */}
                    <Button
                      onClick={() => handleView(notification.id)}
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0 text-brown-600 hover:text-brown-500"
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;

