const express = require('express');
const router = express.Router();
const borrowedBookController = require('../controllers/borrowedBookController');

router
    .get('/over-due', borrowedBookController.getOverDueBooks)
    .get('/', borrowedBookController.getBorrowedBooks)
    .get('/:id', borrowedBookController.getBorrowedBookById)
    .get('/borrower/:id', borrowedBookController.getBorrowedBooksByBorrowerId)
    .get('/books/:id', borrowedBookController.getBorrowedBooksByBookId)
    .post('/', borrowedBookController.insertBorrowedBook)
    .patch('/return/:id', borrowedBookController.returnBook)

module.exports = router;