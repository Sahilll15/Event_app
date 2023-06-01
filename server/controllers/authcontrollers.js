const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')

module.exports.register = async (req, res, next) => {
    const { name, email, password, date } = req.body;

    try {
        let user = await User.findOne({ name });
        if (user) {
            return res.status(400).json({ mssg: "the user already exits" })
        }
        hashedpassword = await bcrypt.hash(password, 10)

        user = await User.create({
            name,
            email,
            password: hashedpassword,
            date
        })
        const token = jwt.sign({ UserId: user._id }, 'auth-token', { expiresIn: "1h" });
        res.status(200).json({ mssg: "User created SuccesFully", user: user, token: token })

    } catch (error) {
        res.status(400).json({ mssg: "User creation failed" })
    }
}


module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ mssg: "User does not exist" })
        }

        const compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            return res.status(400).json({ mssg: "Invalid Credentials" })
        }
        const token = jwt.sign({ UserId: user._id }, 'auth-token', { expiresIn: "1h" });

        res.status(200).json({ mssg: "Succesfully logged in", user: user, token: token })


    } catch (error) {
        res.status(400).json({ mssg: "Login failed" })

    }
}

