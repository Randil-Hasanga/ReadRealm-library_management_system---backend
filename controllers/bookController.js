const bookService = require('../services/bookService');

const bookController = {
    getBooks: async (req, res) => {
        try {
            const books = await bookService.getBooks();
            res.status(201).json({ message: "Books retrieved successfully", data: books });
        } catch (error) {
            res.status(501).json({ message: "Books retrieval failed", error: error.message });
        }
    },
    getBookById: async (req, res) => {
        try {
            const book_id = req.params.id;
            const book = await bookService.getBookById(book_id);
            res.status(201).json({ message: "Book retrieved successfully", data: book });
        } catch (error) {
            res.status(501).json({ message: "Book retrieval failed", error: error.message });
        }
    },
    deleteBook: async (req, res) => {
        try {
            const book_id = req.params.id;
            const effectedRows = await bookService.deleteBook(book_id);
            res.status(201).json({ message: "Book deleted successfully", effectedRows: effectedRows });
        } catch (error) {
            res.status(501).json({ message: "Book deletion failed", error: error.message });
        }
    },
    getDeletedBooks: async (req, res) => {
        try {
            const deletedBooks = await bookService.getDeletedBooks();
            res.status(201).json({ message: "Deleted books retrieved successfully", data: deletedBooks });
        } catch (error) {
            res.status(501).json({ message: "Deleted books retrieval failed", error: error.message });
        }
    },
    updateBook: async (req, res) => {
        try {
            const book_id = req.params.id;
            const updatedBook = await bookService.updateBook(book_id, req.body);
            res.status(201).json({ message: "Book updated successfully", effectedRows: updatedBook });
        } catch (error) {
            res.status(501).json({ message: "Book update failed", error: error.message });
        }
    },
    createBook: async (req, res) => {
        try {
            const book = await bookService.createBook(req.body);
            res.status(201).json({ message: "Book inserted successfully", data: book });
        } catch (error) {
            res.status(501).json({ message: "Book insertion failed", error: error.message });
        }
    }
};

module.exports = bookController;