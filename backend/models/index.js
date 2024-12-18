const Sequelize = require('../db');
const Borrower = require('./Borrower');
const Book = require('./Book');
const BorrowedBook = require('./BorrowedBook');
const Author = require('./Author');
const User = require('../models/User');

// Define associations
Borrower.hasMany(BorrowedBook, { foreignKey: 'borrower_id', as: 'borrowedBooks' });
BorrowedBook.belongsTo(Borrower, { foreignKey: 'borrower_id', as: 'borrower' });

Book.hasOne(BorrowedBook, { foreignKey: 'book_id', as: 'borrowedBook' });
BorrowedBook.belongsTo(Book, { foreignKey: 'book_id', as: 'book' });

Author.hasMany(Book, { foreignKey: 'author_id', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'author_id', as: 'author' });

// Export all models for easy import
module.exports = {
    Sequelize,
    Borrower,
    Book,
    BorrowedBook,
    Author,
    User
};
