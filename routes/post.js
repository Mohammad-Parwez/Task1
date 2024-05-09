const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require("../models/User")

// Create a new post
router.post('/', async (req, res) => {

    const { username, content } = req.body;

    try {
        // Find the user by username to get their ObjectId
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create new post
        const post = new Post({ user: user._id, content });

        // Save post to database
        await post.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username');
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a single post by ID
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId).populate('user', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a post by ID
router.put('/:postId', async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    try {
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.content = content;
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a post by ID
router.delete('/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Use deleteOne() to delete the post
        await Post.deleteOne({ _id: postId });

        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Like a post
router.post('/:postId/like', async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: 'You have already liked this post' });
        }

        // Add user ID to the likes array
        post.likes.push(userId);
        await post.save();

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Add a comment to a post
router.post('/:postId/comment', async (req, res) => {
    const { postId } = req.params;
    const { userId, text } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create the comment object
        const comment = {
            user: userId,
            text
        };

        // Add the comment to the comments array
        post.comments.push(comment);
        await post.save();

        res.status(200).json({comment})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

