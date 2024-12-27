const { MongoClient } = require('mongodb');

const username = 'algoaura';
const password = 'sorting';
const clusterName = 'Cluster0';
const dbName = 'algoaura';

const uri = `mongodb+srv://algoaura:sorting123@cluster0.4hzsucn.mongodb.net/`;

let client;

async function connect() {
  try {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

function getClient() {
  if (!client || !client.topology.isConnected()) {
    throw new Error('MongoDB client is not connected');
  }
  return client;
}

async function closeConnection() {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error.message);
    throw error;
  }
}

module.exports = { connect, getClient, closeConnection, dbName };



