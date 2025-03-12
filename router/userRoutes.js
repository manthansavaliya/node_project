const express = require('express');
const { signUp, signIn, profile } = require('../controllers/userControllers.js');
const { createPost, updatePost } = require('../controllers/postControllers.js');
const { jwtAuthorize } = require('../middleware/jwt.js')
const routes = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


routes.use('/sign-up', signUp);
routes.use('/sign-in', signIn);
routes.use('/profile', jwtAuthorize, profile);

routes.use('/create', jwtAuthorize, upload.single('image'), createPost);
routes.use('/update', jwtAuthorize, updatePost);


module.exports = routes, upload;