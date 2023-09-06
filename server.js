'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const mongoose = require('mongoose');
const User = require('./UserModel');

app.use(cors());
app.use(express.json());
// app.use(authorize);

mongoose.connect(MONGODB_URL);

// Create a new Character
app.post('/character', async (req, res) => {
  // console.log('creating new character: ', req.body)
  try {
    const newCharacter = new User(req.body);
    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (e) {
    console.log('error creating new character: ', e);
    res.status(500).send(e);
  }
});

// Read all Characters
app.get('/character', async (req, res) => {
  // console.log('getting list of characters.')
  try {
    // console.log('querying')
    const characters = await User.find({});
    // console.log('result: ', characters)
    res.json(characters);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update a Character
app.patch('/character/:userEmail', async (req, res) => {
  const { userEmail } = req.params;
  // console.log('userEmail: ' + userEmail);
  console.log('userEmail', userEmail);
  try {
    const incomingCharacters = req.body.characters; // Assuming the incoming JSON has a "characters" property

    // Find the user by userEmail
    const user = await User.findOne({ userEmail });

    if (!user) {
      return res.status(404).send("User with that email address not found");
    }

    // Append the incoming characters to the user's characters array
    user.characters.push(...incomingCharacters);

    // Save the updated user document
    const updatedUser = await user.save();

    console.log('updatedUser: ', updatedUser);
    res.status(200).json(updatedUser);
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send(e);
  }
});

// Delete a Character
app.delete('/character/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCharacter = await User.findByIdAndDelete(id);
    if (deletedCharacter) {
      res.status(200).json(deletedCharacter);
    } else {
      res.status(404).send("Character not found");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
