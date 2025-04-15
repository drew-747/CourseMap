import { useApi } from '../hooks/useApi';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_email';
const REMEMBER_ME_KEY = 'remember_me';

export const useAuthService = () => {
  const api = useApi();

  const saveAuthData = (token, email, rememberMe = false) => {
    if (rememberMe) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, email);
      localStorage.setItem(REMEMBER_ME_KEY, 'true');
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(USER_KEY, email);
      localStorage.removeItem(REMEMBER_ME_KEY);
    }
  };

  const getStoredAuthData = () => {
    const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    const email = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true';
    return { token, email, rememberMe };
  };

  const clearAuthData = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    // Optionally keep remember_me setting
  };

  const login = async (email, password, rememberMe = false) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.token) {
      saveAuthData(response.token, email, rememberMe);
    }
    return response;
  };

  const register = async (userData) => {
    return api.post('/auth/register', userData);
  };

  const getCurrentUser = async () => {
    return api.get('/auth/me');
  };

  const updateProfile = async (userData) => {
    return api.put('/auth/profile', userData);
  };

  const logout = () => {
    clearAuthData();
  };

  const changePassword = async (currentPassword, newPassword) => {
    return api.put('/auth/change-password', { currentPassword, newPassword });
  };

  const forgotPassword = async (email) => {
    return api.post('/auth/forgot-password', { email });
  };

  const resetPassword = async (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword });
  };

  const verifyResetToken = async (token) => {
    return api.get(`/auth/verify-reset-token/${token}`);
  };

  return {
    login,
    register,
    getCurrentUser,
    updateProfile,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyResetToken,
    getStoredAuthData,
  };
}; 