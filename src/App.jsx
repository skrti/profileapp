// LoginSignupForm.jsx
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import './amplifyConfig'; // import your config

export default function LoginSignupForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [step, setStep] = useState('form'); // form | confirm

  const handleSignup = async () => {
    try {
      await Auth.signUp({ username: email, password });
      alert('Sign up successful! Check your email for a verification code.');
      setStep('confirm');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleConfirm = async () => {
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      alert('Email verified! You can now log in.');
      setIsSignup(false);
      setStep('form');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await Auth.signIn(email, password);
      alert(`Logged in as ${user.username}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>

      {step === 'form' ? (
        <>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />

          {isSignup ? (
            <button onClick={handleSignup}>Sign Up</button>
          ) : (
            <button onClick={handleLogin}>Log In</button>
          )}

          <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </>
      ) : (
        <>
          <input type="text" placeholder="Verification Code" value={confirmationCode} onChange={e => setConfirmationCode(e.target.value)} /><br />
          <button onClick={handleConfirm}>Confirm Sign Up</button>
        </>
      )}
    </div>
  );
}
