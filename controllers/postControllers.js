const express = require('express');
const Post = require('../models/post.js');
const multer = require('multer');
const upload = require('../router/userRoutes.js');
const createPost = async (req, res) => {
    try {
        // console.log("start")
        const userPostData = req.body;
        let postFile = req.file;
        const { titleName, description, image } = userPostData;

        let post = new Post({
            titleName,
            description,
            image: postFile.originalname,
        });

        await post.save();

        res.status(201).json({ message: "Post Created Successfully." });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const updatePost = async (req, res) => {
    try {
        // console.log("start")
        const userPostData = req.body;
        const { titleName, description, } = userPostData;

        const newPostData = await Post.findByIdAndUpdate({
            $set: { titleName, description }
        })
        console.log(newPostData);

        res.status(201).json({ message: "Post Updated Successfully." });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { createPost, updatePost };