// GoogleLoginComponent.tsx
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

const GoogleLoginComponent: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  const handleLoginSuccess = (response: CredentialResponse) => {
    console.log('Google login successful:', response);
    const token = response.credential ?? null; // Ensure a valid token
    setUser(token); // Store the token or send it to the backend
  };

  const handleLoginFailure = (error: Error) => {
    console.error('Login failed:', error.message);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="GoogleLoginComponent">
        <h1>Google Login with React and TypeScript</h1>
        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        ) : (
          <div>
            <h2>Welcome User</h2>
            <p>Logged in successfully!</p>
            <button onClick={() => setUser(null)}>Logout</button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
