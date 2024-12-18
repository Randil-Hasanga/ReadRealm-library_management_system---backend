const express = require('express');
const router = express.Router();
const borrowedBookController = require('../controllers/borrowedBookController');

router
    .get('/', borrowedBookController.getBorrowedBooks)


module.exports = router;