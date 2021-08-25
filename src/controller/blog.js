const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");

exports.createBlogPost = (req, res, next) => {
  // cek ada error ga
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Input");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  if (!req.file) {
    const err = new Error("Image Tidak Ada");
    err.errorStatus = 422;
    err.data = errors.array();
    throw err;
  }
  const title = req.body.title;
  const content = req.body.content;
  const image = req.file.path;

  const Posting = new BlogPost({
    title: title,
    content: content,
    image: image,
    author: {
      uid: 1,
      name: "syarif hidayat",
    },
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Blog Success",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getAllPosts = (req, res, next) => {
  BlogPost.find()
    .then((result) => {
      res.status(200).json({
        message: "Data All Blog Post Berhasil Terambil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      // Jika Id tidak ditemuka
      if (!result) {
        const error = new Error("Blog Post Tidak Ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Data Blog Berhasil Ditampilkan",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
