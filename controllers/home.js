const Book = require('../models/Book');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res, next) => {
  Book.find({},(err, books)=>{
    if(err) return next(err);
    res.render('home', {
      title: 'Home',
      books
    });
  });
};

exports.createBook = (req,res,next) => {
  const { title, url } = req.body;
  Book.create({
    title,
    url,
    owner: req.user.id
  }, (err, book) => {
    if(err) return next(err);
    res.redirect('/account');
  })
}

exports.deleteBook = (req, res, next) => {
  console.log('deleteBook', req.body._id);
  Book.findByIdAndRemove(req.body._id, (err, book) => {
    if(err) return next(err);
    res.redirect('/account');
  })
}

exports.updateBook = (req, res, next) => {
  console.log('updateBook', req.body);
  const { _id, title, url } = req.body;
  Book.findByIdAndUpdate(_id,{$set: {title, url}}, (err, book) => {
    if(err) return next(err);
    res.redirect('/account');
  })
}

exports.submitRequest = (req, res, next) => {
  console.log('submitRequest', req.body._id, req.user.id);
  Book.findByIdAndUpdate(req.body._id,{$set: {requestor: req.user.id}},(err,book) => {
    console.log(book);
    if(err) return next(err);
    res.redirect('/');
  })
}

exports.cancelRequest = (req, res, next) => {
  console.log('cancelRequest', req.body._id);
  Book.findByIdAndUpdate(req.body._id,{$set: {requestor: null}},(err,book) => {
    if(err) return next(err);
    res.redirect('/');
  })
}

exports.approveRequest = (req, res, next) => {
  Book.findByIdAndUpdate(req.body._id,{$set: {requestApproved: true}},(err,book) => {
    if(err) return next(err);
    res.redirect('/account');
  })
}