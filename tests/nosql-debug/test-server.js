const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../../UserModel'); // make sure to provide the correct path to your Mongoose model file

const app = express();
const port = 3001;

// const MongoURL = 'mongodb://localhost:27017';
const MongoURL = 'mongodb+srv://<username:password>@cluster0.wlju2vn.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'minecraft_db';
const fullMongoURL = `${MongoURL}/${dbName}`;

// Connect to MongoDB
mongoose.connect(fullMongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Middleware to handle JSON request bodies
app.use(express.json());

// Endpoint to get all users
app.get('/character', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`TEST Server running on http://${MongoURL}:${port}/`);
});
