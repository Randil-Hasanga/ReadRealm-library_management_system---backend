import Sequelize from '../../db';
import Borrower from './Borrower';
import Book from './Book';
import BorrowedBook from './BorrowedBook';
import Author from './Author';
import Fine from './Fine';
import User from './User';

Borrower.hasMany(BorrowedBook, { foreignKey: 'borrower_id', as: 'borrowedBooks' });
BorrowedBook.belongsTo(Borrower, { foreignKey: 'borrower_id', as: 'borrower' });

Book.hasMany(BorrowedBook, { foreignKey: 'book_id', as: 'borrowedBooks' });
BorrowedBook.belongsTo(Book, { foreignKey: 'book_id', as: 'book' });

Author.hasMany(Book, { foreignKey: 'author_id', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'author_id', as: 'author' });

BorrowedBook.hasOne(Fine, { foreignKey: 'bb_id', as: 'fine' });
Fine.belongsTo(BorrowedBook, { foreignKey: 'bb_id', as: 'borrowedBook' });

Book.hasMany(Fine, { foreignKey: 'book_id', as: 'fines' });
Fine.belongsTo(Book, { foreignKey: 'book_id', as: 'book' });

Borrower.hasMany(Fine, { foreignKey: 'borrower_id', as: 'fines' });
Fine.belongsTo(Borrower, { foreignKey: 'borrower_id', as: 'borrower' });

export default {
    Sequelize,
    Borrower,
    Book,
    BorrowedBook,
    Author,
    User,
    Fine,
};
