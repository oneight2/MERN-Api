exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // const image = req.body.image

  const result = {
    message: "Post Success",
    data: {
      id: 1,
      title: title,
      image: "image.png",
      content: content,
      created_at: "12/06/2020",
      author: {
        uid: 1,
        name: "testing",
      },
    },
  };
  res.status(201).json(result);
};
