const { default: mongoose, Type, Schema } = require('mongoose');

const schema = new mongoose.Schema({
    titleName: String,
    description: String,
    image: String,
    user: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    } ]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', schema);
module.exports = Post;
