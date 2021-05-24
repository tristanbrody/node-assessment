const express = require('express');
const axios = require('axios');
const app = express();
const routes = require('./routes');
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('dev'));
app.use('/', routes);

module.exports = app;
