// SortingVisualizer.js
import React, { useState, useEffect } from 'react';
import '../../src/App.css';
import BubbleSort from './Sorting/BubbleSort';
import SelectionSort from './Sorting/SelectionSort';
import InsertionSort from './Sorting/InsertionSort';
import MergeSort from './Sorting/MergeSort';

const CodeDisplay = ({ code }) => {
  return (
    <div className="code-display">
      <pre>{code}</pre>
    </div>
  );
};

const SortingVisualizer = ({ array, algorithm, speed }) => {
  const [bars, setBars] = useState([]);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [code, setCode] = useState('');

  useEffect(() => {
    const sort = async () => {
      let sortedArray = [];

      switch (algorithm) {
        case 'bubble':
          sortedArray = await BubbleSort([...array], setComparingIndices, setBars, setCode);
          break;
        case 'selection':
          sortedArray = await SelectionSort([...array], setComparingIndices, setBars, setCode);
          break;
        case 'insertion':
          sortedArray = await InsertionSort([...array], setComparingIndices, setBars, setCode);
          break;
        case 'merge':
          sortedArray = await MergeSort([...array], setComparingIndices, setBars, setCode);
          break;
        default:
          sortedArray = array;
          break;
      }

      setBars(sortedArray);
    };

    sort();
  }, [array, algorithm, speed]);

  const renderBars = () => {
    if (!Array.isArray(bars)) {
      console.error('bars is not an array:', bars);
      return null;
    }

    const maxBarHeight = 100;
    const scale = maxBarHeight / Math.max(...array);

    return bars.map((value, index) => (
      <div
        key={index}
        className={`array-bar ${comparingIndices.includes(index) ? 'comparing' : ''}`}
        style={{ height: `${value * scale}px` }}
      >
        <span className="bar-label">{value}</span>
      </div>
    ));
  };
  return (
    <div>
    {/* Main content */}
    <div className="array-container">{renderBars()}</div>
    <CodeDisplay code={code} />
  </div>
);
};
export default SortingVisualizer;
