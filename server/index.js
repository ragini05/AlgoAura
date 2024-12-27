const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connect, getClient, closeConnection, dbName } = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Use cors middleware to enable CORS for all routes
app.use(cors());


app.post('/api/register', async (req, res) => {
  const { firstName, lastName, contactNo, email, username, password } = req.body;

  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('User');

    const user = { firstName, lastName, contactNo, email, username, password };

    // Attempt to insert the user document into the 'users' collection
    const result = await collection.insertOne(user);

    // Log the successful insertion
    console.log('User registered successfully:', result);

    // Respond with success message
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    // Log and handle errors
    console.error('Error registering user:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('User');

    // Find the user with the provided username and password
    const user = await collection.findOne({ username, password });

    if (user) {
      // User found, login successful
      console.log('Login successful:', user);

      // You can add additional logic here, such as creating a session, generating a token, etc.

      res.json({ success: true, message: 'Login successful' });
    } else {
      // User not found, login failed
      console.log('Login failed: User not found');
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    // Log and handle errors
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit();
});

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
