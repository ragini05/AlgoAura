// App.js
import React from 'react';
import '../src/App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Home from './Component/Home';
import Dashboard from './Component/Dashboard';
import Navbar from './Component/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
