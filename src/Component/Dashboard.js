import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SortingVisualizer from './SortingVisualizer';
import '../../src/App.css';
import './SortingVisualizer.css';
import './Navbar.css';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [algorithm, setAlgorithm] = useState('Bubble');
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isSorting, setIsSorting] = useState(false);

  const handleAlgorithmChange = (newAlgorithm) => {
    setAlgorithm(newAlgorithm);
    console.log(`Selected algorithm: ${newAlgorithm}`);
  };

  const handleGenerateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setIsSorting(false);
    console.log('Generated new array:', newArray);
  };

  const handleUserInput = () => {
    const inputArray = userInput
      .split(',')
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num));

    setArray(inputArray);
    setIsSorting(true);
    console.log('User input array:', inputArray);

    const limitedArray = inputArray.slice(0, 20);
    setArray(limitedArray);
    console.log('User input array:', limitedArray);
  };

  const handleStopSorting = () => {
    setIsSorting(false);
    console.log('Sorting stopped');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="algorithm-buttons">
          <button onClick={() => handleAlgorithmChange('bubble')}>Bubble Sort</button>
          <button onClick={() => handleAlgorithmChange('selection')}>Selection Sort</button>
          <button onClick={() => handleAlgorithmChange('insertion')}>Insertion Sort</button>
          <button onClick={() => handleAlgorithmChange('merge')}>Merge Sort</button>
        </div>

        <div className="action-buttons">
          <button onClick={handleGenerateArray}>Generate Random Array</button>
          <button onClick={handleUserInput}>Use User Input Array</button>
          <button onClick={handleStopSorting}>Stop</button>
        </div>

        <div className="user-input" >
          <input
            type="text"
            placeholder="Enter array (comma-separated)"
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
        <div className="logout-button" onClick={handleLogout}>
          Logout
        </div>
      </nav>

      <div className="array-container">
        {/* SortingVisualizer component */}
        <SortingVisualizer algorithm={algorithm} array={array} isSorting={isSorting} />
      </div>
    </div>
  );
};

export default Dashboard;
