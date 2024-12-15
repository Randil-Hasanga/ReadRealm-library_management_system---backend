const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();

router
    .get('/', authorController.getAuthors)
    .get('/:id', authorController.getAuthorById)
    .post('/', authorController.createAuthor)
    .patch('/:id', authorController.updateAuthor);


module.exports = router;