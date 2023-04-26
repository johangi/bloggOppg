const Blog = require('../models/blogModel');
const mongoose = require('mongoose');

const errorMssg = { error: 'No such blog' };

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    res.status(200).json(blogs);
}

const getBlogsByAuthor = async (req, res) => {
    const author = req.body.author;
    
    const blogs = await Blog.find({ author }).sort({ createdAt: -1 });

    res.status(200).json(blogs);
}

const createBlog = async (req, res) => {
    const { title, text, author } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!text) {
        emptyFields.push('text');
    }
    if (!author) {
        emptyFields.push('author');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    try {
        const user_id = req.user._id;
        console.log(req.user)
        const blog = await Blog.create({ title, text, author, user_id });
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(errorMssg);
    }

    const blog = await Blog.findOneAndDelete({ _id: id });

    if (!blog) {
        return res.status(400).json(errorMssg);
    }

    res.status(200).json(blog);
}

const updateBlog = async (req, res) => {
    const { id } = req.params;
}

module.exports = {
    getBlogs,
    getBlogsByAuthor,
    createBlog,
    deleteBlog,
    updateBlog
}