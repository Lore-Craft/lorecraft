'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharacterSchema = new Schema({
  charName: { type: String, required: true },
  classType: { type: String, required: true },
  alignment: { type: String, required: true },
  race: {type: String, required: true},
  gender: { type: String, required: true },
  imageURL: { type: String, required: true },
  backstory: { type: String, required: true },
  userEmail: { type: String, required: true}
});


const CharacterModel = mongoose.model('Character', CharacterSchema);

module.exports = CharacterModel;
