// src/components/Login.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    // Perform authentication logic here (replace with your actual authentication logic)
    if (username === 'admin' && password === 'test123') {
      setAuthenticated(true);
      history.push('/employees'); // Redirect to the main page after successful login
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Login</h2>
      <form>
        <div className="form-group mb-2">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>

        <p className="mt-3">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
