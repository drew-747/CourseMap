import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const AnimatedInput = ({ label, type, value, onChange, placeholder, error }) => (
  <motion.div 
    className="relative mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full px-4 py-3 text-lg bg-white dark:bg-neutral-800 
        border-2 rounded-xl outline-none transition-all duration-200
        ${error ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'} 
        focus:border-primary hover:border-neutral-300 dark:hover:border-neutral-600
        text-neutral-900 dark:text-white placeholder-neutral-400
        shadow-soft hover:shadow-soft-lg
      `}
    />
    {error && (
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-sm mt-1"
      >
        {error}
      </motion.p>
    )}
  </motion.div>
);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isValidUPEmail = (email) => {
    const upDomains = [
      '@up.edu.ph',
      '@upd.edu.ph',
      '@uplb.edu.ph',
      '@upm.edu.ph',
      '@upv.edu.ph',
      '@upmin.edu.ph',
      '@upb.edu.ph',
      '@upvisayas.edu.ph',
      '@upou.edu.ph',
      '@upcebu.edu.ph',
      '@uptc.edu.ph',
      '@upbaguio.edu.ph',
      '@upmanila.edu.ph'
    ];
    return upDomains.some(domain => email.toLowerCase().endsWith(domain));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!isValidUPEmail(email)) {
      setError('Please use your UP email address');
      setIsLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-credential':
          setError('Invalid email or password');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/email-already-in-use':
          setError('Email already in use. Please sign in instead.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft-lg p-8 space-y-6">
          {/* Logo and Title */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src="/dcs_logo.png" 
              alt="DCS Logo" 
              className="w-20 h-20 mx-auto mb-4"
            />
            <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white">
              {isSignUp ? 'Create Account' : 'Welcome Back!'}
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2">
              {isSignUp ? 'Join the CS community' : 'Sign in to continue'}
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 text-red-500 p-4 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatedInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="UP Email Address"
              error={error && error.includes('email') ? error : ''}
            />

            <AnimatedInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              error={error && error.includes('password') ? error : ''}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-4 rounded-xl font-medium text-white
                transition-all duration-200 relative overflow-hidden
                ${isLoading ? 'bg-primary/70' : 'bg-primary hover:bg-primary-dark'}
                shadow-lg hover:shadow-xl hover:shadow-primary/20
              `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </motion.button>
          </form>

          {/* Toggle Sign In/Sign Up */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-center text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Login; 