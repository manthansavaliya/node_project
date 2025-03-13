const { default: mongoose, Type, Schema } = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    age: Number,
    acceptPrivacyPolicy: Number, // 0=true,1=false
    post: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    {
        timestamps: true
    }
    ]
});

const User = mongoose.model('User', schema);
module.exports = User;
