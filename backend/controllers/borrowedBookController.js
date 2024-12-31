const borrowedBookService = require('../services/borrowedBookService');

const borrowedBookController = {
    getBorrowedBooks: async (req, res) => {
        try {
            const books = await borrowedBookService.getBorrowedBooks();
            res.status(201).json({ message: 'Borrowed books', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    },
    getBorrowedBookById: async (req, res) => {
        try {
            const id = req.params.id;
            const books = await borrowedBookService.getBorrowedBookById(id);
            res.status(201).json({ message: 'Borrowed books', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    },
    getBorrowedBooksByBorrowerId: async (req, res) => {
        try {
            const id = req.params.id;
            const books = await borrowedBookService.getBorrowedBooksByBorrowerId(id);
            res.status(201).json({ message: 'Borrowed books', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    },
    getBorrowedBooksByBookId: async (req, res) => {
        try {
            const id = req.params.id;
            const books = await borrowedBookService.getBorrowedBooksByBookId(id);
            res.status(201).json({ message: 'Borrowed books', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    },
    getOverDueBooks: async (req, res) => {
        try {
            const books = await borrowedBookService.getOverDueBooks();
            res.status(201).json({ message: 'Borrowed books', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    },
    insertBorrowedBook: async (req, res) => {
        try {
            const newBorrowedBook = await borrowedBookService.insertBorrowedBook(req.body);
            res.status(201).json({ message: 'Borrowed book inserted', data: newBorrowedBook });
        } catch (error) {
            res.status(501).json({ message: 'insertion failed', error: error.message });
        }
    },
    returnBook: async (req, res) => {
        try {
            const bb_id = req.params.id;
            await borrowedBookService.returnBook(bb_id);
            res.status(200).json({ message: 'Borrowed book returned' });
        } catch (error) {
            console.error('Error in returnBook controller:', error.message);
            res.status(400).json({ message: 'Return failed', error: error.message });
        }
        
    }
};

module.exports = borrowedBookController;