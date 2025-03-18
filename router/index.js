const express = require('express');

const routes = express.Router();
const router = require('./userRoutes.js');

routes.use('/user', router);
routes.use('/post', router);

module.exports = routes;