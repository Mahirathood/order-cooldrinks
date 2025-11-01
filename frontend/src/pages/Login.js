import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple login logic for demo
    alert('Login functionality would go here');
    navigate('/');
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button>
      </p>
    </div>
  );
};

export default Login;