const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const jwtAuthorize = async (req, res, next) => {
    try {
        // console.log("start")
        let d_token = req.headers[ 'authorization' ]
        let finalToken = d_token.split(" ")[ 1 ];
        // console.log(finalToken)

        let decode = jwt.verify(finalToken, 'token@');

        const user = await User.findOne({ _id: decode._id })

        if (!user) {
            return res.send("User Dose Not Exist.");
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { jwtAuthorize }