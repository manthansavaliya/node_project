const express = require('express');
const { signUp, signIn, profile } = require('../controllers/userControllers.js');
const { jwtAuthorize } = require('../middleware/jwt.js')
const routes = express.Router();

routes.use('/sign-up', signUp);
routes.use('/sign-in', signIn);
routes.use('/profile', jwtAuthorize, profile);



module.exports = routes;