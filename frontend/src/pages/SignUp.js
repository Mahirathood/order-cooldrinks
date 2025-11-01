import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Simple signup logic for demo
    alert('Sign up functionality would go here');
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Username:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <button onClick={() => navigate('/login')}>Login</button>
      </p>
    </div>
  );
};

export default SignUp;