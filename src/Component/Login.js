import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loginResponse, setLoginResponse, setIsLoggedIn ] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const { username, password } = credentials;

      // Make a POST request to your server endpoint
      const response = await axios.post('http://localhost:3000/api/login', { username, password });

      console.log('Login successful');
      setLoginResponse('Login successful');

      // Redirect to the dashboard
      navigate('/dashboard');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error.response?.data?.error || 'Unknown error');
      setLoginResponse(`Login failed: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
              <form>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogin}>
                  Login
                </button>
              </form>
              {loginResponse && (
                <div className="alert alert-info mt-3" role="alert">
                  {loginResponse}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
