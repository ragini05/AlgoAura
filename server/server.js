const express = require('express');
const app = express();
const PORT = 3001;

// Add middleware and other configurations as needed

app.get('/', (req, res) => {
  res.send('Hello, this is the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
