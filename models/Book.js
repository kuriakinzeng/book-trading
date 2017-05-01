const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  url: String,
  owner: String,
  requestor: {type: String, default: null},
  requestApproved: {type: Boolean, default: false}
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;