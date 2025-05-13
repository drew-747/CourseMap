import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseFlow from './pages/CourseFlow';
import LandingPage from './pages/LandingPage';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import GwaCalculator from './pages/GwaCalculator';
import Settings from './pages/Settings';
import Forum from './pages/Forum';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7B1113', // UP Maroon
    },
    secondary: {
      main: '#228B22', // Forest Green
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/flow" element={<PrivateRoute><CourseFlow /></PrivateRoute>} />
            <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/gwa" element={<PrivateRoute><GwaCalculator /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 