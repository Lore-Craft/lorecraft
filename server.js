'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authorize = require('./auth/authorize.js');

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const mongoose = require('mongoose');
const Character = require('./CharacterModel');

app.use(cors());
app.use(express.json());
app.use(authorize);

mongoose.connect(MONGODB_URL);


app.post('/character', async (req, res) => {
  try {
    const characterData = req.body;
    const newCharacter = new Character(characterData);
    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (e) {
    console.log('error creating new character: ', e);
    res.status(500).send(e);
  }
});


app.get('/character/:userEmail', async (req, res) => {
  // console.log('getting list of characters.')
  const { userEmail } = req.params;
  console.log('Yup, its working!');
  try {
    const characters = await Character.find({ userEmail});
    res.json(characters);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/character', async (req, res) => {
  // console.log('getting list of characters.')
  try {
    const characters = await Character.find({ });
    res.json(characters);
  } catch (e) {
    res.status(500).send(e);
  }
});


// Update a Character
app.patch('/character/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const updatedCharacter = await CharacterModel.findByIdAndUpdate(id, req.body, { new: true });

    if (updatedCharacter) {
      res.status(200).json(updatedCharacter);
    } else {
      res.status(404).send("Character not found");
    }
  } catch (e) {
    // Handle any errors
    console.error(e);
    res.status(500).send(e);
  }
});


// Delete a Character
app.delete('/character/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCharacter = await Character.findByIdAndDelete(id);
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
  console.log(`Lorecraft Server v 0.3 (now with auth!) is running on port ${PORT}`);
});
