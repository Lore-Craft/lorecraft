'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// const authorize = require('./auth/authorize.js');

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();

const mongoose = require('mongoose');
const User = require('./UserModel');

app.use(cors());
app.use(express.json());
// app.use(authorize);


mongoose.connect(MONGODB_URL);

app.get('/test', (req, res) => {
  console.log('testing sucessful!');
  res.send('Stay tuned for something awesome!');
});


app.listen(PORT, () => console.log(`app v0.1 listening on ${PORT}`));

// Create a new Character
app.post('/character', async (req, res) => {
  try {
    const newCharacter = new User(req.body);
    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Read all Characters
app.get('/character', async (req, res) => {
  try {
    const characters = await User.find();
    res.json(characters);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update a Character
app.patch('/character/:userEmail', async (req, res) => {
  const { userEmail } = req.params;
  // console.log('userEmail: ' + userEmail);
  try {
  console.log('trying...');
    // Use the $push operator to append new characters to the existing array.
    const updatedUser = await User.findOneAndUpdate(
      { userEmail },
      { $push: { characters: { $each: req.body.characters } } },
      { new: true }
    );
    console.log('updatedUser: ', updatedUser)
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send("User with that email address not found");
    }
  } catch (e) {
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

