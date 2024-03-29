const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


const jwt_secret = "jwtsecrettest"

// ROUTE 1:Creating a user using:POST "/auth/createUser". No Login required
router.post('/createUser', [
    // setting validation for the constrains
    body('email', 'Enter a valid Emailid.').isEmail(),
    body('name', 'Enter a valid name.').isLength({ min: 3 }),
    body('password', 'Password too short.').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //checking if there is any error
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() }) // if yes display the array of error
    }

    try {
        //finding if a user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json("User with this email already exists")
        }
        const salt = await bcrypt.genSalt(10)
        const secpassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({ //creating a user
            name: req.body.name,
            email: req.body.email,
            password: secpassword,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const Authtoken = jwt.sign(data, jwt_secret);
        success = true;
        res.json({ success, Authtoken });
    }

    catch (error) {   //catching a error if occur any
        console.error(error.message);
        res.status(500).json("some error occured");
        console.log(error);
    }

})


// ROUTE 2:Authentication of  a user using:POST "/auth/login". No Login required
router.post('/login', [
    // setting validation for the constrains
    body('email', 'Please login with correct credentials.').isEmail(),
    body('password', 'Please login with correct credentials.').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //checking if there is any error
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() }) // if yes display the array of error
    }

    try {
        //finding if a user already exists
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json("Email does not exists.")
        }

        const comparepassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparepassword) {
            return res.status(400).json("Please login with correct credentials.")
        }

        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const Authtoken = jwt.sign(data, jwt_secret);
        res.json({ success, Authtoken });
    }

    catch (error) {   //catching a error if occur any
        console.error(error.message);
        res.status(500).json("some error occured");
        console.log(error);
    }
})


// ROUTE 3:Get loggedin user details using:POST "/auth/getUser".  Login required
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        var userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }
    catch (error) {   //catching a error if occur any
        console.error(error.message);
        res.status(500).json("some error occured");
        console.log(error);
    }
})
// ROUTE 4:Update loggedin user details using:POST "/auth/updateUser".  Login required
router.post('/updateUser', fetchuser, async (req, res) => {
    try {
        var userId = req.user.id;
        const { email, name } = req.body;
        const updatedUser = {}
        if (email) { updatedUser.email = email };
        if (name) { updatedUser.name = name };
        const user = await User.findByIdAndUpdate(userId,{ $set: updatedUser }, { new: true })
        res.send(user);
    }
    catch (error) {   //catching a error if occur any
        console.error(error.message);
        res.status(500).json("some error occured in updateUser");
        console.log(error);
    }
})


module.exports = router