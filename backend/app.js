const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// Route imports
const userRoute = require('./routes/usersRoute');
const authorRoute = require('./routes/authorRoute');
const bookRoute = require('./routes/booksRoute');
const borrowerRoute = require('./routes/borrowerRoute');
const borrowedBookRoute = require('./routes/borrowedBooksRoute');
const finesRoute = require('./routes/fineRoute');

// Use Routes
app.use('/users', userRoute);
app.use('/authors', authorRoute);
app.use('/books', bookRoute);
app.use('/borrowers', borrowerRoute);
app.use('/borrowed-book', borrowedBookRoute);
app.use('/fines',finesRoute);

module.exports = app;
