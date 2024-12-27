// Signup.js

import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      contactNo: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      registrationResponse: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { firstName, lastName, email, username, password, confirmPassword } = this.state;
  
      // Check if passwords match
      if (password !== confirmPassword) {
        console.error("Passwords don't match");
        this.setState({ registrationResponse: "Passwords don't match" });
        return;
      }
  
      // Log form data before sending the request
      console.log('Form Data:', {
        firstName,
        lastName,
        email,
        username,
        password,
      });
  
      // Make a POST request to your server endpoint without sending confirmPassword
      const response = await axios.post('http://localhost:3000/api/register', {
        firstName,
        lastName,
        email,
        username,
        password,
      });
  
      // Log the response from the server
      console.log('Server Response:', response.data);
  
      console.log('Signup successful');
      this.setState({ registrationResponse: 'Signup successful' });
      // You can redirect the user or perform other actions after successful signup
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error('Signup failed:', error.response.data.error);
        this.setState({ registrationResponse: `Signup failed: ${error.response.data.error}` });
      } else {
        console.error('Signup failed:', error.message);
        this.setState({ registrationResponse: 'Signup failed: An unexpected error occurred' });
      }
    }
  };
  

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <center>
                      <img src="img/user_no_photo.png" width="150" alt="User" />
                    </center>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <hr />
                  </div>
                </div>
                <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="row">
                    <div className="col-md-6">
                      <label>First name</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.handleInputChange}
                          placeholder="first name"    
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>Last name</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={this.state.lastName}
                          onChange={this.handleInputChange}
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-6">
                      <label>Contact no</label>
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          name="contactNo"
                          value={this.state.contactNo}
                          onChange={this.handleInputChange}
                          placeholder="Contact No"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>Email ID</label>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          placeholder="Email ID"
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">
                      <label>Username</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.username}
                          onChange={this.handleInputChange}
                          placeholder="Username"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label>Password</label>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label>Confirm Password</label>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={this.handleInputChange}
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div className="form-group d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-outline-light btn-block btn-lg"
                      style={{ backgroundColor: 'mediumslateblue' }}
                    >
                      Register
                    </button>
                  </div>
                  {this.state.registrationResponse && (
                    <div className="alert alert-info mt-3" role="alert">
                      {this.state.registrationResponse}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
