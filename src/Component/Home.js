import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to AlgoAura!</h1>
      <div className="button-container">
        <Link to="/signup">
          <button className="styled-button">Signup</button>
        </Link>
        <Link to="/login">
          <button className="styled-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
