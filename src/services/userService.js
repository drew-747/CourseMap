import { useApi } from '../hooks/useApi';

export const useUserService = () => {
  const api = useApi();

  const getUserProfile = async (userId) => {
    return api.get(`/users/${userId}`);
  };

  const updateUserProfile = async (userId, userData) => {
    return api.put(`/users/${userId}`, userData);
  };

  const uploadProfilePhoto = async (userId, photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile);
    
    return api.put(`/users/${userId}/photo`, formData);
  };

  const getUsers = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/users?${queryString}`);
  };

  const searchUsers = async (query) => {
    return api.get(`/users/search?q=${encodeURIComponent(query)}`);
  };

  const followUser = async (userId) => {
    return api.post(`/users/${userId}/follow`);
  };

  const unfollowUser = async (userId) => {
    return api.post(`/users/${userId}/unfollow`);
  };

  const getFollowers = async (userId) => {
    return api.get(`/users/${userId}/followers`);
  };

  const getFollowing = async (userId) => {
    return api.get(`/users/${userId}/following`);
  };

  const getUserActivity = async (userId) => {
    return api.get(`/users/${userId}/activity`);
  };

  return {
    getUserProfile,
    updateUserProfile,
    uploadProfilePhoto,
    getUsers,
    searchUsers,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    getUserActivity,
  };
}; 