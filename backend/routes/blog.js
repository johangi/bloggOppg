const express = require('express');

// controller functions
const { getBlogs, createBlog, deleteBlog, updateBlog } = require('../controllers/blogsController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getBlogs);

router.post('/', createBlog);

router.delete('/:id', deleteBlog);

router.patch('/:id', updateBlog);

module.exports = router;