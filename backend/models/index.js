const Sequelize = require('../db');
const Borrower = require('./Borrower');
const Book = require('./Book');
const BorrowedBook = require('./BorrowedBook');
const Author = require('./Author');
const Fine = require('./Fine');
const User = require('./User');
const BooksArchive = require('./BooksArchive');

    Borrower.hasMany(BorrowedBook, { foreignKey: 'borrower_id', as: 'borrowedBooks' });
    BorrowedBook.belongsTo(Borrower, { foreignKey: 'borrower_id', as: 'borrower' });

    Book.hasMany(BorrowedBook, { foreignKey: 'book_id', as: 'borrowedBook' });
    BorrowedBook.belongsTo(Book, { foreignKey: 'book_id', as: 'book' });

    Author.hasMany(Book, { foreignKey: 'author_id', as: 'books' });
    Book.belongsTo(Author, { foreignKey: 'author_id', as: 'author' });

    BorrowedBook.hasOne(Fine, { foreignKey: 'bb_id', as: 'fine' });
    Fine.belongsTo(BorrowedBook, { foreignKey: 'bb_id', as: 'borrowedBook' });

    Book.hasMany(Fine, { foreignKey: 'book_id', as: 'fines' });
    Fine.belongsTo(Book, { foreignKey: 'book_id', as: 'book' });

    Borrower.hasMany(Fine, { foreignKey: 'borrower_id', as: 'fines' });
    Fine.belongsTo(Borrower, { foreignKey: 'borrower_id', as: 'borrower' });

    BooksArchive.belongsTo(Author, { foreignKey: 'author_id', as: 'author' });

module.exports = {
    Sequelize,
    Borrower,
    Book,
    BorrowedBook,
    Author,
    User,
    Fine,
};
