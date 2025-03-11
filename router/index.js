const express = require('express');

const routes = express.Router();
const router = require('./userRoutes.js');

routes.use('/user', router);


module.exports = routes;