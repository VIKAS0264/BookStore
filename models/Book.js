const Sequelize = require('sequelize');
const db = require('../config/database');

const Book = db.define('book', {
    title: {
      type: Sequelize.STRING
    },
    branch: {
      type: Sequelize.STRING
    },    
    description: {
      type: Sequelize.STRING
    },
    contact_email: {
      type: Sequelize.STRING
    },
    sem: {
      type: Sequelize.STRING
    },
    isdn: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    }
  });

  module.exports = Book;