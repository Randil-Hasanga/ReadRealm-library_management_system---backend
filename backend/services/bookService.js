const { where } = require('sequelize');
const Book = require('../models/Book');
const BooksArchive = require('../models/BooksArchive');

const bookService = {
    getBooks: async () => {
        const books = await Book.findAll();
        if (!books) {
            throw new Error('No books found');
        }
        return books;
    },
    getBookById: async (id) => {
        const book = await Book.findOne({ where: { book_id: id } });
        if (!book) {
            throw new Error('No book found');
        }
        return book;
    },
    deleteBook: async (id) => {
        const effectedRows = await Book.destroy({ where: { book_id: id } });
        console.log('Effected Rows:', effectedRows);
        if (effectedRows === 0) {
            throw new Error('Deletion failed');
        }
        return effectedRows;
    },
    getDeletedBooks: async () => {
        const deletedBooks = await BooksArchive.findAll();
        if (!deletedBooks) {
            throw new Error('No deleted books found');
        }
        return deletedBooks;
    },
    updateBook: async (id, updatedFields) => {

        const book = await Book.findOne({ where: { book_id: id } });
        if (!book) {
            throw new Error('Book not found');
        }

        const [effectedRows] = await Book.update(updatedFields, { where: { book_id: id } });
        if (effectedRows === 0) {
            throw new Error('Failed to update book');
        }
        return await Book.findOne({ where: { book_id: id } });
    },
    createBook: async (data) => {
        const { book_name } = data;
        const existingBook = await Book.findOne({ where: { book_name: book_name } });

        if (existingBook) {
            throw new Error(`book ${book_name} already exist`);
        }

        const newBook = await Book.create(data);

        return newBook;
    }
};

module.exports = bookService;