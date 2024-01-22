const fs = require('fs');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET_KEY;

const { body, validationResult } = require('express-validator');
const User = require('../Modals/User');
const { verifytoken } = require('../middleware/verifytoken');
const Post = require('../Modals/Post');

router.get('/Allusers', verifytoken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

router.get('/Allposts',verifytoken, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

router.get('/user/:id', verifytoken,async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

router.get('/post/:id', verifytoken,async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

router.get('/log',verifytoken, async (req, res) => {
    
    const logFilePath = 'traffic.json';  // Assuming you changed the file format to JSON

    try {
        const logData = fs.readFileSync(logFilePath, 'utf8');
        const logLines = logData.split('\n').filter(line => line.trim() !== '');

        // Parse each line of JSON and create an array of objects
        const parsedLog = logLines.map(line => JSON.parse(line));

        const numberOfRequests = parsedLog.length;

        res.json({ numberOfRequests, logData: parsedLog });
    } catch (err) {
        console.error('Error reading log file:', err);
        res.status(500).json({ error: 'Error reading log file' });
    }
});


module.exports = router;