const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPost = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    image:{
        type: String,
        reguired: true
    },
    author:{
        type: Object,
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('BlogPost', BlogPost)