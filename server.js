'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// const authorize = require('./auth/authorize.js');

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();

const mongoose = require('mongoose');
const model = require('./CharacterModel');

app.use(cors());
app.use(express.json());
// app.use(authorize);


mongoose.connect(MONGODB_URL);

app.get('/test', (req, res) => {
  console.log('testing sucessful!');
  res.send('Stay tuned for something awesome!');
});


app.get('/books', async (req, res) => {
  try {
    console.log('Finding userEmail: ' + req.user.email);
    let documents = await BookModel.find({ userEmail : req.user.email });
    res.json(documents);
  } catch (e) {
    console.log('Something went wrong when finding all the books: ', e);
    res.status(500).send(e);
  }
});

app.post('/books', async(req, res, next) => {
  let { title, description, status, userEmail } = req.body;

  if (!title) {
    res.status(400).send('Please submit all information in a JSON query. Failed on title')
  } else if (!description) {
    res.status(400).send('Please submit all information in a JSON query. Failed on description')
  } else if (!status) {
    res.status(400).send('Please submit all information in a JSON query. Failed on status')
  }

  try {
    let newBook = new BookModel({ title, description, status, userEmail: req.user.email });
    let document = await newBook.save();
    console.log('New Book Created, ', document);
    res.status(201).json(document);
  } catch (err){
    res.status(500).send(err);
  }
});

app.put('/books/:bookID', async(req, res) => {
  let bookId = req.params.bookID;
  
  if (!bookId) {
    res.status(400).send('Please provide a valid Book Id');
    return;
  }
  console.log('Updating (via PUT) book of id: ' + bookId);

  try {
    await BookModel.replaceOne({ _id: bookId, userEmail: req.user.email }, req.body);
    let newBook = await BookModel.findOne({ _id: bookId });
    res.status(200).json(newBook);
  } catch (err) {
    res.status(500).send(err);
  }


});


app.delete('/books/:bookID', async (req, res) => {
  let bookId = req.params.bookID;
  if (!bookId) {
    res.status(400).send('Please provide a valid Book Id');
    return;
  }
  console.log('deleting book of id: ' + bookId);
  try {
    let result = await BookModel.findOneAndDelete({ _id: bookId, userEmail: req.user.email });

    if (!result) {
      res.status(404).send('Book ID not found.');
      return;
    }
    console.log('Successfully deleted book with id: ' + bookId);
    res.status(202).send('Successfully deleted book.');

  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send('Invalid book ID format');
    } else {
      res.status(500).send('Internal Server Error, log as follows: ', err);
    }
  }
});


app.listen(PORT, () => console.log(`app v0.1 listening on ${PORT}`));
