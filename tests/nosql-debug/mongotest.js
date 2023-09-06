'use strict';

const mongoose = require('mongoose');
const UserModel = require('../../UserModel'); // Assuming UserModel is in a separate file

// MongoDB connection URL (replace with your own URL if needed)
const url = 'mongodb://localhost:27017';

// Database name
const dbName = '301test';

// Data to insert
const userData = {
  userEmail: 'test2@example.com',
  characters: [
    {
      charName: 'Character3',
      classType: 'Warrior',
      alignment: 'Neutral Good',
      gender: 'Male',
      imageURL: 'character1.jpg',
      backstory: 'A brave warrior on a quest.'
    },
    {
      charName: 'Character4',
      classType: 'Mage',
      alignment: 'Lawful Evil',
      gender: 'Female',
      imageURL: 'character2.jpg',
      backstory: 'A cunning mage seeking power.'
    }
  ]
};

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Create a new user document using the UserModel
    const newUser = new UserModel(userData);

    // Save the user document to the database
    const savedUser = await newUser.save();
    console.log('User data inserted successfully:', savedUser);

    // Query user data
    const users = await UserModel.find();
    console.log('User data retrieved from the collection:', users);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('Connection closed');
  }
}

// Run the main function
main();
