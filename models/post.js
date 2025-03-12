const { default: mongoose, Type, Schema } = require('mongoose');

const schema = new mongoose.Schema({
    titleName: String,
    description: String,
    image: String,
    userId: String
}, {
    timestamps: true
});

const Post = mongoose.model('Post', schema);
module.exports = Post;
