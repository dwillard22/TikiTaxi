import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import tikiTaxiLogo from '../assets/TikiTaxiLogo.png';
import './Auth.css';
import '../App.css';

// Component that uses Google OAuth hook (must be inside provider)
const GoogleDriverLoginButton: React.FC<{ onError: (error: string) => void }> = ({ onError }) => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response: any) => {
    try {
      // Send token to backend for verification
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const authResponse = await fetch(`${apiUrl}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: response.access_token }),
      });

      if (!authResponse.ok) {
        throw new Error('Authentication failed');
      }

      const data = await authResponse.json();
      // Mark user as driver
      const driverUser = { ...data.user, role: 'driver' };
      localStorage.setItem('driver', JSON.stringify(driverUser));
      localStorage.setItem('driverToken', response.access_token);
      navigate('/driver');
    } catch (err: any) {
      onError('Failed to login with Google. Please try again.');
      console.error('Google driver login error:', err);
    }
  };

  const handleGoogleError = () => {
    onError('Google login failed. Please try again.');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  return (
    <button
      type="button"
      className="oauth-button oauth-button-google"
      onClick={() => googleLogin()}
    >
      <svg className="oauth-icon" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </button>
  );
};

// Fallback button when Google OAuth is not configured
const GoogleDriverLoginButtonFallback: React.FC<{ onError: (error: string) => void }> = ({ onError }) => {
  return (
    <button
      type="button"
      className="oauth-button oauth-button-google"
      onClick={() => onError('Google OAuth is not configured. Please add VITE_GOOGLE_CLIENT_ID to your environment variables.')}
      disabled
      style={{ opacity: 0.6, cursor: 'not-allowed' }}
    >
      <svg className="oauth-icon" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google (Not Configured)
    </button>
  );
};

const DriverLoginContent: React.FC<{ hasGoogleAuth: boolean }> = ({ hasGoogleAuth }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAppleLogin = async () => {
    try {
      setError('');
      // TODO: Implement full Apple Sign In flow
      // For now, this is a placeholder - Apple Sign In requires additional setup
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const authResponse = await fetch(`${apiUrl}/api/auth/apple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idToken: 'placeholder_token',
          user: { email: 'user@example.com', name: 'Apple User' }
        }),
      });

      if (!authResponse.ok) {
        throw new Error('Authentication failed');
      }

      const data = await authResponse.json();
      // Mark user as driver
      const driverUser = { ...data.user, role: 'driver' };
      localStorage.setItem('driver', JSON.stringify(driverUser));
      navigate('/driver');
    } catch (err: any) {
      setError('Failed to login with Apple. Please try again.');
      console.error('Apple driver login error:', err);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <Link to="/" className="nav-brand-link">
              <img src={tikiTaxiLogo} alt="TikiTaxi logo" className="nav-logo" />
              <h1>TikiTaxi</h1>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/login">Rider Login</Link>
            <Link to="/driver/login">Driver Login</Link>
          </div>
        </nav>
      </header>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <h1>Driver Portal</h1>
            <p>Login to access your driver dashboard</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="oauth-buttons">
            {hasGoogleAuth ? (
              <GoogleDriverLoginButton onError={setError} />
            ) : (
              <GoogleDriverLoginButtonFallback onError={setError} />
            )}

            <button
              type="button"
              className="oauth-button oauth-button-apple"
              onClick={handleAppleLogin}
            >
              <svg className="oauth-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Not a driver?{' '}
              <Link to="/login" className="auth-link">
                Login as rider
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DriverLogin: React.FC = () => {
  // You'll need to add your Google OAuth Client ID to environment variables
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  // If no client ID, render without GoogleOAuthProvider
  if (!clientId) {
    return <DriverLoginContent hasGoogleAuth={false} />;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <DriverLoginContent hasGoogleAuth={true} />
    </GoogleOAuthProvider>
  );
};

export default DriverLogin;

