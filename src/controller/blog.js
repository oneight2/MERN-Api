const {validationResult} = require('express-validator')
const BlogPost = require('../models/blog')

exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // const image = req.body.image

  // cek ada error ga
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    const err = new Error('Invalid Input')
    err.errorStatus = 400
    err.data = errors.array()
    throw err 
  }

  const Posting = new BlogPost({
    title : title,
    content: content,
    author:{
      uid: 1,
      name : 'syarif hidayat'
    }
  })

  Posting.save().then(result=>{
    res.status(201).json({
      message: 'Create Blog Success',
      data: result
    });
  }).catch(err => {
    console.log('err: ', err)
  })

};
