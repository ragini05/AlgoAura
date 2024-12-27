// CodeDisplay.js
import React from 'react';

const CodeDisplay = ({ code }) => {
  return (
    <div className="code-display">
      <pre>{code}</pre>
    </div>
  );
};

export default CodeDisplay;
