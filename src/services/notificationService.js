import { useApi } from '../hooks/useApi';

export const useNotificationService = () => {
  const api = useApi();

  const getNotifications = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/notifications?${queryString}`);
  };

  const getUnreadNotifications = async () => {
    return api.get('/notifications/unread');
  };

  const markNotificationAsRead = async (notificationId) => {
    return api.put(`/notifications/${notificationId}/read`);
  };

  const markAllNotificationsAsRead = async () => {
    return api.put('/notifications/read-all');
  };

  const deleteNotification = async (notificationId) => {
    return api.del(`/notifications/${notificationId}`);
  };

  const clearAllNotifications = async () => {
    return api.del('/notifications/clear-all');
  };

  const getNotificationPreferences = async () => {
    return api.get('/notifications/preferences');
  };

  const updateNotificationPreferences = async (preferences) => {
    return api.put('/notifications/preferences', preferences);
  };

  const subscribeToNotifications = async (subscriptionData) => {
    return api.post('/notifications/subscribe', subscriptionData);
  };

  const unsubscribeFromNotifications = async () => {
    return api.post('/notifications/unsubscribe');
  };

  return {
    getNotifications,
    getUnreadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,
    getNotificationPreferences,
    updateNotificationPreferences,
    subscribeToNotifications,
    unsubscribeFromNotifications,
  };
}; 