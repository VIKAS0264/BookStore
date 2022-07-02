const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Book = require('../models/Book');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get allBooks list
router.get('/', (req, res) => 
  Book.findAll()
    .then(books => res.render('books', {
        books
      }))
    .catch(err => res.render('error', {error: err})));

  

// Display add book form
  router.get('/add', (req, res) => res.render('add'));


  router.post('/add', (req, res) => {
    let { title, branch, description, contact_email,sem,author,isdn } = req.body;
    let errors = [];
  
    // Validate Fields
    if(!title) {
      errors.push({ text: 'Please add a title' });
    }
    if(!branch) {
      errors.push({ text: 'Please add a branch' });
    }
    if(!sem){
        errors.push({ text: 'Please add sem' });
    }
    if(!description) {
      errors.push({ text: 'Please add a description' });
    }
    if(!description) {
      errors.push({ text: 'Please add author name' });
    }
    if(!description) {
      errors.push({ text: 'Please add isdn number' });
    }
    if(!contact_email) {
      errors.push({ text: 'Please add a contact email' });
    }
  
    // Check for errors
    if(errors.length > 0) {
      res.render('add', {
        errors,
        title, 
        branch,  
        description, 
        contact_email,
        sem,
        isdn,
        author
      });
    } else {
      if(!sem) {
        sem = 'Unknown';
      } else {
        sem = `${sem}`;
      }

  
      // Insert into table
      Book.create({
        title,
        branch,
        description,
        contact_email,
        sem,
        author,
        isdn
      })
        .then(book => res.redirect('/books'))
        .catch(err => res.render('error', {error:err.message}))
    }
  }); 
  
  
  router.get('/search', (req, res) => {
    let { term } = req.query;
  
    // Make lowercase
    term = term.toLowerCase();
  
    Book.findAll({ where: { branch: { [Op.like]: '%' + term + '%' } } })
      .then(books => res.render('books', { books }))
      .catch(err => res.render('error', {error: err}));
  });

module.exports = router;