import React from 'react';

export default function Login() {
  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
        id=""
      />
      <input
        data-testid="password-input"
        type="password"
        id=""
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}
