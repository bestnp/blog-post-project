import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { Button } from "@/components/ui/Button";
import { blogApi, Notification as NotificationType } from "@/services/api";

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await blogApi.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (notification: NotificationType) => {
    if (notification.postId) {
      navigate(`/post/${notification.postId}`);
    }
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
            {loading ? (
              <div className="p-8 text-center text-brown-400">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
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
                        <span className="text-body-md text-brown-600">
                          {" "}{notification.message}
                        </span>
                      </div>

                      {/* Time */}
                      <p className="text-body-sm text-orange-500">
                        {notification.timestamp}
                      </p>
                    </div>

                    {/* View Button */}
                    {notification.postId && (
                      <Button
                        onClick={() => handleView(notification)}
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0 text-brown-600 hover:text-brown-500"
                      >
                        View
                      </Button>
                    )}
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

