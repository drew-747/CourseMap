import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthService } from '../../services/authService';
import logo from '../../assets/logo.png';

const Login = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register, getStoredAuthData } = useAuthService();

  useEffect(() => {
    // Check for stored credentials
    const { email: storedEmail, rememberMe: wasRemembered } = getStoredAuthData();
    if (storedEmail && wasRemembered) {
      setEmail(storedEmail);
      setRememberMe(true);
      setIsNewUser(false);
    }
  }, [getStoredAuthData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isNewUser) {
        // Register new user
        await register({ email, password });
        // Automatically log them in after registration
        const response = await login(email, password, rememberMe);
        if (response.token) {
          navigate('/onboarding'); // Redirect to onboarding flow
        }
      } else {
        // Login existing user
        const response = await login(email, password, rememberMe);
        if (response.token) {
          navigate('/dashboard'); // Redirect to dashboard
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-16 w-16" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isNewUser ? 'Create your account' : 'Welcome back!'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isNewUser ? 'Start your learning journey today' : 'Sign in to continue'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">UP Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="UP Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {!isNewUser && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
              ) : (
                isNewUser ? 'Sign Up' : 'Sign In'
              )}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <button
            onClick={() => setIsNewUser(!isNewUser)}
            className="font-medium text-green-600 hover:text-green-500"
          >
            {isNewUser
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 