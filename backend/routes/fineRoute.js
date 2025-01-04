const fineController = require('../controllers/fineController');
const express = require('express');
const router = express.Router();

router
    .get('/', fineController.getFines)
    .get('/:id', fineController.getFineById)
    .get('/bb/:id', fineController.getFineByBbId)
    .patch('/:id', fineController.payFine)

module.exports = router;