import { useState, useEffect, useCallback } from 'react';
import { blogApi, Notification } from '@/services/api';

export const useNotifications = (isLoggedIn: boolean = false) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!isLoggedIn) {
      setNotifications([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await blogApi.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await blogApi.markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      await blogApi.markAllNotificationsAsRead();
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  }, []);

  // Get unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Fetch on mount and when logged in
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  };
};

export default useNotifications;
