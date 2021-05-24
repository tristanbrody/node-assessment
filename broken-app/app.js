const express = require('express');
const axios = require('axios');
const app = express();
const routes = require('./routes');
const morgan = require('morgan');
const ExpressError = require('./expressError');

app.use(express.json());
app.use(morgan('dev'));
app.use('/', routes);

app.use(function (req, res, next) {
	return new ExpressError('Not Found', 404);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	return res.json({
		error: err.message
	});
});

module.exports = app;
