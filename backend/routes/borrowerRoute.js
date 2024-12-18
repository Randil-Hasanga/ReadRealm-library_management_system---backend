const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');

router
    .get('/', borrowerController.getBorrowers)
    .get('/:id', borrowerController.getBorrowerById)
    .post('/', borrowerController.createBorrower)
    .patch('/:id', borrowerController.updateBorrower)
    .delete('/:id', borrowerController.deleteOrRestoreBorrower);

module.exports = router;