const {Book,BorrowedBook, Author, Sequelize} = require('../models/index'); 
const BooksArchive = require('../models/BooksArchive');

const bookService = {
    getBooks: async () => {
        const books = await Book.findAll({
            attributes: [
                'book_id',
                'book_name',
                'ISBN',
                'author_id',
                [Sequelize.col('Author.author_name'), 'author_name'],
                'quantity',
                'available_qty'
            ],
            include:[
                {
                    model: Author,
                    as: 'author',
                    attributes: []
                }
            ],
            where: {isActive: true}});
        if (!books) {
            console.error('No books found');
        }
        return books;
    },
    getBookById: async (id) => {
        const book = await Book.findOne({ where: { book_id: id } });
        if (!book) {
            console.error('No book found');
        }
        return book;
    },
    deleteBook: async (id) => {
        const [affectedRows] = await Book.update({ isActive: false }, { where: { book_id: id } });
        console.log('Affected Rows:', affectedRows);
        if (affectedRows === 0) {
            console.error('Deletion failed or book not found');
        }
        return affectedRows;
    },

    getDeletedBooks: async () => {
        const deletedBooks = await BooksArchive.findAll();
        if (!deletedBooks) {
            console.error('No deleted books found');
        }
        return deletedBooks;
    },
    updateBook: async (id, updatedFields) => {

        const book = await Book.findOne({ where: { book_id: id } });
        if (!book) {
            console.error('Book not found');
        }

        const [effectedRows] = await Book.update(updatedFields, { where: { book_id: id } });
        if (effectedRows === 0) {
            console.error('Failed to update book');
        }
        return await Book.findOne({ where: { book_id: id } });
    },
    createBook: async (data) => {
        const { book_name } = data;
        const existingBook = await Book.findOne({ where: { book_name: book_name } });

        if (existingBook) {
            console.error(`book ${book_name} already exist`);
        }

        const newBook = await Book.create(data);

        return newBook;
    }
};

module.exports = bookService;