const borrowedBookService = require('../services/borrowedBookService');

const borrowedBookController = {
    getBorrowedBooks: async (req, res) => {
        try {
            const books = await borrowedBookService.getBorrowedBooks();
            res.status(201).json({message: 'Borrowed books', data: books});
        } catch (error) {
            res.status(201).json({message: 'retrival failed', error: error.message});
        }
    }
};

module.exports = borrowedBookController;