const Post = require('../models/post.js');
const upload = require('../router/userRoutes.js');
const User = require('../models/user.js');
const createPost = async (req, res) => {
    try {
        const userPostData = req.body;
        let postFile = req.file;
        const { titleName, description, image } = userPostData;

        let post = new Post({
            titleName,
            description,
            image: postFile.originalname,
            user: [ req.user._id ]
        });


        await post.save();

        res.status(201).json({ message: "Post Created Successfully." });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const updatePost = async (req, res) => {
    try {
        const userPostData = req.body;
        const { titleName, description } = userPostData;

        const newPostData = await Post.findByIdAndUpdate({ _id: req.params._id }, {
            $set: { titleName, description }
        })

        res.status(201).json({ message: "Post Updated Successfully." });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deletePost = async (req, res) => {
    try {

        const newPostData = await Post.findByIdAndDelete({ _id: req.params._id }, {
        })

        res.status(201).json({ message: "Post Deleted Successfully." });



    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const getOnePost = async (req, res) => {
    try {
        let _id = req.params._id;
        const newPostData = await Post.findOne({ _id }).populate('user').exec();

        res.status(201).json({ message: newPostData });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const getAllPost = async (req, res) => {
    try {

        const newPostData = await Post.find();

        res.status(201).json({ message: newPostData });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createPost, updatePost, deletePost, getOnePost, getAllPost };