'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharacterSchema = new Schema({
  charName: { type: String, required: true },
  classType: { type: String, required: true },
  alignment: { type: String, required: true },
  gender: { type: String, required: true },
  imageURL: { type: String, required: true },
  backstory: { type: String, required: true }
});

const UserSchema = new Schema({
  userEmail: { type: String, required: true, unique: true },
  characters: [CharacterSchema]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
