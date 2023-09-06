'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;

const mongoose = require('mongoose');
const User = require('./UserModel');

app.use(cors());
app.use(express.json());

// nosql stuff
const MongoURL = 'mongodb://localhost:27017';
const dbName = 'minecraft_db';


// Create a new Character
app.post('/character', async (req, res) => {
  console.log('creating new character: ', req.body)
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
  console.log('getting list of characters.')
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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
