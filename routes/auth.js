const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// User Registration
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Create new user
        user = new User({ email, username, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // Save user to database
        await user.save();

        res.json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Return success message or token for authentication
        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.get("/users",async(req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json({users});
    }catch(err){
        console.log(err)
        res.status(404).json({message:"server error"})
    }
})
// Forget Password API (placeholder)
router.post('/forgotpassword', async (req, res) => {
    // Logic for forgot password (send reset link via email, etc.)
    res.json({ message: 'Forgot password functionality to be implemented' });
});

module.exports = router;
