const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const blogController = require("../controller/blog");

// [POST]: v1/blog/post
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("Title Input Invalid"),
    body("content").isLength({ min: 5 }).withMessage("Content Input Invalid"),
  ],
  blogController.createBlogPost
);

router.get("/posts", blogController.getAllPosts);

router.get("/post/:postId", blogController.getBlogPostById);
router.put(
  "/post/:postId",
  [
    body("title").isLength({ min: 5 }).withMessage("Title Input Invalid"),
    body("content").isLength({ min: 5 }).withMessage("Content Input Invalid"),
  ],
  blogController.updateBlogPost
);

router.delete("/post/:postId", blogController.deleteBlogPost);

module.exports = router;
