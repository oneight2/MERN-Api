const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");
const path = require("path");
const fs = require("fs");

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

exports.updateBlogPost = (req, res, next) => {
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
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Data Tidak Ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      post.title = title;
      post.content = content;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Berhasil diupdate",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Data Tidak Ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      removeImage(post.image);

      return BlogPost.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Berhasil dihapus",
        data: result,
      });
    })

    .catch((err) => {
      next(err);
    });
};

const removeImage = (filePath) => {
  console.log("filepath", filePath);
  console.log("dirname", __dirname);

  // alamatnya digabung __dirname keluar 2 kali terus ke filepath
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
