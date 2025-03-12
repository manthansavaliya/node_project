const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');


const signUp = async (req, res) => {
    try {
        // console.log("start");
        const userdata = req.body;
        // console.log(userdata);
        const { name, email, password, confirmPassword, age, acceptPrivacyPolicy } = userdata;
        const newPassword = await bcrypt.hash(password, 10);
        // console.log(newPassword);

        let user = new User({
            name,
            email,
            password: newPassword,
            confirmPassword: newPassword,
            age,
            acceptPrivacyPolicy,
        });

        await user.save();

        res.status(201).json({ message: "User Created Successfully." });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const signIn = async (req, res) => {
    try {
        const userdata = req.body;
        const { email, password } = userdata;

        const newUser = await User.findOne({ email });
        // console.log(newUser)
        if (!newUser) {
            return res.send({ error: "User Is Not Found In List." });
        }

        const passMatch = await bcrypt.compare(password, newUser.password);
        if (!passMatch) {
            return res.send({ error: "Password Is Not Match." });
        }
        // console.log(passMatch)

        const token = await jwt.sign({ _id: newUser._id }, 'token@')
        console.log(token)

        res.status(201).json({ message: "User Login Successfully.", token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const profile = async (req, res) => {

    try {
        // console.log(req.user.name);
        let profileData = await req.user;
        let userProfileData = await ({
            name: profileData.name,
            email: profileData.email,
            post: profileData.post,
        });
        res.status(201).json({ userProfileData });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { signUp, signIn, profile };