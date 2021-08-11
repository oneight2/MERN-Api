const express = require("express");
const router = express.Router();

const blogController = require("../controller/blog");

// [POST]: v1/blog/post
router.post("/post", blogController.createBlogPost);

module.exports = router;
