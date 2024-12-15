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

// Use Routes
app.use('/users', userRoute);
app.use('/authors', authorRoute);
app.use('/books', bookRoute);

module.exports = app;
