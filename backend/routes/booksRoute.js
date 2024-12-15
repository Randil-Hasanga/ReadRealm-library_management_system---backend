const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

router
    .get('/', bookController.getBooks)
    .get('/:id', bookController.getBookById)
    .delete('/:id', bookController.deleteBook)
    .get('/deleted/all', bookController.getDeletedBooks)
    .patch('/:id', bookController.updateBook)
    .post('/', bookController.createBook);

module.exports = router;