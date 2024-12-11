const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// Route imports
const userRoute = require('./routes/usersRoute');

// Use Routes
app.use('/user', userRoute);

module.exports = app;
